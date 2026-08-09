import type { PortfolioSection } from "../../content";
import ProjectVideoGallery from "./ProjectVideoGallery";

function CoreThinkingVisual() {
  return (
    <div className="signature-thinking" aria-label="工作核心思路流程">
      <article>
        <span>01 / PREPROCESS</span>
        <strong>原始素材与自动预处理</strong>
        <p>音视频素材经过 ASR、切分、去噪和清洗，进入统一数据链路。</p>
      </article>
      <i>→</i>
      <article>
        <span>02 / TRAIN</span>
        <strong>SFT 样本与 LoRA 训练</strong>
        <p>按照风格、人设和质量门禁构造样本，支撑多主播训练。</p>
      </article>
      <i>→</i>
      <article>
        <span>03 / EVALUATE</span>
        <strong>模型评测与缺陷回流</strong>
        <p>通过相似度盲测和 BadCase 归因持续优化下一轮数据。</p>
      </article>
    </div>
  );
}

function CapabilityVisual() {
  const items = [
    ["STD / 01", "标准体系搭建", "规则、边界、试标与质检口径"],
    ["EVAL / 02", "模型评测与盲审", "测试集、权重、双审与复核"],
    ["FLOW / 03", "自动化数据链路", "清洗、去重、审核与多格式导出"],
    ["CASE / 04", "BadCase 闭环", "缺陷归因、规则回流与版本追踪"],
  ];

  return (
    <div className="signature-capability" aria-label="四大能力体系">
      {items.map(([code, title, text], index) => (
        <article key={code}>
          <span>{code}</span>
          <b>{String(index + 1).padStart(2, "0")}</b>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

function WorkMethodVisual() {
  const items = [
    ["01 / GOAL", "业务目标", "从业务结果反推数据建设标准，平衡模型效果与落地成本。"],
    ["02 / EVALUATE", "质量机制", "通过标准化评测与双人盲审削弱主观偏差。"],
    ["03 / AUTOMATE", "自动化链路", "释放人力聚焦高价值样本审核与缺陷根因分析。"],
  ];

  return (
    <div className="signature-thinking" aria-label="工作核心思路">
      {items.map(([code, title, text], index) => (
        <div key={code} style={{ display: "contents" }}>
          <article>
            <span>{code}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
          {index < items.length - 1 && <i>→</i>}
        </div>
      ))}
    </div>
  );
}

function EvidenceVisual() {
  const metrics = [
    ["37%", "风格相似度平均提升", "同一评测集双人盲审均值"],
    ["92.6%", "意图识别准确率", "固定测试集 Top-1 准确率"],
    ["60%", "人工处理工时降低", "单位素材平均处理时长"],
  ];

  return (
    <div className="signature-evidence" aria-label="量化结果与测算口径">
      {metrics.map(([value, title, method]) => (
        <article key={value}>
          <strong>{value}</strong>
          <h3>{title}</h3>
          <p>{method}</p>
          <span>BASELINE → ACTION → RESULT</span>
        </article>
      ))}
    </div>
  );
}

function AssetsVisual() {
  const assets = [
    ["STD / SOP", "标注标准", "统一准入、边界、格式与抽检规则"],
    ["EVAL / RUBRIC", "评测体系", "可复核的维度、权重与判定机制"],
    ["FLOW / TEMPLATE", "自动化模板", "可复制的数据预处理与导出流程"],
    ["QA / BADCASE", "缺陷闭环", "从样本归因到规则迭代的运营方案"],
  ];

  return (
    <div className="signature-assets" aria-label="可复用训练资产清单">
      {assets.map(([code, title, text], index) => (
        <article key={code}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <b>{code}</b>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

function CareerVisual() {
  const timeline = [
    ["2023", "对话数据", "单轮、多轮标注与意图体系"],
    ["2024", "图文治理", "素材标准、挂载与质量管理"],
    ["2025", "音视频评测", "盲审、加权评分与 BadCase"],
    ["2026", "训练闭环", "LoRA、SFT 与自动化数据流"],
  ];

  return (
    <div className="signature-career" aria-label="职业能力成长时间线">
      {timeline.map(([year, title, text]) => (
        <article key={year}>
          <span>{year}</span>
          <i />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

const signatureHeadings: Record<string, { code: string; title: string; text: string }> = {
  "core-thinking": {
    code: "01 / DATA FLOW",
    title: "主播垂类 LoRA 微调数据链路",
    text: "端到端自动化处理、质量门禁、模型评测与 BadCase 回流。",
  },
  "work-method": {
    code: "02 / WORKING PRINCIPLES",
    title: "工作核心思路",
    text: "从业务目标出发，用标准、评测与自动化形成稳定的数据生产方法。",
  },
  "capability-system": {
    code: "03 / CAPABILITY MATRIX",
    title: "四大能力形成完整闭环",
    text: "标准、评测、自动化与缺陷运营共同保证交付质量。",
  },
  "representative-projects": {
    code: "04 / PROJECT VIDEO INDEX",
    title: "四个代表项目",
    text: "点击流程图封面，播放对应的 8 秒项目概览。",
  },
  evidence: {
    code: "05 / MEASURABLE OUTCOMES",
    title: "结果、口径与验证方式",
    text: "每一个结果都能说明基线、统计范围和验证方法。",
  },
  assets: {
    code: "06 / REUSABLE ASSETS",
    title: "可复用训练资产清单",
    text: "让一次项目经验成为下一次交付的起点。",
  },
  career: {
    code: "07 / CAREER & GROWTH",
    title: "从数据生产到模型闭环",
    text: "能力沿着文本、图文、音视频与训练评测逐步扩展。",
  },
};

export default function SectionSignature({
  section,
}: {
  section: PortfolioSection;
}) {
  const heading = signatureHeadings[section.slug];

  return (
    <section className={`section-signature signature-${section.visual}`}>
      <div className="section-signature-heading">
        <div>
          <span>{heading.code}</span>
          <h2>{heading.title}</h2>
        </div>
        <p>{heading.text}</p>
      </div>

      {section.slug === "core-thinking" && <CoreThinkingVisual />}
      {section.slug === "work-method" && <WorkMethodVisual />}
      {section.slug === "capability-system" && <CapabilityVisual />}
      {section.slug === "representative-projects" && <ProjectVideoGallery />}
      {section.slug === "evidence" && <EvidenceVisual />}
      {section.slug === "assets" && <AssetsVisual />}
      {section.slug === "career" && <CareerVisual />}
    </section>
  );
}
