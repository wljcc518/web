type ProjectDetail = {
  number: string; title: string; shortTitle: string; subtitle: string; period: string; role: string; goalLead: string; goal: string;
  painIntro: string; pains: [string, string][]; work: { title: string; lead: string; points: string[] }[];
  qcTitle: string; qc: string[]; qcResult: string; lanes: [string, ...string[]][]; flow: string[]; assets: string[];
  outcomes: [string, string][]; outcomeNotes: string[]; retro: string[];
  // 章节标签与标题(每个项目可独立)
  steps: string[];
  painTag: string; painH3: string;
  workTag: string; workH3: string;
  reviewTag: string;
  flowTag: string; flowH3: string;
  resultTag: string; resultH3: string;
  retroTag: string; retroH3: string;
  // section-1 改造(可选)
  section1Tag?: string; section1H3?: string;
  // section-1 扩展内容(项目背景 / 评测对象)
  background?: string;
  evaluationTargets?: string;
  // 扩展章节(可选,项目01 使用 12 步全流程)
  extraTags?: { tag: string; h3: string }[];
  stats?: [string, string][];
  attributions?: string[];
  reportTag?: string; reportH3?: string; report?: string;
  suggestionsTag?: string; suggestionsH3?: string; suggestions?: { team: string; items: string[] }[];
  nextTag?: string; nextH3?: string; nextItems?: string[];
};

