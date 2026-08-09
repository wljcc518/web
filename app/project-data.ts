export type VideoProject = {
  number: string;
  title: string;
  english: string;
  tags: string;
  result: string;
  metric: string;
  poster?: string;
  video: string;
  background: string;
  role: string;
  process: string[];
  assets: string[];
  label?: string;
  durationLabel?: string;
};

export const videoProjects: VideoProject[] = [
  {
    number: "01",
    title: "音视频生成模型横向评测",
    english: "AUDIO / VIDEO MODEL EVALUATION",
    tags: "多模态评测 · 双人盲审 · BadCase",
    result: "建立七维评分和分层测试集，沉淀 800+ 缺陷样本辅助模型迭代。",
    metric: "800+",
    poster: "/media/project-01-evaluation.png",
    video: "/media/project-01-evaluation.webm",
    background: "不同音视频生成模型擅长的场景并不一致，需要用统一样本、统一参数和统一评分口径完成可复核的横向比较。",
    role: "负责评测维度设计、分层测试集建设、双人盲审规则、争议复核以及缺陷样本归因。",
    process: ["建立七维加权评分与评分锚点", "统一测试样本、生成参数和统计口径", "双人独立盲审并对分歧样本复核", "按缺陷类型沉淀BadCase并回流模型团队"],
    assets: ["音视频七维评测表", "双人盲审与复核SOP", "800+缺陷样本库"],
  },
  {
    number: "02",
    title: "LoRA 主播模型设计",
    english: "HOST PERSONA LORA PIPELINE",
    tags: "垂类模型 · LoRA · 自动化数据流",
    result: "搭建直播切片到 SFT 样本的自动链路，风格相似度平均提升 37%。",
    metric: "+37%",
    poster: "/media/project-02-lora.png",
    video: "/media/project-02-lora.webm",
    background: "主播原始直播素材时长大、噪声多且表达风格分散，需要把可训练片段稳定转化为高质量垂类SFT样本。",
    role: "负责样本准入标准、主播风格拆解、SFT数据构造、自动化工作流设计和训练后效果评测。",
    process: ["直播切片、ASR与文本清洗", "风格特征抽取与反向问答生成", "人工审核门禁与训练格式导出", "LoRA训练、盲测和BadCase回流"],
    assets: ["15节点Dify数据链路", "主播风格标注规范", "LoRA效果评测模板"],
  },
  {
    number: "03",
    title: "图片视频 Caption 数据工程",
    english: "IMAGE / VIDEO CAPTION PIPELINE",
    tags: "多模态 Caption · 清洗质检 · 素材治理",
    result: "统一图片与视频描述标准，形成可追溯的清洗、复核和版本管理链路。",
    metric: "12万+",
    poster: "/media/project-03-caption.png",
    video: "/media/project-03-caption.webm",
    background: "图片与视频素材来源、命名和描述口径不一致，直接影响多模态训练数据的可用性、可追踪性与交付效率。",
    role: "负责素材准入规则、Caption描述维度、自动清洗逻辑、人工复核机制和版本化入库规范。",
    process: ["按清晰度、完整性与版权状态准入", "统一主体、动作、场景与风格描述维度", "自动去重、格式化、命名与预标注", "人工复核后挂载并记录版本"],
    assets: ["图片与视频Caption规范", "素材挂载一体化SOP", "自动化预处理模板"],
  },
  {
    number: "04",
    title: "SFT 对话数据集治理",
    english: "MULTI-TURN SFT DATASET",
    tags: "指令微调 · 多轮对话 · 意图识别",
    result: "建立单轮、多轮一体化标准，意图识别准确率由 78% 提升至 92.6%。",
    metric: "92.6%",
    poster: "/media/project-04-sft.png",
    video: "/media/project-04-sft.webm",
    background: "客服对话中存在意图边界重叠、上下文断裂和多轮状态难统一的问题，需要同时治理标注标准与测试样本。",
    role: "负责单轮与多轮标注规范、意图边界定义、试标校准、争议样本复核和缺陷数据回流。",
    process: ["重构意图层级与正反例边界", "建立单轮、多轮一体化标注模板", "试标后集中校准高分歧样本", "补充分层测试集并闭环验证"],
    assets: ["对话标注规范", "意图边界案例库", "争议复核与质检记录"],
  },
];
