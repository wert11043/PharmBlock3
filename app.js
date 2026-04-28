const MIXED_GROUP = "全部混合";
const GROUP_ORDER = ["抗血小板", "抗凝血/溶栓/止血", "造血系統"];
const FIELD_OPTIONS = [
  { key: "mechanism", label: "機轉/標的" },
  { key: "indication", label: "適應症" },
  { key: "pitfall", label: "副作用/禁忌" },
  { key: "reversal", label: "解毒/逆轉" },
  { key: "monitoring", label: "監測/注意事項" },
  { key: "keyPoint", label: "考點" }
];
const MIXED_LIMIT = 16;

const groupsFromData = [...new Set(QUIZ_ROWS.map((row) => row.group).filter(Boolean))];
const GROUP_OPTIONS = [
  ...GROUP_ORDER.filter((group) => groupsFromData.includes(group)),
  ...groupsFromData.filter((group) => !GROUP_ORDER.includes(group)),
  MIXED_GROUP
];

let currentGroup = MIXED_GROUP;
let currentField = "mechanism";
let currentPairs = [];
let matchedCount = 0;
let errorCount = 0;
let selectedClue = null;
let selectedAnswer = null;
let answerMode = false;

const elements = {
  groupChips: document.getElementById("groupChips"),
  fieldChips: document.getElementById("fieldChips"),
  clueCol: document.getElementById("clueCol"),
  answerCol: document.getElementById("answerCol"),
  statusBar: document.getElementById("statusBar"),
  progressText: document.getElementById("progressText"),
  errorText: document.getElementById("errorText"),
  quizView: document.getElementById("quizView"),
  answerView: document.getElementById("answerView"),
  answerBody: document.getElementById("answerBody"),
  fieldHeader: document.getElementById("fieldHeader"),
  toggleAnswerBtn: document.getElementById("toggleAnswerBtn"),
  resultCard: document.getElementById("resultCard"),
  resultScore: document.getElementById("resultScore"),
  resultText: document.getElementById("resultText"),
  resetBtn: document.getElementById("resetBtn"),
  playAgainBtn: document.getElementById("playAgainBtn")
};

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function getFieldLabel() {
  return FIELD_OPTIONS.find((item) => item.key === currentField)?.label ?? currentField;
}

function buildPool() {
  let rows = QUIZ_ROWS;
  if (currentGroup !== MIXED_GROUP) {
    rows = rows.filter((row) => row.group === currentGroup);
  }

  rows = rows.filter((row) => {
    const value = row[currentField];
    return typeof value === "string" && value.trim().length > 0;
  });

  if (currentGroup === MIXED_GROUP && rows.length > MIXED_LIMIT) {
    rows = shuffle(rows).slice(0, MIXED_LIMIT);
  }

  return rows.map((row, index) => ({
    id: `${row.group}-${row.drug}-${index}`,
    drug: row.drug,
    clue: row[currentField]
  }));
}

function updateStats() {
  elements.progressText.textContent = `${matchedCount} / ${currentPairs.length}`;
  elements.errorText.textContent = String(errorCount);
}