const projects: Record<string, ProjectDetail> = {
  "01": {
    number:"01", title:"音视频生成模型横向评测专项", shortTitle:"音视频生成模型横向评测", subtitle:"从业务选型问题，到可复用的评测资产。", period:"2025.04-2025.05", role:"评测&数据负责人", goalLead:"多款第三方音视频AIGC模型横向对比选型", goal:"输出选型决策依据，沉淀可复用评测资产，指导后续模型迭代。", painIntro:"业务需要采购落地音视频生成模型，原有评测方式无法提供稳定、客观、可复现的判断。", background:"为评估市面 AI 音视频生成模型实际能力，选取 HappyHorse 1.1、Seedance 2.0、 Kling 3.0、Google Veo 3.1、SkyReels V4等5款主流模型开展横向测评，覆盖影视剧情、商业广告、建筑漫游、游戏打斗、演唱会现场场景，输出评测规范、BadCase 样本及选型建议，为", evaluationTargets:"HappyHorse 1.1、Seedance 2.0、 Kling 3.0、Google Veo 3.1、SkyReels V4等5款", pains:[["无统一评测标准","缺少贴合业务场景的打分维度，判断依赖个人感受。"],["评测样本混乱","缺少高难边界 Case，评测结论容易失真。"],["评测成本高、周期长","全人工评审与统计，耗费大量人力。"],["只有排名，没有沉淀","缺陷样本未被保留，无法指导算法迭代。"]], work:[{title:"标准体系搭建",lead:"把主观观感转化为业务标准。",points:["设计 7 维加权评测体系","划分缺陷等级并输出评测 SOP","构建分层难度测试集"]},{title:"模型评测与盲审",lead:"用控制变量保证横向对比公平。",points:["样本脱敏并执行双人盲审","统一提示词与生成参数","记录缺陷位置与时间戳并输出选型报告"]},{title:"自动化数据链路",lead:"把时间留给判断，而非重复统计。",points:["批量归集样本与元数据打标","自动聚合分数并计算加权总分","按模型和缺陷类型自动归档"]},{title:"BadCase 闭环运营",lead:"让每个缺陷成为优化坐标。",points:["沉淀带时间戳视频缺陷库","分类漂移、畸变、音画不同步等问题","复用测试集完成新版模型复测"]}], qcTitle:"双人盲审仲裁流程",qc:["样本脱敏混淆","双人独立打分","分歧样本进入争议池","负责人依据 SOP 仲裁"],qcResult:"显著降低人为主观偏差。",lanes:[["业务产品","业务选型需求输入","接收选型报告"],["评测负责人","维度与权重设计","争议仲裁","指标聚合"],["评测执行","统一生成样本","脱敏盲审打分"],["算法团队","接收 BadCase","新版本复测"]],flow:["需求输入","维度与权重设计","分层测试集","统一生成","脱敏盲审","争议仲裁","自动聚合","选型报告","BadCase 沉淀","版本复测"],assets:["音视频评测 SOP","分层测试集","选型决策报告","视频 BadCase 库"],outcomes:[["70%","评测人力成本下降"],["3天→4小时","完整评测周期"],["800+","带时间戳缺陷样本"]],outcomeNotes:["建立 7 维度加权评测体系","选型报告直接支撑采购决策","整套评测资产可持续复用"],retro:["评测必须锚定真实业务场景","盲审与控制变量是公平对比的核心","测试集与 BadCase 才是可持续资产"],
    steps:["明确背景、目标、评测对象、评测边界","构建评测集","小规模验证评测集可用性","制定评测规则和评分标准","选择评测方法：GSB\\SBS\\评分法\\二值判断","组织视评、培训、双盲或多人评测","正式评测和质检验收","统计数据和拆分维度","做问题归因","输出评测报告","给训练团队、算法团队、产品团队、提供优化建议","下一轮训练\\调参\\产品迭代"],
    painTag:"02 / CONTEXT", painH3:"核心工作拆解",
    workTag:"03 / CORE WORK", workH3:"质控机制【可视化：双人盲审仲裁流程】",
    reviewTag:"04 / QUALITY CONTROL",
    flowTag:"05 / DELIVERY FLOW", flowH3:"流程泳道图",
    resultTag:"06 / MEASURABLE OUTCOME", resultH3:"量化业务成果",
    retroTag:"07 / RETROSPECTIVE", retroH3:"一次项目结束，<br/>一套方法继续生长。",
    // section-1 改造:与 section-2 保持「小标签 + h3」统一版式
    section1Tag:"", section1H3:"01 背景&业务痛点",
    // 扩展章节(08-12)
    extraTags: [
      { tag:"08 / STATS & DIMENSIONS", h3:"统计数据，<br/>按维度拆开看差异。" },
      { tag:"09 / ROOT CAUSE", h3:"找到问题背后的<br/>真正原因。" },
      { tag:"10 / REPORT", h3:"把结论写进<br/>评测报告。" },
      { tag:"11 / HANDOFF", h3:"给训练 / 算法 / 产品<br/>的优化建议。" },
      { tag:"12 / NEXT ITERATION", h3:"下一轮训练、<br/>调参、产品迭代。" },
    ],
    stats:[["100","评测样本（每模型）"],["7","评测维度"],["20","视评人数"],["100%","样本脱敏覆盖率"]],
    attributions:["漂移类问题多源自 prompt分布偏移，建议扩充分层测试集","畸变与音画不同步集中在长样本尾部，需调整生成参数截断策略","同一提示词下各模型缺陷类型稳定，规则体系可直接复用","BadCase 集中度高于 60%，对应算法可针对高频类型定向修复"],
    reportTag:"10 / REPORT", reportH3:"把结论写进<br/>评测报告。",
    report:"[TODO] 在此填写项目01 的评测报告内容。可包含：报告结构、目标读者、关键结论摘要、模型推荐与不推荐清单、风险与边界声明。",
    suggestionsTag:"11 / HANDOFF", suggestionsH3:"给训练 / 算法 / 产品<br/>的优化建议。",
    suggestions:[
      { team:"训练团队", items:["[TODO] 补充 prompt 分布与训练语料对齐","[TODO] 增加分层数据,降低长样本尾部缺陷","[TODO] 沉淀高频 BadCase 作为反向样本"] },
      { team:"算法团队", items:["[TODO] 针对漂移、畸变类型定向优化","[TODO] 调整生成参数截断策略","[TODO] 提供版本对比自动化脚本"] },
      { team:"产品团队", items:["[TODO] 梳理业务实际调用场景与样本的匹配度","[TODO] 定义上线验收标准与回滚阈值","[TODO] 规划下一轮选型与采购节奏"] },
    ],
    nextTag:"12 / NEXT ITERATION", nextH3:"下一轮训练、<br/>调参、产品迭代。",
    nextItems:["[TODO] 复盘本轮评测流程,更新 SOP V2","[TODO] 启动下一轮训练,纳入本轮 BadCase 反向样本","[TODO] 完成产品侧 A/B 试与上线决策","[TODO] 建立长期评测跟踪机制,持续校准模型表现"],
  },
  "02": {
    number:"02", title:"主播形象 LoRA 微调数据集建设专项", shortTitle:"主播形象 LoRA 微调数据集", subtitle:"从素材标准，到人物还原度持续提升。", period:"2025.01‑2025.03", role:"数据训练负责人", goalLead:"构建高质量主播定制 LoRA 微调数据集", goal:"解决 AI 主播形象失真、五官漂移与服饰错乱问题，提升人物还原度。", painIntro:"业务需要训练多个主播专属 LoRA，原始素材直接训练时，质量与人物一致性均不稳定。", pains:[["缺少素材标准","没有统一的筛选、清洗和标注规范。"],["低质样本混杂","遮挡、变形和角度不当样本影响训练。"],["Caption 不规范","人物关键特征在描述中丢失。"],["缺少客观评测","无法稳定判断模型训练效果。"]],work:[{title:"标准体系搭建",lead:"定义可训练素材的明确边界。",points:["输出素材筛选与 Caption 标准","定义面部、服饰、场景标注维度","划分优质、可用、淘汰等级"]},{title:"模型评测与盲审",lead:"用量化评测替代随意看图。",points:["设计身份、五官、服饰、画质维度","组织人物模型盲审评测","输出缺陷定位报告"]},{title:"自动化数据链路",lead:"批量处理重复性素材工作。",points:["Dify 完成初筛、裁剪和抽帧","批量生成 Caption","过滤模糊与重复图片"]},{title:"BadCase 闭环运营",lead:"从生成缺陷反推训练集优化。",points:["归集畸变、五官错乱、身份漂移","区分素材、Caption 与模型问题","补优汰劣并复测新版 LoRA"]}],qcTitle:"素材双人复核流程",qc:["初筛低质样本","高价值素材双人复核","争议样本负责人判定","更新筛选标准"],qcResult:"确保进入训练集的素材稳定、可用。",lanes:[["业务运营","人物定制需求"],["数据负责人","标准输出","争议判定"],["标注处理","采集清洗标注","双人复核"],["算法训练","训练 LoRA","盲审评测","迭代训练"]],flow:["人物需求","标准输出","素材采集","初筛清洗","双人复核","自动预处理","模型训练","盲审评测","BadCase 回流"],assets:["LoRA 素材筛选 SOP","高质量微调数据集","人物评测集","生成 BadCase 库"],outcomes:[["60%","图片重复处理工作减少"],["多套","高质量主播数据集"],["显著提升","人物身份一致性"]],outcomeNotes:["人物畸变问题大幅下降","新主播项目可直接复用规范","素材质量与 Caption 共同决定效果上限"],retro:["素材质量比单纯增加数量更重要","必须建立独立评测体系","BadCase 是持续提升人物还原度的关键"],
    steps:["项目信息","素材与标注痛点","数据集与训练","双人复核机制","数据生产链路","训练与评测结果","经验与可复用资产"],
    painTag:"02 / CONTEXT", painH3:"为什么训练素材<br/>需要重新定义？",
    workTag:"03 / DATASET & TRAINING", workH3:"从素材筛选，<br/>到人物还原度提升。",
    reviewTag:"04 / MATERIAL REVIEW",
    flowTag:"05 / DATA PIPELINE", flowH3:"从人物需求，<br/>到 BadCase 回流的链路。",
    resultTag:"06 / TRAINING OUTCOME", resultH3:"素材标准建立，<br/>人物还原度被验证。",
    retroTag:"07 / RETROSPECTIVE", retroH3:"数据质量比数量更重要，<br/>评测闭环决定上线稳定性。",
  },
  "03": {
    number:"03", title:"寰宇惠农补贴多模态素材治理专项", shortTitle:"惠农多模态素材治理", subtitle:"从行业事实标准，到可复用的合规素材资产。", period:"2024.10‑2024.12", role:"数据训练负责人（独立全权承接）", goalLead:"搭建合规多模态素材库", goal:"解决 AIGC 海报和短视频中的补贴、养分错误及图文冲突，支撑生成与质检模型训练。", painIntro:"惠农电商 AIGC 素材批量生成上线后，事实错误、流程混乱与合规风险集中暴露。", pains:[["缺少统一标准","养分、登记证和补贴政策没有权威判定依据。"],["事实与合规风险","虚假补贴、养分错误和夸大宣传频发。"],["素材流程混乱","入库挂载依赖人工，处理效率低。"],["缺少 BadCase 沉淀","算法迭代缺少明确数据支撑。"]],work:[{title:"标准体系搭建",lead:"以国标与官方政策建立事实边界。",points:["对齐 GB18382 与惠农政策","输出通用规范和化肥专项规范","划分 P0-P3 缺陷等级"]},{title:"模型评测与盲审",lead:"多维识别素材风险。",points:["构建图文与短视频评测集","评测事实、对齐、合规和业务可用性","区分规则、数据与模型边界"]},{title:"自动化数据链路",lead:"把风险拦截前置。",points:["自动去重、关键词校验与元数据打标","素材分类归档","前置拦截 P0 致命错误"]},{title:"BadCase 闭环运营",lead:"让问题样本反向更新规则与训练集。",points:["归集政策、养分和图文冲突样本","周期复盘并更新规范","样本回流训练并复测"]}],qcTitle:"三级闭环质检",qc:["标注员自检","双人交叉标注","负责人仲裁","持续迭代 SOP"],qcResult:"团队标注一致性从 72% 提升至 91%。",lanes:[["业务运营","业务痛点输入","上线验证"],["数据负责人","标准 V1/V2","争议仲裁"],["标注团队","批量治理","三级质控"],["算法团队","盲审评测","回流迭代"]],flow:["痛点输入","标准撰写","批量治理","三级质控","自动预处理","盲审评测","BadCase 回流","上线验证"],assets:["标注与挂载 SOP","标准化素材库","评测报告","农资 BadCase 库"],outcomes:[["12万+","治理多模态营销素材"],["67%","P0 致命错误率下降"],["55%","自动化人效提升"]],outcomeNotes:["支撑两套模型训练","新项目搭建周期缩短 60%","标注一致性 72% 提升至 91%"],retro:["垂直行业数据必须对齐国标与官方政策","V1 快速交付并滚动迭代","自动化风控与 BadCase 闭环缺一不可"],
    steps:["项目信息","行业事实与合规痛点","标准与治理流程","三级质控机制","合规治理链路","合规与自动化结果","经验与可复用规范"],
    painTag:"02 / CONTEXT", painH3:"为什么惠农素材<br/>需要重新定义？",
    workTag:"03 / STANDARDS & QC", workH3:"从行业事实，<br/>到合规素材资产。",
    reviewTag:"04 / 3-LEVEL QC",
    flowTag:"05 / COMPLIANCE FLOW", flowH3:"从痛点输入，<br/>到合规上线验证。",
    resultTag:"06 / COMPLIANCE OUTCOME", resultH3:"事实标准被建立，<br/>合规效果可被验证。",
    retroTag:"07 / RETROSPECTIVE", retroH3:"垂直行业必须对齐国标，<br/>迭代节奏决定上线效率。",
  },
  "04": {
    number:"04", title:"团员平台多模态智能客服数据建设", shortTitle:"多模态智能客服数据建设", subtitle:"从真实会话场景，到持续优化的客服数据闭环。", period:"2024.03‑2024.05", role:"数据训练负责人（独立负责全链路）", goalLead:"构建图文对话训练数据集", goal:"优化客服大模型意图识别与图文理解能力，降低人工客服转接率。", painIntro:"智能客服上线后，图文咨询识别不准、数据口径不一且缺少客观评测。", pains:[["图文理解不足","截图类咨询意图识别与图文匹配较差。"],["缺少场景与 SOP","真实咨询场景未系统梳理。"],["标注口径不一致","数据集质量不稳定。"],["缺少评测手段","无法客观衡量业务效果。"]],work:[{title:"标准体系搭建",lead:"从真实咨询建立标注规则。",points:["梳理 200+ 真实咨询场景","输出多轮图文对话标注 SOP","定义意图、实体与图文关联规则"]},{title:"模型评测与盲审",lead:"用业务评测集定位短板。",points:["构建文本与图文混合评测集","从意图、答案和图文理解多维打分","输出错误分布与评测报告"]},{title:"自动化数据链路",lead:"减少重复整理，提升交付效率。",points:["自动过滤与清洗脏数据","对话元数据自动打标","批量导出与格式转换"]},{title:"BadCase 闭环运营",lead:"让线上错误持续回流训练。",points:["归集意图误识别与图文失败 Case","清洗改写后回流训练集","固定评测集复测迭代版本"]}],qcTitle:"二级质检与仲裁流程",qc:["标注员自检","高风险样本双人复核","分歧 Case 负责人仲裁","更新 SOP 规则"],qcResult:"标注一致性从 68% 提升至 89%。",lanes:[["业务运营","线上会话痛点"],["数据负责人","场景与 SOP","争议仲裁"],["标注执行","数据生产","二级质检"],["算法团队","评测与训练","版本复测"]],flow:["痛点输入","场景梳理","数据标注","二级质检","自动清洗","评测集构建","BadCase 回流","模型复测"],assets:["图文对话标注 SOP","多模态客服数据集","客服评测集","会话 BadCase 库"],outcomes:[["200+","真实咨询场景覆盖"],["68%→89%","标注一致性"],["显著下降","人工客服转接率"]],outcomeNotes:["完成多轮图文对话数据集建设","意图识别准确率提升","评测资产可迁移复用"],retro:["客服数据必须来自真实线上会话","图文关联判定是规范重点","持续采集线上 BadCase 才能形成长期优化"],
    steps:["项目信息","客服会话痛点","标准与数据生产","二级质检机制","数据建设链路","客服模型结果","经验与可复用资产"],
    painTag:"02 / CONTEXT", painH3:"为什么客服数据<br/>需要重新定义？",
    workTag:"03 / DATA & TRAINING", workH3:"从真实会话，<br/>到持续优化的客服数据闭环。",
    reviewTag:"04 / 2-LEVEL QC",
    flowTag:"05 / DATA PIPELINE", flowH3:"从线上痛点，<br/>到模型版本复测。",
    resultTag:"06 / MODEL OUTCOME", resultH3:"数据标准建立，<br/>客服效果可被验证。",
    retroTag:"07 / RETROSPECTIVE", retroH3:"真实线上数据是命脉，<br/>BadCase 是长期优化燃料。",
  },
};

