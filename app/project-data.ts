export type VideoProject = {
  number: string;
  title: string;
  tags: string;
  poster?: string;
  video?: string;
  /** 详情页 PDF 路径(空表示暂无可显示的 PDF)*/
  pdfUrl?: string;
};

export const videoProjects: VideoProject[] = [
  {
    number: "01",
    title: "音视频生成模型横向评测",
    tags: "多模态评测 · 双人盲审 · BadCase",
    poster: "/media/project-01-evaluation.png",
    video: "/media/project-01-evaluation.webm",
    pdfUrl: "/pdfs/01-评测维度.pdf",
  },
  {
    number: "02",
    title: "主播形象 LoRA 微调数据集",
    tags: "垂类模型 · LoRA · 自动化数据流",
    poster: "/media/project-02-lora.png",
    video: "/media/project-02-lora.webm",
    pdfUrl: "/pdfs/02-LoRA数据集自动化.pdf",
  },
  {
    number: "03",
    title: "寰宇惠农补贴多模态素材治理",
    tags: "多模态 Caption · 清洗质检 · 素材治理",
    poster: "/media/project-03-caption.png",
    video: "/media/project-03-caption.webm",
    pdfUrl: "/pdfs/03-惠农素材标注规范.pdf",
  },
  {
    number: "04",
    title: "多模态智能客服数据建设",
    tags: "指令微调 · 多轮对话 · 意图识别",
    poster: "/media/project-04-sft.png",
    video: "/media/project-04-sft.webm",
    // pdfUrl 留空:暂无对应 PDF
  },
];