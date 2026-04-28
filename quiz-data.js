const QUIZ_ROWS = [
  {
    group: "抗血小板",
    drug: "Aspirin",
    mechanism: "不可逆乙醯化 COX-1，抑制 TXA2 生成",
    indication: "TIA、MI 與動脈血栓預防",
    pitfall: "Bleeding time 延長、GI bleeding、胃潰瘍、出血性中風",
    reversal: "無特異性解毒；停藥等待新血小板",
    monitoring: "低劑量 75 mg；效果 7-10 天；與 NSAID 至少隔 2 小時",
    keyPoint: "血小板無核，所以 aspirin 的抑制作用會跟著血小板壽命走 7-10 天"
  },
  {
    group: "抗血小板",
    drug: "Clopidogrel",
    mechanism: "經 CYP 活化後不可逆抑制 P2Y12 receptor",
    indication: "MI、中風後長期預防；ACS；PCI 前預防栓塞",
    pitfall: "Bleeding、TTP；CYP2C19 PM 反應差",
    reversal: "無特異性解毒；停藥處理",
    monitoring: "達最大抑制需 3-5 天；藥效高峰前可暫與其他藥物併用",
    keyPoint: "P2Y12 類臨床最常用的是 clopidogrel，因為副作用相對最少"
  },
  {
    group: "抗血小板",
    drug: "Prasugrel",
    mechanism: "前驅藥；不可逆抑制 P2Y12 receptor",
    indication: "ACS 後預防栓塞",
    pitfall: "出血風險高；有中風或 TIA 病史者禁用",
    reversal: "無特異性解毒；停藥處理",
    monitoring: "約 2-4 小時達最大效果",
    keyPoint: "CV 題很愛考 prasugrel 不能用在有 stroke / TIA 病史的人"
  },
  {
    group: "抗血小板",
    drug: "Ticagrelor",
    mechanism: "直接、可逆抑制 P2Y12 receptor；不是前驅藥",
    indication: "抗血小板治療；可作 clopidogrel 類替代",
    pitfall: "出血；與超過 100 mg aspirin 併用會削弱 aspirin 作用",
    reversal: "無特異性解毒；可逆結合，停藥後逐步恢復",
    monitoring: "1-3 小時達最大效果；不受 CYP 活化限制",
    keyPoint: "P2Y12 抑制劑裡只有 ticagrelor 是 reversible"
  },
  {
    group: "抗血小板",
    drug: "Ticlopidine",
    mechanism: "經代謝後不可逆抑制 P2Y12 receptor",
    indication: "曾有腦部栓塞者，可預防 TIA 與中風",
    pitfall: "出血最強，且可有 agranulocytosis、TTP、aplastic anemia",
    reversal: "無特異性解毒；停藥處理",
    monitoring: "約 3-4 天達最大效果；現已少用",
    keyPoint: "同為 P2Y12 類，但因血液毒性高，ticlopidine 幾乎被 clopidogrel 取代"
  },
  {
    group: "抗血小板",
    drug: "Abciximab",
    mechanism: "阻斷 GP IIb/IIIa receptor，抑制 fibrinogen 與 vWF 相關聚集",
    indication: "PCI 後使用；對傳統治療反應不佳的 unstable angina 可於 PCI 前先給",
    pitfall: "Bleeding；有明顯出血風險者慎用",
    reversal: "無特異性解毒；支持治療",
    monitoring: "IV 後約 30 分鐘達效，維持 24-48 小時",
    keyPoint: "PCI 比較題：clopidogrel 偏術前預防，abciximab 偏 PCI 前後強力抑制聚集"
  },
  {
    group: "抗血小板",
    drug: "Eptifibatide / Tirofiban",
    mechanism: "同屬 GP IIb/IIIa receptor blocker",
    indication: "可作 PCI 或高風險血小板聚集情境的輔助抑制",
    pitfall: "Bleeding；腎功能差時更要小心",
    reversal: "無特異性解毒；停藥處理",
    monitoring: "Eptifibatide 腎排；Tirofiban 腎加糞便排除",
    keyPoint: "同屬 GP IIb/IIIa blocker，但排泄途徑常被拿來和 abciximab 對照"
  },
  {
    group: "抗血小板",
    drug: "Dipyridamole",
    mechanism: "抑制 PDE3 使 cAMP 上升，抑制 GP IIb/IIIa 活化並擴張血管",
    indication: "預防中風，常與 aspirin 併用",
    pitfall: "姿勢性低血壓、頭痛；unstable angina 禁用",
    reversal: "無特異性解毒",
    monitoring: "白蛋白結合高、交互作用多；常與 aspirin 併用；糞便排除",
    keyPoint: "Dipyridamole 最愛考的不是 PDE3 本身，而是 steal phenomenon"
  },
  {
    group: "抗血小板",
    drug: "Cilostazol",
    mechanism: "抑制 PDE3，減少 cAMP / cGMP 分解，抑制血小板聚集並放鬆平滑肌",
    indication: "周邊動脈疾病，可與 pentoxifylline 合用",
    pitfall: "筆記未強調副作用；臨床上重點在周邊血流用途",
    reversal: "無特異性解毒",
    monitoring: "常作為周邊動脈疾病的輔助藥物",
    keyPoint: "和 dipyridamole 一樣屬 PDE 抑制相關抗血小板藥，但著力點較偏 PAD"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Heparin",
    mechanism: "結合 antithrombin，抑制 factor Xa 與 thrombin",
    indication: "急性 VTE、術後靜脈血栓預防、acute MI、孕婦抗凝血",
    pitfall: "Bleeding、過敏、HIT、骨質疏鬆",
    reversal: "Protamine sulfate",
    monitoring: "起效快；需要嚴密監控；HIT 發生時改 argatroban",
    keyPoint: "Heparin 是唯一同時抑制 Xa + thrombin，且孕婦可用"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "LMWH",
    mechanism: "透過 antithrombin 抑制 Xa；因鏈長不夠，不抑制 thrombin",
    indication: "急性 VTE、術後預防、孕婦抗凝血",
    pitfall: "Bleeding；HIT 患者可能有 cross-sensitivity",
    reversal: "Protamine sulfate 只能部分逆轉",
    monitoring: "SC；腎差、懷孕、肥胖建議看 anti-Xa",
    keyPoint: "LMWH 鏈長不夠，所以只抑制 Xa，不抑制 thrombin"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Warfarin",
    mechanism: "抑制 vitamin K epoxide reductase，阻斷 vitamin K 依賴性凝血因子活化",
    indication: "DVT、PE、AF、人工瓣膜、Protein C/S 缺乏、APS",
    pitfall: "出血風險最高、purple toe、致畸胎",
    reversal: "Vitamin K1；嚴重出血需 slow IV",
    monitoring: "PT/INR；t1/2 約 40 小時；白蛋白結合高、CYP 交互作用多",
    keyPoint: "Warfarin 的 antidote 一定要寫 K1，不是 K2 / K3"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Dabigatran etexilate",
    mechanism: "前驅藥；經 plasma esterase 活化後成為 direct thrombin inhibitor",
    indication: "非瓣膜性 AF 的中風與 systemic embolism 預防",
    pitfall: "出血、dyspepsia、GI bleed；置換過瓣膜者禁用",
    reversal: "Idarucizumab",
    monitoring: "腎排除；P-gp substrate；須考慮活化能力與腎功能",
    keyPoint: "NOAC 中最常被單獨點名的是 dabigatran：口服 direct thrombin inhibitor"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Rivaroxaban / Apixaban",
    mechanism: "直接抑制 factor Xa，阻止 prothrombin 轉成 thrombin",
    indication: "預防 DVT、PE、stroke；非瓣膜性 AF 預防中風",
    pitfall: "出血；置換過瓣膜者不可用；CrCl < 15 不建議",
    reversal: "Andexxa / Andexanet alfa",
    monitoring: "肝代謝 + 腎排除；P-gp / CYP 交互作用",
    keyPoint: "-xaban = Xa inhibitor；與 dabigatran 一樣可用於 nonvalvular AF"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Fondaparinux",
    mechanism: "Xa inhibitor",
    indication: "抗凝血治療；表格列為較少用的 Xa inhibitor",
    pitfall: "出血；筆記中屬較少用 Xa inhibitor",
    reversal: "筆記未特別列 antidote",
    monitoring: "常作為 Xa inhibitor 類辨識題",
    keyPoint: "Fondaparinux 的重點是認成 Xa inhibitor，不要誤配成 thrombin inhibitor"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Argatroban",
    mechanism: "針劑，直接抑制 thrombin",
    indication: "靜脈血栓預防 / 治療；heparin 引起 HIT 時改用",
    pitfall: "出血；多用於 heparin 造成的 HIT",
    reversal: "無特異性解毒",
    monitoring: "半衰期 39-51 分鐘，短效",
    keyPoint: "HIT 的標準作答藥物是 argatroban"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Bivalirudin / Desirudin",
    mechanism: "水蛭素衍生物，選擇性 direct thrombin inhibitor，可逆結合 catalytic site",
    indication: "髖關節置換術相關 DVT 預防",
    pitfall: "出血；手術期抗凝時常被拿來和 argatroban 比較",
    reversal: "無特異性解毒",
    monitoring: "Bivalirudin t1/2 約 25 分鐘；Desirudin 用於髖關節置換",
    keyPoint: "-rudin 代表 hirudin 類 direct thrombin inhibitor"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Alteplase (tPA)",
    mechanism: "Recombinant tPA，促進 plasminogen 轉成 plasmin；低劑量對 fibrin 較選擇性",
    indication: "MI、massive PE、acute ischemic stroke",
    pitfall: "出血；孕婦、癒合中傷口、腦創傷 / 腫瘤禁用",
    reversal: "Tranexamic acid 可處理過度纖溶出血",
    monitoring: "t1/2 約 10 分鐘；較適合近端、小血栓",
    keyPoint: "Alteplase 的重點是短效、recombinant tPA、fibrin selective"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Urokinase",
    mechanism: "直接切 plasminogen 的 arginine-valine bond，活化成 plasmin；選擇性較差",
    indication: "PE 首選；亦可用於 MI、arterial thromboembolism、DVT",
    pitfall: "出血；纖維選擇性較差",
    reversal: "Tranexamic acid 可處理過度纖溶出血",
    monitoring: "腎臟自然產物；low antigenicity；t1/2 約 20 分鐘",
    keyPoint: "題目若寫 produced by kidney 幾乎就在指 urokinase"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Streptokinase",
    mechanism: "細菌來源 plasminogen activator，fibrin specificity 較差",
    indication: "舊型 thrombolytic，現在較少用",
    pitfall: "出血加過敏風險高",
    reversal: "Tranexamic acid 可處理過度纖溶出血",
    monitoring: "細菌來源，antigenicity 高，現已少用",
    keyPoint: "Streptokinase 最常考的是來自細菌，所以最容易過敏"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Tenecteplase / Reteplase",
    mechanism: "基因工程 tPA 衍生物；Tenecteplase 長效且對 fibrin 親和力更高",
    indication: "以急性 MI 為主；Reteplase 可 off-label 用於 DVT、massive PE",
    pitfall: "出血；共用 thrombolytics 禁忌症",
    reversal: "Tranexamic acid 可處理過度纖溶出血",
    monitoring: "Tenecteplase 較適合較久較難溶的血栓；Reteplase 分子較小",
    keyPoint: "Tenecteplase / Reteplase 多偏急性 MI；Tenecteplase 較長效"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Tranexamic acid",
    mechanism: "抑制 plasminogen activation，抑制纖溶",
    indication: "tPA 使用過頭造成的出血；手術減少出血",
    pitfall: "用過頭可 thrombosis、seizure、muscle necrosis",
    reversal: "本身就是過度纖溶 / tPA 過量的對策",
    monitoring: "看 CBC、muscle enzymes、blood pressure",
    keyPoint: "Tranexamic acid 比 aminocaproic acid 強約 10 倍"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Protamine sulfate",
    mechanism: "帶正電，與帶負電的 heparin 結合中和",
    indication: "Heparin 造成的出血逆轉",
    pitfall: "過敏、低血壓、bradyarrhythmia、anaphylaxis",
    reversal: "Heparin antidote",
    monitoring: "一定要慢慢 IV；看 coagulation、BP、HR",
    keyPoint: "Protamine sulfate 是魚精 / 睪丸來源，正電中和負電的 heparin"
  },
  {
    group: "抗凝血/溶栓/止血",
    drug: "Vitamin K1",
    mechanism: "補回可利用的 vitamin K，恢復凝血因子活化",
    indication: "Warfarin 造成的出血逆轉",
    pitfall: "快打會增加低血壓 / 過敏風險",
    reversal: "Warfarin antidote",
    monitoring: "看 PT/INR；嚴重出血需 slow IV infusion",
    keyPoint: "考 warfarin antidote 時一定要寫 K1，不是 K2 / K3"
  },
  {
    group: "造血系統",
    drug: "口服鐵劑 (Ferrous salts)",
    mechanism: "補充二價鐵，供血紅素合成；只有 ferrous 較容易吸收",
    indication: "缺鐵性小球性貧血",
    pitfall: "GI upset、便秘；過量可休克",
    reversal: "鐵中毒時用 Deferasirox",
    monitoring: "只有 ferrous 吸收；Vit C 促進；phytate / tannin / antacid 降低吸收；吸收約 10%",
    keyPoint: "鐵吸收題要把 ferrous / ferric、Vit C、phytate、tannin 一起背"
  },
  {
    group: "造血系統",
    drug: "注射鐵劑 (Ferric complexes)",
    mechanism: "以三價鐵可溶性複合體 IV 補充鐵",
    indication: "最嚴重缺鐵性貧血或口服鐵劑無效者",
    pitfall: "過敏、呼吸困難、CV collapse、過量可 iron overload",
    reversal: "Deferasirox",
    monitoring: "注射鐵多為 ferric complex；不是常規 first line",
    keyPoint: "注射鐵不是常規首選，而是 severe deficiency / oral ineffective 才上"
  },
  {
    group: "造血系統",
    drug: "Deferasirox",
    mechanism: "口服鐵螯合劑，與鐵結合後經膽汁 / 糞便排出",
    indication: "口服或注射鐵劑過量中毒，尤其出現休克症狀時",
    pitfall: "GI upset、rash",
    reversal: "口服與注射鐵中毒都能用",
    monitoring: "20-30 mg/kg 口服；對 Zn、Cu 親和力較小",
    keyPoint: "Deferasirox 的中文名是易解鐵，而且是口服鐵螯合劑"
  },
  {
    group: "造血系統",
    drug: "Folic acid",
    mechanism: "經 DHFR 二次還原後形成 THF，作為 one-carbon donor 參與 purine 與 dTMP 合成",
    indication: "Folate 缺乏造成的 megaloblastic anemia",
    pitfall: "過量會掩蓋 pernicious anemia",
    reversal: "不是 MTX rescue 正解",
    monitoring: "0.1-0.2 mg/day；熱敏感；每日總量 < 1 mg",
    keyPoint: "葉酸能治 megaloblastic anemia，但不能阻止 B12 缺乏的神經退化"
  },
  {
    group: "造血系統",
    drug: "THF / Leucovorin",
    mechanism: "直接繞過 DHFR 阻斷，補回活性葉酸循環",
    indication: "Methotrexate 引起的貧血 / 葉酸途徑毒性救援",
    pitfall: "若誤答成 folic acid，代表忽略 DHFR 已被 MTX 阻斷",
    reversal: "MTX-related folate pathway rescue",
    monitoring: "重點是直接繞過 DHFR，不要用 folic acid 或 DHF 代替",
    keyPoint: "MTX 造成貧血的標準答案是 THF / leucovorin"
  },
  {
    group: "造血系統",
    drug: "Vitamin B12",
    mechanism: "補回 cobalamin，恢復 folate 循環與 methylmalonyl-CoA -> succinyl-CoA 反應",
    indication: "Pernicious anemia、B12 缺乏造成的 megaloblastic anemia 與神經症狀",
    pitfall: "若只補葉酸會改善血象卻放任神經退化",
    reversal: "Pernicious anemia 的根本補充",
    monitoring: "口服需 intrinsic factor；無 IF 可 IV / IM；hydroxocobalamin 注射較佳",
    keyPoint: "B12 缺乏會有 MMA 累積與 demyelination，這才是 pernicious anemia 惡性的地方"
  },
  {
    group: "造血系統",
    drug: "EPO",
    mechanism: "活化 EPO receptor，經 JAK-STAT 促進 erythroid progenitor 增生分化",
    indication: "慢性腎衰竭相關貧血、造血機能不足",
    pitfall: "過量可高血壓與血栓",
    reversal: "無特異性解毒",
    monitoring: "50-150 IU/kg，每週 3 次；10 天 retic 上升；常需補鐵或葉酸",
    keyPoint: "EPO 最典型用途是 CKD anemia，來源在 renal peritubular interstitial cells"
  },
  {
    group: "造血系統",
    drug: "G-CSF (Filgrastim)",
    mechanism: "刺激嗜中性球生成",
    indication: "Neutropenia、化療 / 放療後支持治療",
    pitfall: "骨痛",
    reversal: "無特異性解毒",
    monitoring: "24 小時內 WBC 上升；停藥 24 小時後減半",
    keyPoint: "G-CSF 比 GM-CSF 更 selective、更常用、較能忍受"
  },
  {
    group: "造血系統",
    drug: "GM-CSF (Sargramostim)",
    mechanism: "刺激嗜中性球，也增加巨噬細胞生成",
    indication: "骨髓抑制 / neutropenia 的造血支持",
    pitfall: "發熱、抑鬱、關節痛、肌痛",
    reversal: "無特異性解毒",
    monitoring: "不只 neutrophil，也會增加 macrophage",
    keyPoint: "GM-CSF 和 G-CSF 的差別在作用較廣、但副作用也較多"
  },
  {
    group: "造血系統",
    drug: "IL-11 (Oprelvekin)",
    mechanism: "促進巨核球系統與血小板生成",
    indication: "預防非脊椎性癌症化療引起的 thrombocytopenia",
    pitfall: "筆記副作用未特別強調，但臨床用途明確",
    reversal: "無特異性解毒",
    monitoring: "是第一個 FDA 核准治療 thrombocytopenia 的藥物",
    keyPoint: "雖然 in vitro 非特異性，但臨床上主要增加的是血小板"
  },
  {
    group: "造血系統",
    drug: "TPO receptor agonists",
    mechanism: "活化 TPO receptor，促進 megakaryocyte 增殖分化，增加血小板",
    indication: "成人慢性 ITP；脾切除後治療失敗或不適合脾切除者",
    pitfall: "用於 chronic ITP，不是所有 thrombocytopenia 都直接用",
    reversal: "無特異性解毒",
    monitoring: "Romiplostim 為 SC peptibody；Eltrombopag 為上市血小板生成藥",
    keyPoint: "考 chronic ITP 的血小板生成藥時，要想到 Romiplostim / Eltrombopag"
  }
];