projects["01"].pains = [
  ["标准体系搭建", "对齐业务真实场景，设计7维加权评测体系：事实准确性、主体时序稳定性、音画字幕对齐、画质、叙事逻辑、人物完整性、业务可用性；\n划分缺陷严重等级；\n构建分层难度测试集（普通场景、高频业务场景、长尾边界case），输出音视频评测SOP。"],
  ["模型评测与盲审", "样本做脱敏混淆，执行双人盲审，消除对模型的主观偏好；\n统一提示词控制变量，多模型对比；\n逐视频记录缺陷、缺陷时间戳；\n汇总指标，输出完整选型报告，给出落地风险与选型建议。"],
  ["自动化数据链路", "实现样本批量归集、元数据打标；\n自动聚合打分结果、计算加权总分；\n素材自动按模型、缺陷类型归档，减少Excel手工统计。"],
  ["BadCase闭环运营", "沉淀带时间戳音视频BadCase库，对漂移、畸变、音画不同步等问题做分类；\n交付算法团队用于训练优化；\n后续新版本模型直接复用同一套测试集做复测。"],
];

projects["01"].work = [
  { title: "样本脱敏混淆，隐藏模型来源；", lead: "", points: [] },
  { title: "双人独立打分；", lead: "", points: [] },
  { title: "分数差异超过阈值进入争议池；", lead: "", points: [] },
  { title: "负责人依据SOP仲裁，同步更新评测规则；监控评测人员一致性。", lead: "", points: [] },
];

