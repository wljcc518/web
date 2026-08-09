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
  metrics: Array<{ value: string; label: string }>;
  points: Array<{ title: string; text: string }>;
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
        title: "数据集治理",
        text: "文本、图文、音视频全模态清洗、标注、质检、格式化与版本管理。",
      },
      {
        title: "自动化流水线",
        text: "Dify 与 Python 组合处理 ASR、清洗、分段、去重、审核和多格式导出。",
      },
      {
        title: "评测与 BadCase",
        text: "分层测试集、双人盲审、加权评分和缺陷分类，形成模型迭代证据。",
      },
      {
        title: "团队质量管理",
        text: "试标、培训、分层质检、争议校准与交付节奏管理。",
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
    meta: "结果必须经得起追问",
    title: "结果必须\n经得起追问",
    cardTitle: "证据与结果",
    cardKicker: "口径 / 过程 / 指标",
    summary:
      "所有成果都说明数据来源、统计口径、验证方式和个人职责，让效率、质量和模型提升结果能够被复核。",
    proof: "指标有口径 · 过程有证据",
    accent: "#a0b6c8",
    visual: "evidence",
    code: "PROOF / 05",
    intro:
      "作品集中的数字不是装饰。每个结果都需要回答：基线是什么、由谁统计、怎样验证、我的动作产生了什么影响。",
    metrics: [
      { value: "70%", label: "人力评测成本下降" },
      { value: "98.5%", label: "素材合规率" },
      { value: "92.6%", label: "意图识别准确率" },
    ],
    points: [
      {
        title: "基线与口径",
        text: "明确改造前的耗时、准确率、合规率或错误率，避免只展示孤立结果。",
      },
      {
        title: "过程证据",
        text: "保留规则版本、工作流节点、样本示例、质检记录和评测汇总。",
      },
      {
        title: "因果边界",
        text: "区分个人直接产出、团队协同结果与模型训练后的综合提升。",
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
    code: "ASSET / 06",
    intro:
      "真正可复用的训练能力，会在项目结束后留下可查询、可版本化、可迁移的资产，而不是停留在个人经验中。",
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
    title: "经历与\n成长轨迹",
    cardTitle: "经历与成长轨迹",
    cardKicker: "经历 / 角色 / 成长",
    summary:
      "从对话数据、图文素材治理逐步走向音视频评测和 LoRA 自动化，形成全模态训练与评测能力。",
    proof: "2023 — 2026 · 全模态成长",
    accent: "#8b9faf",
    visual: "career",
    code: "CAREER / 07",
    intro:
      "职业路径呈现能力如何逐步形成：先建立标注与质量基础，再扩展素材治理、自动化数据生产和模型评测。",
    metrics: [
      { value: "2023", label: "多轮对话数据治理" },
      { value: "2024", label: "多模态素材治理" },
      { value: "2025+", label: "LoRA 与音视频评测" },
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