function createChip(text, isActive, onClick) {
  const button = document.createElement("button");
  button.className = `cat-btn${isActive ? " active" : ""}`;
  button.type = "button";
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function renderFilters() {
  elements.groupChips.innerHTML = "";
  GROUP_OPTIONS.forEach((group) => {
    elements.groupChips.appendChild(
      createChip(group, group === currentGroup, () => {
        currentGroup = group;
        hideAnswers();
        startRound();
      })
    );
  });

  elements.fieldChips.innerHTML = "";
  FIELD_OPTIONS.forEach((field) => {
    elements.fieldChips.appendChild(
      createChip(field.label, field.key === currentField, () => {
        currentField = field.key;
        hideAnswers();
        startRound();
      })
    );
  });
}

function makeTile(text, id, type) {
  const tile = document.createElement("button");
  tile.className = "tile";
  tile.type = "button";
  tile.textContent = text;
  tile.dataset.id = id;
  tile.dataset.type = type;
  tile.addEventListener("click", () => onTileClick(tile));
  return tile;
}

function renderBoard() {
  elements.clueCol.innerHTML = "";
  elements.answerCol.innerHTML = "";

  const clueTiles = shuffle(currentPairs.map((pair) => ({
    id: pair.id,
    text: pair.clue
  })));
  const answerTiles = shuffle(currentPairs.map((pair) => ({
    id: pair.id,
    text: pair.drug
  })));

  clueTiles.forEach((item) => elements.clueCol.appendChild(makeTile(item.text, item.id, "clue")));
  answerTiles.forEach((item) => elements.answerCol.appendChild(makeTile(item.text, item.id, "answer")));
}

function clearSelection(type) {
  document.querySelectorAll(`.tile[data-type="${type}"].selected`).forEach((tile) => {
    tile.classList.remove("selected");
  });
}

function onTileClick(tile) {
  if (tile.classList.contains("matched") || tile.classList.contains("flashing")) {
    return;
  }

  if (tile.dataset.type === "clue") {
    clearSelection("clue");
    tile.classList.add("selected");
    selectedClue = tile;
  } else {
    clearSelection("answer");
    tile.classList.add("selected");
    selectedAnswer = tile;
  }

  if (selectedClue && selectedAnswer) {
    resolveMatch();
  }
}

function resolveMatch() {
  const clueTile = selectedClue;
  const answerTile = selectedAnswer;
  selectedClue = null;
  selectedAnswer = null;

  if (clueTile.dataset.id === answerTile.dataset.id) {
    clueTile.classList.remove("selected");
    answerTile.classList.remove("selected");
    clueTile.classList.add("matched");
    answerTile.classList.add("matched");
    matchedCount += 1;
    updateStats();
    if (matchedCount === currentPairs.length) {
      window.setTimeout(showResult, 260);
    }
    return;
  }

  errorCount += 1;
  clueTile.classList.remove("selected");
  answerTile.classList.remove("selected");
  clueTile.classList.add("flashing");
  answerTile.classList.add("flashing");
  updateStats();
  window.setTimeout(() => {
    clueTile.classList.remove("flashing");
    answerTile.classList.remove("flashing");
  }, 350);
}

function showResult() {
  const total = currentPairs.length;
  const score = Math.round((total / ((total + errorCount) || 1)) * 100);
  elements.resultScore.textContent = `${score}%`;
  elements.resultScore.className = `big ${errorCount === 0 ? "perfect" : score >= 75 ? "good" : "bad"}`;

  if (errorCount === 0) {
    elements.resultText.textContent = "這輪完全答對，可以直接往下一欄位刷。";
  } else if (score >= 75) {
    elements.resultText.textContent = `共 ${total} 題，錯 ${errorCount} 次，再刷一次就很穩。`;
  } else {
    elements.resultText.textContent = `共 ${total} 題，錯 ${errorCount} 次，建議先切到顯示答案把重點再看一遍。`;
  }

  elements.resultCard.classList.add("show");
}

function renderAnswers() {
  elements.answerBody.innerHTML = "";
  elements.fieldHeader.textContent = getFieldLabel();

  if (currentPairs.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 2;
    emptyCell.textContent = "目前這個欄位沒有可顯示的資料。";
    emptyRow.appendChild(emptyCell);
    elements.answerBody.appendChild(emptyRow);
    return;
  }

  currentPairs.forEach((pair) => {
    const row = document.createElement("tr");
    const clueCell = document.createElement("td");
    const drugCell = document.createElement("td");
    clueCell.textContent = pair.clue;
    drugCell.textContent = pair.drug;
    row.appendChild(clueCell);
    row.appendChild(drugCell);
    elements.answerBody.appendChild(row);
  });
}

function setAnswerMode(nextMode) {
  answerMode = nextMode;
  if (answerMode) {
    renderAnswers();
  }

  elements.quizView.classList.toggle("hidden", answerMode);
  elements.statusBar.classList.toggle("hidden", answerMode);
  elements.answerView.classList.toggle("hidden", !answerMode);
  elements.resultCard.classList.remove("show");
  elements.toggleAnswerBtn.textContent = answerMode ? "返回配對" : "顯示答案";
  elements.toggleAnswerBtn.setAttribute("aria-pressed", answerMode ? "true" : "false");

  if (answerMode) {
    elements.answerView.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function hideAnswers() {
  setAnswerMode(false);
}

function showAnswers() {
  setAnswerMode(true);
}

function startRound() {
  currentPairs = buildPool();
  matchedCount = 0;
  errorCount = 0;
  selectedClue = null;
  selectedAnswer = null;
  elements.resultCard.classList.remove("show");
  renderFilters();
  renderBoard();
  updateStats();
}

elements.resetBtn.addEventListener("click", () => {
  hideAnswers();
  startRound();
});

elements.playAgainBtn.addEventListener("click", () => {
  hideAnswers();
  startRound();
});

elements.toggleAnswerBtn.addEventListener("click", () => {
  if (answerMode) {
    hideAnswers();
    return;
  }
  showAnswers();
});

startRound();
