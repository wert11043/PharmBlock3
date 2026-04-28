const GROUP_OPTIONS = [
  "抗血小板",
  "抗凝血/溶栓/止血",
  "造血系統",
  "全部混合"
];

const FIELD_OPTIONS = [
  { key: "mechanism", label: "機轉/標的" },
  { key: "indication", label: "適應症" },
  { key: "pitfall", label: "副作用 / 禁忌" },
  { key: "reversal", label: "解毒 / 逆轉" },
  { key: "monitoring", label: "監測 / 注意事項" },
  { key: "keyPoint", label: "考點速記" }
];

const MIXED_LIMIT = 16;

let currentGroup = "全部混合";
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
  if (currentGroup !== "全部混合") {
    rows = rows.filter((row) => row.group === currentGroup);
  }
  rows = rows.filter((row) => row[currentField] && row[currentField].trim().length > 0);
  if (currentGroup === "全部混合" && rows.length > MIXED_LIMIT) {
    rows = shuffle(rows).slice(0, MIXED_LIMIT);
  }
  return rows.map((row, index) => ({
    id: `${row.group}-${row.drug}-${index}`,
    drug: row.drug,
    clue: row[currentField],
    keyPoint: row.keyPoint,
    group: row.group
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
  const score = Math.round((currentPairs.length / (currentPairs.length + errorCount || 1)) * 100);
  elements.resultScore.textContent = `${score}%`;
  elements.resultScore.className = `big ${errorCount === 0 ? "perfect" : score >= 75 ? "good" : "bad"}`;
  if (errorCount === 0) {
    elements.resultText.textContent = "全對。這組資訊已經很穩了，可以換下一個欄位或群組。";
  } else if (score >= 75) {
    elements.resultText.textContent = `答對 ${currentPairs.length} 題、失誤 ${errorCount} 次。再刷一次就會更穩。`;
  } else {
    elements.resultText.textContent = `這輪失誤 ${errorCount} 次，建議先切到「顯示答案」快速對照，再回來重刷。`;
  }
  elements.resultCard.classList.add("show");
}

function renderAnswers() {
  elements.answerBody.innerHTML = "";
  elements.fieldHeader.textContent = getFieldLabel();

  currentPairs.forEach((pair) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pair.clue}</td>
      <td>${pair.drug}</td>
    `;
    elements.answerBody.appendChild(row);
  });
}

function hideAnswers() {
  answerMode = false;
  elements.answerView.classList.remove("show");
  elements.quizView.classList.remove("hidden");
  elements.toggleAnswerBtn.textContent = "顯示答案";
}

function showAnswers() {
  answerMode = true;
  renderAnswers();
  elements.quizView.classList.add("hidden");
  elements.answerView.classList.add("show");
  elements.resultCard.classList.remove("show");
  elements.toggleAnswerBtn.textContent = "返回配對";
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
