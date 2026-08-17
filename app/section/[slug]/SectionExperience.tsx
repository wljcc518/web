"use client";

import Link from "next/link";
import {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { type PortfolioSection, sections } from "../../content";
import { type VideoProject, videoProjects } from "../../project-data";

type CareerStyle = CSSProperties & {
  "--career-y": string;
  "--career-scale": number;
};

const capabilityItems = [
  {
    code: "DATA / 01",
    title: "数据集治理",
    summary: "文本、图文、音视频全模态数据生产。",
    methods: ["准入标准与边界案例", "清洗、标注、质检与版本管理", "单轮、多轮与SFT样本构造"],
    evidence: "8万+ 对话数据｜12万+ 多媒体素材",
  },
  {
    code: "FLOW / 02",
    title: "自动化数据链路",
    summary: "把重复处理交给工作流，让人聚焦判断。",
    methods: ["Dify模块化编排", "ASR、清洗、分段与去重", "审核门禁与多格式导出"],
    evidence: "15个处理节点｜人工工时降低60%",
  },
  {
    code: "EVAL / 03",
    title: "模型评测",
    summary: "用固定口径与盲审机制建立可复核结果。",
    methods: ["分层测试集设计", "七维加权评分", "双人盲审与争议复核"],
    evidence: "5款模型横评｜800+视频BadCase",
  },
  {
    code: "TEAM / 04",
    title: "团队质量管理",
    summary: "让标准在多人协作和规模交付中稳定执行。",
    methods: ["试标与培训", "分层质检与争议校准", "交付节奏与缺陷回流"],
    evidence: "20人标注评测团队协同",
  },
];

const evidenceItems = [
  {
    value: "37%",
    title: "主播模型风格相似度提升",
    baseline: "同一主播训练前模型输出",
    scope: "固定问题集、统一生成参数",
    method: "双人盲审后计算风格相似度均值",
    contribution: "负责样本准入、SFT构造、数据链路与BadCase回流",
  },
  {
    value: "92.6%",
    title: "意图识别准确率",
    baseline: "优化前固定测试集准确率78%",
    scope: "同一测试集、同一Top-1统计口径",
    method: "补充分层场景与边界样本后重新盲测",
    contribution: "负责单/多轮标注规范、争议样本校准与缺陷回流",
  },
  {
    value: "60%",
    title: "人工处理工时降低",
    baseline: "人工逐条完成素材整理与格式处理",
    scope: "单位合格素材的平均处理时长",
    method: "自动预处理链路上线前后同批次对比",
    contribution: "负责流程拆解、规则门禁和自动化需求设计",
  },
];

const assetGroups = [
  {
    id: "sop",
    label: "SOP 标准",
    description: "统一准入、边界、格式与质检口径。",
    items: [
      ["SOP-01", "对话标注规范", "单轮、多轮、边界意图与争议案例", "可展示"],
      ["SOP-02", "图文素材挂载规范", "素材命名、标签、存储与线上挂载", "待脱敏"],
      ["SOP-03", "音视频准入规则", "清晰度、内容完整性与训练可用性", "持续补充"],
    ],
  },
  {
    id: "eval",
    label: "EVAL 评测",
    description: "把主观体验转化为可执行的评分机制。",
    items: [
      ["EVAL-01", "音视频七维评测表", "维度、权重、评分锚点与复核规则", "可展示"],
      ["EVAL-02", "双人盲审记录", "独立评分、分歧处理与最终结论", "待脱敏"],
      ["EVAL-03", "指标口径卡", "基线、样本范围、计算方式与责任边界", "可展示"],
    ],
  },
  {
    id: "flow",
    label: "FLOW 工作流",
    description: "沉淀可复制的数据预处理与交付链路。",
    items: [
      ["FLOW-01", "LoRA数据流水线", "ASR、清洗、反向QA、审核与导出", "15节点"],
      ["FLOW-02", "素材预处理模板", "去重、格式化、命名与批量入库", "工时-60%"],
      ["FLOW-03", "多格式交付模板", "JSONL、CSV及训练平台格式转换", "可复用"],
    ],
  },
  {
    id: "case",
    label: "CASE 缺陷库",
    description: "让每个错误都能回到规则和下一轮数据。",
    items: [
      ["CASE-01", "视频缺陷BadCase", "画面、动作、时序、物理与风格问题", "800+"],
      ["CASE-02", "图文错误BadCase", "描述偏差、主体遗漏与标签错误", "2000+"],
      ["CASE-03", "对话缺陷样本", "意图混淆、上下文断裂与回复越界", "12000+"],
    ],
  },
];

const careerItems = [
  {
    year: "2023",
    title: "对话数据治理",
    role: "建立标注与质量基础",
    detail: "从单轮、多轮对话规范开始，掌握意图拆解、边界定义、试标与质检。",
    proof: "意图体系｜多轮标注｜质量校准",
    poster: "/media/project-04-sft.png",
  },
  {
    year: "2024",
    title: "多模态素材治理",
    role: "从文本扩展到图片与视频",
    detail: "统一图片、海报、视频素材的标注、存储与线上挂载规则。",
    proof: "12万+素材｜合规率98.5%",
    poster: "/media/project-03-caption.png",
  },
  {
    year: "2025",
    title: "模型评测",
    role: "从数据生产走向模型反馈",
    detail: "搭建分层测试集、七维评分、双人盲审和BadCase归因机制。",
    proof: "5款模型｜800+视频BadCase",
    poster: "/media/project-01-evaluation.png",
  },
  {
    year: "2026",
    title: "训练闭环",
    role: "LoRA、SFT与自动化链路",
    detail: "将素材预处理、SFT样本、LoRA训练和效果评测连接为迭代闭环。",
    proof: "15节点｜风格相似度+37%",
    poster: "/media/project-02-lora.png",
  },
];

function ProfileExperience({ section }: { section: PortfolioSection }) {
  return (
    <section className="exp-profile exp-section">
      <div className="exp-section-heading">
        <span>PROFILE / ONE SCREEN</span>
        <h2>让招聘方在一分钟内看懂我的价值</h2>
      </div>
      <div className="exp-profile-layout">
        <article className="exp-profile-statement">
          <p>POSITIONING</p>
          <h3>{section.summary}</h3>
          <div>
            <span>LLM 对话 SFT</span>
            <span>音视频模型评测</span>
            <span>Dify 自动化</span>
            <span>BadCase 闭环</span>
          </div>
        </article>
        <div className="exp-profile-metrics">
          {section.metrics.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
      </div>
      <div className="exp-profile-actions">
        <Link href="/section/representative-projects">查看四个代表项目 ↗</Link>
        <a href="/resume.pdf" download>下载完整简历 PDF ↓</a>
      </div>
    </section>
  );
}

function MethodExperience() {
  const modules = [
    {
      code: "01 / STANDARD",
      title: "业务拆解 & 专项标准体系搭建",
      text: "对接产品、运营业务痛点，针对文本、图文海报、商品素材、音视频、LoRA 微调场景，拆解业务约束、合规要求、行业专业规则；输出 SOP、标注维度、挂载规范、错误判定基准，解决模型输出内容冲突、政策错误、图文不一致等线上问题。",
    },
    {
      code: "02 / PRODUCTION",
      title: "数据生产全链路管控",
      text: "基于已制定标准，统筹内部 + 外包标注资源，做任务拆解、人员培训、质检规则落地；把控数据产出质量、交付时效，处理标注歧义 Case 闭环，过滤低质样本，保障训练 / 评测数据集稳定性。",
    },
    {
      code: "03 / ENGINEERING",
      title: "流程工程化与效率优化",
      text: "不依赖纯人工，梳理重复工作，配合工具 / 低代码搭建自动化流水线：样本过滤、抽帧、Caption 生成、初筛校验，减少人工重复工作量，提升数据生产人效，沉淀可复用工具与流程。",
    },
    {
      code: "04 / EVALUATION",
      title: "模型评测与迭代闭环",
      text: "搭建对应业务场景评测体系，设计评测数据集、评测维度；对模型输出结果做效果验收，定位模型缺陷，反向输出数据优化方向，用数据反馈驱动模型迭代，验证业务指标改善效果。",
    },
  ];

  return (
    <section className="exp-method exp-section">
      <div className="exp-section-heading">
        <span>WORK CORE / BUSINESS-DRIVEN DATA LOOP</span>
        <h2>工作核心｜以数据驱动多模态大模型业务落地</h2>
      </div>

      <article className="exp-method-positioning">
        <div>
          <span>CORE POSITIONING / 业务侧数据训练负责人</span>
          <h3>我的核心定位</h3>
        </div>
        <div>
          <p>
            不只是执行层 AI 训练师，作为业务侧数据训练负责人，承接业务真实诉求，打通「业务需求 → 标准体系 → 数据生产 → 评测校验 → 模型迭代」完整链路。
          </p>
          <p>
            兼顾规则设计、标注团队管理、流水线工程化、模型效果验证，输出可复用的数据资产，最终解决业务实际问题，带来可量化业务收益。
          </p>
        </div>
      </article>

      <div className="exp-method-module-heading">
        <span>04 CORE MODULES</span>
        <h3>四大核心工作模块</h3>
      </div>

      <div className="exp-method-modules">
        {modules.map((module, index) => (
          <article key={module.code}>
            <span>{module.code}</span>
            <b>{String(index + 1).padStart(2, "0")}</b>
            <h3>{module.title}</h3>
            <p>{module.text}</p>
          </article>
        ))}
      </div>

      <div className="exp-method-summary">
        <article>
          <span>WORKING PRINCIPLES</span>
          <h3>我的工作方法论</h3>
          <p>
            先对齐业务真实痛点，再定标准；先小批量试标验证，再大规模生产；做完数据交付，一定要回到模型效果做闭环验证。
          </p>
        </article>
        <article>
          <span>VALUE OUTPUT</span>
          <h3>价值总结</h3>
          <p>
            区别于单纯做标注执行的训练人员，我的输出不止是一批数据集，而是
            <strong>标准、流程、工具、评测体系整套可复用资产</strong>，可以直接支撑商业化 AIGC 业务稳定上线，降低线上内容风险，提升模型实际业务表现。
          </p>
        </article>
      </div>
    </section>
  );
}

function CapabilityExperience() {
  const [active, setActive] = useState(0);
  const item = capabilityItems[active];

  return (
    <section className="exp-capability exp-section">
      <div className="exp-section-heading">
        <span>CAPABILITY / 2 × 2 MATRIX</span>
        <h2>四项能力协同形成训练闭环</h2>
      </div>
      <div className="exp-capability-layout">
        <div className="exp-capability-grid">
          {capabilityItems.map((capability, index) => (
            <button
              type="button"
              key={capability.code}
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
              aria-pressed={index === active}
            >
              <span>{capability.code}</span>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h3>{capability.title}</h3>
              <p>{capability.summary}</p>
            </button>
          ))}
        </div>
        <article className="exp-capability-detail" aria-live="polite">
          <span>{item.code} / EVIDENCE</span>
          <h3>{item.title}</h3>
          <ul>
            {item.methods.map((method) => <li key={method}>{method}</li>)}
          </ul>
          <strong>{item.evidence}</strong>
        </article>
      </div>
    </section>
  );
}

function ProjectExperience() {
  const [active, setActive] = useState(0);
  const [detailProject, setDetailProject] = useState<VideoProject | null>(null);

  const closeProjectDetail = () => setDetailProject(null);

  useEffect(() => {
    const projectNumber = new URLSearchParams(window.location.search).get("project");
    const projectIndex = videoProjects.findIndex(
      (project) => project.number === projectNumber,
    );
    if (projectIndex >= 0) {
      setActive(projectIndex);
      setDetailProject(videoProjects[projectIndex]);
    }
  }, []);

  useEffect(() => {
    if (!detailProject) {
      document.body.classList.remove("modal-open");
      return;
    }
    document.body.classList.add("modal-open");
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProjectDetail();
    };
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
      document.body.classList.remove("modal-open");
    };
  }, [detailProject]);

  return (
    <section className="exp-projects exp-section">
      <div className="exp-section-heading">
        <span>PROJECTS / FOUR CASES</span>
        <h2>四个项目，在一个界面完整呈现</h2>
      </div>

      <div className="exp-project-grid" aria-label="四个代表项目">
        {videoProjects.map((project, index) => (
          <button
            type="button"
            key={project.number}
            onClick={() => {
              setActive(index);
              setDetailProject(project);
            }}
          >
            <div className="exp-project-grid-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.poster} alt="" />
              <span>{project.number} / PROJECT</span>
              <b>{project.metric}</b>
            </div>
            <div className="exp-project-grid-copy">
              <span>{project.tags}</span>
              <h3>{project.title}</h3>
              <p>{project.result}</p>
              <i>查看项目介绍 ↗</i>
            </div>
          </button>
        ))}
      </div>

      {detailProject && (
        <div
          className="exp-project-detail-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${detailProject.title}项目介绍`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeProjectDetail();
          }}
        >
          <article className="exp-project-detail-panel">
            <header>
              <span>PROJECT {detailProject.number} / CASE OVERVIEW</span>
              <button type="button" onClick={closeProjectDetail} aria-label="关闭项目介绍">
                ×
              </button>
            </header>

            <div className="exp-project-detail-main">
              <div className="exp-project-detail-visual">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={detailProject.poster} alt="" />
                <div>
                  <span>RESULT</span>
                  <strong>{detailProject.metric}</strong>
                </div>
              </div>

              <div className="exp-project-detail-copy">
                <span>{detailProject.english}</span>
                <h2>{detailProject.title}</h2>
                <p>{detailProject.result}</p>
                <div className="exp-project-detail-meta">
                  <article>
                    <b>01 / 项目背景</b>
                    <p>{detailProject.background}</p>
                  </article>
                  <article>
                    <b>02 / 我的职责</b>
                    <p>{detailProject.role}</p>
                  </article>
                </div>
              </div>
            </div>

            <div className="exp-project-detail-bottom">
              <section>
                <span>03 / 实施路径</span>
                <ol>
                  {detailProject.process.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </section>
              <section>
                <span>04 / 沉淀资产</span>
                <ul>
                  {detailProject.assets.map((asset) => <li key={asset}>{asset}</li>)}
                </ul>
                <b>{detailProject.tags}</b>
              </section>
            </div>

            <footer>
              <button
                type="button"
                onClick={() => {
                  const previous = (
                    active - 1 + videoProjects.length
                  ) % videoProjects.length;
                  setActive(previous);
                  setDetailProject(videoProjects[previous]);
                }}
              >
                ← 上一个项目
              </button>
              <span>{detailProject.number} / {String(videoProjects.length).padStart(2, "0")}</span>
              <button
                type="button"
                onClick={() => {
                  const next = (active + 1) % videoProjects.length;
                  setActive(next);
                  setDetailProject(videoProjects[next]);
                }}
              >
                下一个项目 →
              </button>
            </footer>
          </article>
        </div>
      )}
    </section>
  );
}