export function ProjectCaseStudyHero({ projectNumber }: { projectNumber: string }) {
  const p = projects[projectNumber] ?? projects["01"];
  const overviewPainItems = [
    "没有贴合业务场景的统一评测打分维度，全靠个人主观感受；",
    "测试样本随手挑选，缺少高难边界case，评测结论容易失真；",
    "全人工评审，统计工作繁琐，评测周期长、人力成本高；",
    "只输出排名，没有沉淀缺陷样本，无法给到算法明确迭代方向。",
  ];
  const navigationSteps = p.number === "01"
    ? ["背景&业务痛点", "核心工作拆解", "质控机制【可视化：双人盲审仲裁流程】", "流程泳道图", "量化业务成果", "项目复盘"]
    : p.steps;
  const navigationSectionTargets = p.number === "01" ? [1, 2, 3, 5, 6, 7] : navigationSteps.map((_, i) => i + 1);
  return <><section className={`audio-project-masthead${p.number === "01" ? " has-project-meta" : ""}`}><div><span>CASE STUDY / {p.number}</span><h2>{p.shortTitle}</h2>{p.number === "01" ? <div className="audio-project-masthead-meta"><p><b>周期：</b>{p.period}</p><p><b>角色：</b>{p.role}</p><p><b>业务目标：</b>{p.goalLead}；{p.goal}</p></div> : <p>{p.subtitle}</p>}</div></section><nav className="audio-project-steps" data-project={p.number} aria-label="项目详情页章节">{navigationSteps.map((x,i)=><a key={x} href={`#project-${p.number}-section-${navigationSectionTargets[i]}`}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></a>)}</nav><section id={`project-${p.number}-section-1`} className="audio-project-hero" data-h3-size="24"><div className="audio-project-hero-heading">{p.section1Tag && <span>{p.section1Tag}</span>}{p.section1H3 && <h3>{p.section1H3}</h3>}</div>{p.number === "01" ? <div className="audio-project-overview-pains"><p>业务需要采购落地音视频生成模型，原有评测方式存在缺陷：</p><ol>{overviewPainItems.map(item => <li key={item}>{item}</li>)}</ol></div> : <div className="audio-project-facts audio-project-facts--stacked"><article className="audio-project-fact-item"><span>项目周期：</span><strong>{p.period}；</strong></article><article className="audio-project-fact-item"><span>业务目标：</span><strong>{p.goalLead}</strong><p>{p.goal}</p></article>{p.evaluationTargets !== undefined && <article className="audio-project-fact-item"><span>评测对象：</span><strong>{p.evaluationTargets}</strong></article>}</div>}</section></>;
}

