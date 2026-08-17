export type PortfolioSection = {
  slug: string;
  number: string;
  eyebrow: string;
  meta: string;
  title: string;
  cardTitle: string;
  cardKicker: string;
  summary: string;
  proof: string;
  accent: string;
  visual: string;
  code: string;
  intro: string;
  metrics: Array<{
    value: string;
    label: string;
    stage?: string;
    highlights?: string[];
  }>;
  points: Array<{ title: string; text: string; detail?: string }>;
  artifacts: string[];
};

export const sections: PortfolioSection[] = [
  {
    slug: "core-thinking",
    number: "01",
    eyebrow: "AI TRAINING PORTFOLIO / 2026",
    meta: "多模态数据 / 模型评测",
    title: "资深\nAI训练师",
    cardTitle: "资深 AI 训练师",
    cardKicker: "多模态 / LoRA / 评测",
    summary:
      "专注多模态数据集治理、LoRA 垂类微调、大模型盲测评测与标准化标注体系落地。",
    proof: "LLM SFT · 音视频评测 · Dify · BadCase",
    accent: "#82a8c7",
    visual: "thinking",
    code: "PROFILE / 01",
    intro:
      "以多模态数据治理为基础，连接 LoRA、SFT 数据生产、模型盲测评估和 BadCase 回流，形成可验证的训练闭环。",
    metrics: [
      { value: "+37%", label: "主播模型风格相似度提升" },
      { value: "15节点", label: "Dify 自动化处理链路" },
      { value: "全模态", label: "文本、图文、音视频治理" },
    ],
    points: [
      {
        title: "原始素材与自动预处理",
        text: "接入音频、视频与文本素材，通过 ASR、切分、去噪和清洗完成标准化预处理。",
      },
      {
        title: "SFT 样本与 LoRA 训练",
        text: "按照人设、表达风格和数据准入标准构造 SFT 样本，支撑多主播、多轮次 LoRA 训练。",
      },
      {
        title: "模型评测与 BadCase 回流",
        text: "通过风格相似度盲测、质量门禁和缺陷归因，让问题样本回流数据链路持续迭代。",
      },
    ],
    artifacts: ["LoRA 数据流流程图", "Dify 自动化工作流", "SFT 样本规范", "盲测评估记录"],
  },
  {
    slug: "work-method",
    number: "02",
    eyebrow: "WORKING PRINCIPLES",
    meta: "工作核心思路",
    title: "工作核心思路",
    cardTitle: "工作核心思路",
    cardKicker: "目标 / 标准 / 评测 / 自动化",
    summary:
      "以业务目标为起点制定数据建设标准，平衡模型效果与落地成本；搭建标准化评测、双人盲审机制，削弱人工主观偏差，稳定数据集交付质量；搭建自动化预处理链路，释放人力聚焦高价值样本审核、缺陷根因分析。",
    proof: "业务目标 × 质量稳定 × 成本平衡",
    accent: "#a6b4bf",
    visual: "method",
    code: "METHOD / 02",
    intro:
      "以业务目标为起点，把数据标准、质量机制和自动化链路组合成可执行、可复核、可持续优化的工作方法。",
    metrics: [
      { value: "目标导向", label: "从业务结果反推数据建设标准" },
      { value: "双人盲审", label: "降低主观偏差并稳定交付质量" },
      { value: "自动链路", label: "释放人力聚焦高价值审核与归因" },
    ],
    points: [
      {
        title: "从业务目标制定标准",
        text: "以业务目标为起点制定数据建设标准，平衡模型效果与落地成本。",
      },
      {
        title: "用评测机制稳定质量",
        text: "搭建标准化评测、双人盲审机制，削弱人工主观偏差，稳定数据集交付质量。",
      },
      {
        title: "以自动化释放高价值人力",
        text: "搭建自动化预处理链路，释放人力聚焦高价值样本审核、缺陷根因分析。",
      },
    ],
    artifacts: ["数据建设标准", "双人盲审机制", "自动化预处理链路", "缺陷根因分析记录"],
  },
  {
    slug: "capability-system",
    number: "03",
    eyebrow: "CAPABILITY SYSTEM",
    meta: "四大能力体系",
    title: "四大能力体系",
    cardTitle: "训练能力矩阵",
    cardKicker: "数据 / 自动化 / 评测 / 管理",
    summary:
      "覆盖数据集治理、自动化流水线、模型评测与团队质量管理，既能设计标准，也能推动大规模生产落地。",
    proof: "规则 × 工具 × 评测 × 协同",
    accent: "#9aa6b2",
    visual: "capability",
    code: "SYSTEM / 03",
    intro:
      "AI 训练专家的价值不在单点工具使用，而在于把数据、流程、评测与组织协同组合成稳定的生产系统。",
    metrics: [
      { value: "15", label: "Dify 模块化处理节点" },
      { value: "7维", label: "模型加权评测标准" },
      { value: "20人", label: "标注评测团队协同" },
    ],
    points: [
      {
        title: "标准体系搭建",
        text: "对齐业务痛点输出标注 SOP、评测规范、挂载规则，完成多模态数据标准从 0-1 落地，统一内外团队执行口径。",
        detail:
          "针对文本对话、图文素材、LoRA 微调、音视频生成等业务场景，梳理业务边界与风险 case，输出完整标注规范、质检规则、素材挂载标准；完成规则试标、迭代修订、培训落地，对齐业务、算法、标注多方认知，沉淀可复用的标准化文档资产，解决标准不统一、输出结果不可控问题。项目包含：多模态客服标注体系、化肥营销素材标注 & 挂载专项等。",
      },
      {
        title: "模型评测与盲审",
        text: "搭建多维度评测集，执行盲审评测，量化模型能力，输出可落地优化结论，支撑算法迭代决策。",
        detail:
          "围绕业务目标构建评测数据集，设计合规、事实准确性、图文一致性、生成质量等评测维度；组织盲审评测，规避主观偏见，量化模型各项指标；拆解 BadCase 根因，区分是模型能力问题、数据问题还是 prompt 问题，输出完整评测报告，给到算法明确优化方向，用于版本迭代验收。覆盖大语言模型、图文生成、音视频生成类模型评测工作。",
      },
      {
        title: "自动化数据链路",
        text: "串联工具、流水线，降低人工重复工作量，提升数据生产、处理、流转全链路人效。",
        detail:
          "基于 Dify 等工具搭建自动化工作流，实现图片 caption、视频抽帧、初筛过滤等能力；打通数据生产-质检-交付链路，把重复人工操作做自动化预处理；对接标注平台，优化数据流转流程，减少人工复制、筛选、导出的重复劳动，提升数据集交付效率，降低人为引入错误概率。不写底层代码，侧重业务侧流程编排、工具串联落地。",
      },
      {
        title: "BadCase 闭环运营",
        text: "收集归类线上 & 评测 BadCase，完成 case 回流、数据修复、样本补充，形成发现-分析-修复-验证闭环。",
        detail:
          "收集线上业务报错、评测过程中的失败样本，做分类根因分析；区分是规则缺失、训练数据不足、prompt 缺陷、模型本身能力边界；完成 case 清洗、修正、样本补充回流训练集；跟进模型迭代版本复测，验证问题是否修复，沉淀高频问题知识库，持续收敛模型业务侧问题，保障线上业务效果。",
      },
    ],
    artifacts: ["能力矩阵", "流程泳道图", "团队质检机制"],
  },
  {
    slug: "representative-projects",
    number: "04",
    eyebrow: "SELECTED PROJECTS",
    meta: "四个代表项目",
    title: "代表项目",
    cardTitle: "多模态项目画廊",
    cardKicker: "LoRA / 评测 / 图文 / 对话",
    summary:
      "用四个项目呈现从音视频模型横评、主播 LoRA 数据链路，到素材治理和多轮对话数据生产的完整实战。",
    proof: "4 个项目 · 4 类模型场景",
    accent: "#6f9ebf",
    visual: "projects",
    code: "WORK / 04",
    intro:
      "项目不只罗列职责，而是展示问题、方案、规则、过程证据、模型反馈和最终业务结果。",
    metrics: [
      { value: "5款", label: "音视频模型横向评测" },
      { value: "12万+", label: "多媒体素材治理" },
      { value: "8万+", label: "标准化对话训练集" },
    ],
    points: [
      {
        title: "音视频生成模型横向评测",
        text: "构建分层测试集和七维评分体系，沉淀 800+ 视频缺陷 BadCase。",
      },
      {
        title: "主播 LoRA 数据自动化",
        text: "搭建 15 节点 Dify 流水线，批量完成 ASR、清洗、反向 QA 与准入审核。",
      },
      {
        title: "惠农多模态素材治理",
        text: "统一图片、海报、视频标注与挂载规范，完成 12 万+ 素材入库。",
      },
      {
        title: "图文智能客服数据集",
        text: "搭建单轮、多轮对话标注体系，意图识别准确率提升至 92.6%。",
      },
    ],
    artifacts: ["项目总览卡", "流程与规则证据", "量化结果对比"],
  },
  {
    slug: "evidence",
    number: "05",
    eyebrow: "EVIDENCE FIRST",
    meta: "证据与结果",
    title: "证据与结果",
    cardTitle: "证据与结果",
    cardKicker: "口径 / 过程 / 指标",
    summary:
      "所有成果都说明数据来源、统计口径、验证方式和个人职责，让效率、质量和模型提升结果能够被复核。",
    proof: "指标有口径 · 过程有证据",
    accent: "#a0b6c8",
    visual: "evidence",
    code: "PROOF / 05",
    intro:
      "作品集量化数据均经过基线锚定、过程留痕、因果拆分，杜绝无依据数字堆砌；所有效率、质量指标均标注初始基线、统计主体、核验方式与个人动作影响，完整还原数据项目落地全链路可信度。",
    metrics: [
      { value: "70%", label: "人力评测成本下降" },
      { value: "98.5%", label: "素材合规率" },
      { value: "92.6%", label: "意图识别准确率" },
    ],
    points: [
      {
        title: "基线锚定・统一统计口径",
        text:
          "所有效率、准确率、错误率、一致性指标均标注改造前原始基线；锁定统计主体、计算规则、核验方式，杜绝孤立数字。\n\n改造前基线数值、数据统计方、核验手段、个人动作带来的差值变化\n标注一致性、致命错误率、人效耗时、评测周期均统一计算公式",
      },
      {
        title: "过程留痕・全链路凭证沉淀",
        text:
          "项目全节点资料归档留存，作为量化结果支撑依据\n\n标注 SOP 多版本迭代文档、工作节点排期记录、正负样本案例、每日质检台账、多轮评测汇总报表、BadCase 归档库、自动化流水线日志",
      },
      {
        title: "厘清因果・区分收益来源",
        text:
          "严格划分三类成果边界，不混淆个人贡献、团队协作收益、模型迭代综合收益\n\n标准搭建、评测体系设计、规则修订、流程方案设计\n质控机制落地、团队标注一致性提升\n数据集回流训练后，线上模型最终效果优化",
      },
    ],
    artifacts: ["指标口径卡", "Before / After", "BadCase 证据链"],
  },
  {
    slug: "assets",
    number: "06",
    eyebrow: "REUSABLE ASSETS",
    meta: "方法与资产复用",
    title: "资产持续沉淀",
    cardTitle: "训练资产库",
    cardKicker: "SOP / 模板 / BadCase",
    summary:
      "把一次性项目经验转化成标注 SOP、评测模板、工作流、规则库和 BadCase 资产，支持不同垂类快速复用。",
    proof: "从项目交付到组织资产",
    accent: "#7f98ad",
    visual: "assets",
    code: "DETAIL / APPROACH",
    intro:
      "优质 AI 数据能力不会随项目结束消散，把项目实战经验固化为可查阅、可版本迭代、跨业务可复用的数据资产，实现单次项目落地，多业务场景持续复用。",
    metrics: [
      { value: "800+", label: "视频缺陷 BadCase" },
      { value: "2000+", label: "图文错误 BadCase" },
      { value: "12000+", label: "对话缺陷样本" },
    ],
    points: [
      {
        title: "规则资产",
        text: "标注 SOP、素材挂载规范、数据准入规则和争议边界案例。",
      },
      {
        title: "工具资产",
        text: "Dify 工作流、Python 预处理需求、多格式导出和离线评测工具。",
      },
      {
        title: "缺陷资产",
        text: "按模型、场景、错误类型组织的图像、视频、对话 BadCase 库。",
      },
    ],
    artifacts: ["图片规则库", "视频规则库", "工作流模板库", "BadCase 目录"],
  },
  {
    slug: "career",
    number: "07",
    eyebrow: "CAREER & GROWTH",
    meta: "完整职业经历",
    title: "经历与成长轨迹",
    cardTitle: "经历与成长轨迹",
    cardKicker: "经历 / 角色 / 成长",
    summary:
      "从对话数据、图文素材治理逐步走向音视频评测和 LoRA 自动化，形成全模态训练与评测能力。",
    proof: "2023 — 2026 · 全模态成长",
    accent: "#8b9faf",
    visual: "career",
    code: "CAREER / 07",
    intro:
      "从数据执行落地，逐步成长为独立闭环多模态大模型数据训练负责人，完整经历标注质检、规范搭建、素材治理、自动化流水线、模型评测全业务域。",
    metrics: [
      {
        value: "2023",
        label: "图文多模态智能客服系统项目",
        stage: "AI 数据训练工程师｜执行落地阶段",
        highlights: [
          "夯实标注、质检、BadCase 样本沉淀基础",
          "完成多轮图文对话数据集交付，熟悉多模态业务痛点",
        ],
      },
      {
        value: "2024",
        label: "寰宇惠农补贴多模态素材治理专项",
        stage: "AI 训练专员｜专项模块负责人",
        highlights: [
          "独立输出全套标注 SOP、缺陷分级治理体系",
          "统筹内外标注团队，完成复杂业务素材从 0-1 治理落地",
        ],
      },
      {
        value: "2025+",
        label:
          "Dify 主播风格 LoRA 数据集自动化搭建专项\n音视频生成模型横向评测专项",
        stage: "AI 训练专家｜全闭环项目负责人",
        highlights: [
          "独立负责完整商业化项目，覆盖规范、评测、自动化、团队统筹全流程",
          "沉淀可复用规则、工作流、BadCase 资产库，输出业务量化收益",
        ],
      },
    ],
    points: [
      {
        title: "数据生产基础",
        text: "从单轮、多轮对话标注体系开始，掌握场景拆解、规则与质检。",
      },
      {
        title: "多模态扩展",
        text: "进入图片、海报、视频素材治理，理解标注、存储与线上挂载协同。",
      },
      {
        title: "训练与评测闭环",
        text: "通过 LoRA 数据流水线和多模型横评，形成数据驱动模型优化能力。",
      },
    ],
    artifacts: ["职业时间线", "角色能力变化", "完整简历 PDF"],
  },
];

export function getSection(slug: string) {
  return sections.find((section) => section.slug === slug);
}