function EvidenceExperience() {
  const [active, setActive] = useState(0);
  const item = evidenceItems[active];

  return (
    <section className="exp-evidence exp-section">
      <div className="exp-section-heading">
        <span>EVIDENCE / CLICK TO VERIFY</span>
        <h2>数字不是装饰，每个结果都有口径</h2>
      </div>
      <div className="exp-evidence-grid">
        {evidenceItems.map((evidence, index) => (
          <button
            type="button"
            className={index === active ? "is-active" : ""}
            key={evidence.value}
            onClick={() => setActive(index)}
            aria-pressed={index === active}
          >
            <span>0{index + 1}</span>
            <strong>{evidence.value}</strong>
            <b>{evidence.title}</b>
          </button>
        ))}
      </div>
      <article className="exp-evidence-detail" aria-live="polite">
        <div><span>BASELINE</span><p>{item.baseline}</p></div>
        <div><span>SCOPE</span><p>{item.scope}</p></div>
        <div><span>METHOD</span><p>{item.method}</p></div>
        <div><span>MY ROLE</span><p>{item.contribution}</p></div>
      </article>
    </section>
  );
}

function AssetsExperience() {
  const [active, setActive] = useState(assetGroups[0].id);
  const group = useMemo(
    () => assetGroups.find((item) => item.id === active) ?? assetGroups[0],
    [active],
  );

  return (
    <section className="exp-assets exp-section">
      <div className="exp-section-heading">
        <span>ASSET LIBRARY / VERSIONED</span>
        <h2>把项目经验变成下一次交付的起点</h2>
      </div>
      <div className="exp-asset-tabs" role="tablist" aria-label="训练资产分类">
        {assetGroups.map((item) => (
          <button
            type="button"
            role="tab"
            key={item.id}
            className={item.id === active ? "is-active" : ""}
            aria-selected={item.id === active}
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="exp-asset-intro" aria-live="polite">
        <span>{group.label}</span>
        <p>{group.description}</p>
      </div>
      <div className="exp-asset-list">
        {group.items.map(([code, title, detail, status]) => (
          <article key={code}>
            <span>{code}</span>
            <h3>{title}</h3>
            <p>{detail}</p>
            <b>{status}</b>
          </article>
        ))}
      </div>
      <div className="exp-asset-extension">
        后续扩展预留：图片规则｜视频规则｜素材挂载｜版本记录
      </div>
    </section>
  );
}

function CareerExperience() {
  const [active, setActive] = useState(careerItems.length - 1);
  const [paused, setPaused] = useState(false);
  const careerViewport = useRef<HTMLDivElement | null>(null);
  const careerCards = useRef<Array<HTMLButtonElement | null>>([]);
  const careerDrag = useRef({ x: 0, scroll: 0, active: false });
  const careerWheelLock = useRef(false);
  const item = careerItems[active];

  const moveCareer = (direction: number) => {
    setActive((current) => Math.min(
      careerItems.length - 1,
      Math.max(0, current + direction),
    ));
  };

  useEffect(() => {
    const viewport = careerViewport.current;
    const card = careerCards.current[active];
    if (!viewport || !card) return;
    viewport.scrollTo({
      left: card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % careerItems.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section className="exp-career exp-section">
      <div className="exp-section-heading">
        <span>CAREER / HORIZONTAL LOOKBACK</span>
        <h2>沿时间线看见能力如何生长</h2>
      </div>

      <div
        className="exp-career-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="exp-career-marquee" aria-hidden="true">
          <span>CAREER</span>
          <b>2023—2026</b>
          <span>GROWTH</span>
        </div>

        <div
          className="exp-career-viewport"
          ref={careerViewport}
          aria-label="2023至2026横向职业时间线，可滚轮或拖动浏览"
          onWheel={(event) => {
            if (careerWheelLock.current || Math.abs(event.deltaY) < 8) return;
            careerWheelLock.current = true;
            moveCareer(event.deltaY > 0 ? 1 : -1);
            window.setTimeout(() => {
              careerWheelLock.current = false;
            }, 460);
          }}
          onPointerDown={(event) => {
            const viewport = careerViewport.current;
            if (!viewport) return;
            careerDrag.current = {
              x: event.clientX,
              scroll: viewport.scrollLeft,
              active: true,
            };
            viewport.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const viewport = careerViewport.current;
            if (!viewport || !careerDrag.current.active) return;
            viewport.scrollLeft = careerDrag.current.scroll - (
              event.clientX - careerDrag.current.x
            );
          }}
          onPointerUp={() => {
            const viewport = careerViewport.current;
            careerDrag.current.active = false;
            if (!viewport) return;
            const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
            const nearest = careerCards.current.reduce((best, card, index) => {
              if (!card) return best;
              const distance = Math.abs(
                card.offsetLeft + card.offsetWidth / 2 - viewportCenter,
              );
              return distance < best.distance ? { index, distance } : best;
            }, { index: active, distance: Number.POSITIVE_INFINITY });
            setActive(nearest.index);
          }}
        >
          <div className="exp-career-track">
            {careerItems.map((career, index) => {
              const style = {
                "--career-y": `${[24, 118, 0, 82][index]}px`,
                "--career-scale": index === active ? 1 : 0.88,
              } as CareerStyle;

              return (
                <button
                  type="button"
                  className={index === active ? "is-active" : ""}
                  key={career.year}
                  style={style}
                  ref={(node) => {
                    careerCards.current[index] = node;
                  }}
                  onClick={() => setActive(index)}
                  aria-pressed={index === active}
                >
                  <span>{career.year}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={career.poster} alt="" draggable={false} />
                  <div>
                    <b>{career.title}</b>
                    <small>{career.role}</small>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <article className="exp-career-detail" aria-live="polite">
          <span>{item.year} / ROLE & GROWTH</span>
          <h3>{item.role}</h3>
          <p>{item.detail}</p>
          <b>{item.proof}</b>
        </article>

        <nav className="exp-career-ruler" aria-label="选择职业年份">
          {careerItems.map((career, index) => (
            <button
              type="button"
              key={career.year}
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
            >
              <i />
              <span>{career.year}</span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}

export default function SectionExperience({
  section,
}: {
  section: PortfolioSection;
}) {
  const index = sections.findIndex((item) => item.slug === section.slug);
  const previous = sections[(index - 1 + sections.length) % sections.length];
  const next = sections[(index + 1) % sections.length];

  return (
    <div id="chapter-content" className="experience-content">
      {section.visual === "thinking" && <ProfileExperience section={section} />}
      {section.visual === "method" && <MethodExperience />}
      {section.visual === "capability" && <CapabilityExperience />}
      {section.visual === "projects" && <ProjectExperience />}
      {section.visual === "evidence" && <EvidenceExperience />}
      {section.visual === "assets" && <AssetsExperience />}
      {section.visual === "career" && <CareerExperience />}

      <nav className="experience-next" aria-label="章节切换">
        <Link href={`/section/${previous.slug}`}>
          <span>← 上一章 {previous.number}</span>
          <b>{previous.cardTitle}</b>
        </Link>
        <Link href={`/section/${next.slug}`}>
          <span>下一章 {next.number} →</span>
          <b>{next.cardTitle}</b>
        </Link>
      </nav>

      <footer className="experience-footer">
        <Link href="/">返回七章总览</Link>
        <a href="mailto:wljcc518@163.com">wljcc518@163.com</a>
      </footer>
    </div>
  );
}