const RenderH3 = ({ html }: { html: string }) => {
  // 把 "文本<br/>文本" 字符串切成 JSX
  const parts = html.split(/<br\s*\/?>/i);
  return <h3>{ parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? <br /> : null}
    </span>
  )) }</h3>;
};

export function ProjectCaseStudy({ projectNumber }: { projectNumber: string }) {
  const p=projects[projectNumber]??projects["01"];
  return <div className="audio-case-study"><section id={`project-${p.number}-section-2`} className="audio-case-pain" data-h3-size="24"><header><span>{p.painTag}</span><RenderH3 html={p.painH3} /><p className="audio-case-section-intro">{p.painIntro}</p></header><div>{p.pains.map(([t,c],i)=><article key={t}><span>0{i+1}</span><h4>{t}</h4><p>{c}</p></article>)}</div></section><section id={`project-${p.number}-section-3`} className="audio-case-work" data-h3-size="24"><header><span>{p.workTag}</span><RenderH3 html={p.workH3} /></header><div>{p.work.map((w,i)=><article key={w.title}><span>0{i+1}</span><div><h4>{w.title}</h4><strong>{w.lead}</strong><ul>{w.points.map(x=><li key={x}>{x}</li>)}</ul></div></article>)}{p.number === "01" && <img className="audio-case-work-visual" src="/media/blind-review-arbitration.png" alt="双人盲审仲裁流程" />}</div></section><section id={`project-${p.number}-section-4`} className="audio-case-review"><header><span>{p.reviewTag}</span><h3>{p.qcTitle}</h3><p>{p.qcResult}</p></header><div className="blind-review-flow">{p.qc.map((x,i)=><div key={x}><i>{i+1}</i><span>{x}</span>{i<p.qc.length-1&&<b>→</b>}</div>)}</div></section><section id={`project-${p.number}-section-5`} className="audio-case-swimlane" data-h3-size="24"><header><span>{p.flowTag}</span><RenderH3 html={p.flowH3} /></header><div className="flow-sequence">{p.flow.map((x,i)=><span key={x}><b>{String(i+1).padStart(2,"0")}</b>{x}</span>)}</div><div className="swimlane-chart">{p.lanes.map(([lane,...steps])=><div className="swimlane-row" key={lane}><b>{lane}</b><div>{steps.map(x=><span key={x}>{x}</span>)}</div></div>)}</div><div className="swimlane-assets">{p.assets.map(x=><span key={x}>{x}</span>)}</div></section><section id={`project-${p.number}-section-6`} className="audio-case-results" data-h3-size="24"><span>{p.resultTag}</span><RenderH3 html={p.resultH3} /><div className="result-grid">{p.outcomes.map(([n,l])=><article key={l}><strong>{n}</strong><p>{l}</p></article>)}</div><ul className="result-evidence">{p.outcomeNotes.map(x=><li key={x}>{x}</li>)}</ul></section><section id={`project-${p.number}-section-7`} className="audio-case-retro" data-h3-size="24"><header><span>{p.retroTag}</span><RenderH3 html={p.retroH3} /></header><ol>{p.retro.map(x=><li key={x}>{x}</li>)}</ol></section>{p.extraTags && p.extraTags[0] && <section id={`project-${p.number}-section-8`} className="audio-case-results" data-h3-size="24"><span>{p.extraTags[0].tag}</span><RenderH3 html={p.extraTags[0].h3} /><div className="result-grid">{(p.stats || []).map(([n,l])=><article key={l}><strong>{n}</strong><p>{l}</p></article>)}</div></section>}{p.extraTags && p.extraTags[1] && <section id={`project-${p.number}-section-9`} className="audio-case-retro" data-h3-size="24"><header><span>{p.extraTags[1].tag}</span><RenderH3 html={p.extraTags[1].h3} /></header><ol>{(p.attributions || []).map(x=><li key={x}>{x}</li>)}</ol></section>}{p.report && <section id={`project-${p.number}-section-10`} className="audio-case-banner"><article><span>{p.reportTag}</span><RenderH3 html={p.reportH3 || ""} /><p>{p.report}</p></article></section>}{p.suggestions && <section id={`project-${p.number}-section-11`} className="audio-case-review" data-h3-size="24"><header><span>{p.suggestionsTag}</span><RenderH3 html={p.suggestionsH3 || ""} /></header><div className="blind-review-flow">{p.suggestions.map(s=><div key={s.team}><i>·</i><span><b>{s.team}</b>{s.items.map((it,idx)=><i key={idx}>· {it}</i>)}</span></div>)}</div></section>}{p.nextItems && <section id={`project-${p.number}-section-12`} className="audio-case-retro" data-h3-size="24"><header><span>{p.nextTag}</span><RenderH3 html={p.nextH3 || ""} /></header><ol>{p.nextItems.map(x=><li key={x}>{x}</li>)}</ol></section>}</div>;
}
