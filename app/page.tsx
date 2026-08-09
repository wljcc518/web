"use client";

import Link from "next/link";
import {
  CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { sections } from "./content";
import {
  type VideoProject,
  videoProjects,
} from "./project-data";

type AccentStyle = CSSProperties & {
  "--accent": string;
};

const chapterVideos: Record<string, VideoProject> = {
  thinking: {
    number: "01",
    title: "资深 AI 训练师",
    english: "SENIOR AI TRAINER",
    tags: "多模态数据治理 · 模型评测 · 自动化链路",
    result: "个人定位与核心能力视频介绍。",
    metric: "",
    video: "/media/chapter-01-profile.mp4",
    label: "SECTION",
    durationLabel: "VIDEO 01",
  },
  career: {
    number: "07",
    title: "经历与成长轨迹",
    english: "CAREER & GROWTH",
    tags: "职业经历 · 能力成长 · 项目沉淀",
    result: "职业经历与能力成长视频介绍。",
    metric: "",
    video: "/media/08.mp4",
    label: "SECTION",
    durationLabel: "VIDEO 02",
  },
};

const sectionBackgroundVideos: Record<string, string> = {
  thinking: "/media/chapter-01-profile.mp4",
  method: "/media/05.mp4",
  capability: "/media/07.mp4",
  projects: "/media/09.mp4",
  evidence: "/media/06.mp4",
  assets: "/media/04.mp4",
  career: "/media/08.mp4",
};

const lifeTravelStories = [
  {
    number: "01",
    title: "夜爬泰山",
    location: "从深夜走到日出",
    description: "把漫长的夜路、抵达山顶前的疲惫与第一束日光放在同一段叙事中，让视频和文字共同保留这次经历。",
    video: "/media/life/夜爬泰山.mp4",
    poster: "/media/life/日出.jpg",
  },
  {
    number: "02",
    title: "去海边",
    location: "把节奏交给浪潮",
    description: "海边更像一次短暂清空：听浪、看落日、记录没有任务的时间。在缓慢的浪潮里重新找回观察和感受的节奏。",
    video: "/media/life/海边.mp4",
    poster: "/media/life/海边.jpg",
  },
];

const lifeTravelClips = [
  { title: "日落", video: "/media/life/日落.mp4", poster: "/media/life/日落.jpg" },
  { title: "湖面", video: "/media/life/湖面.mp4", poster: "/media/life/湖面.jpg" },
  { title: "爬雪山", video: "/media/life/雪山.mp4", poster: "/media/life/雪山.jpg" },
  { title: "铃铛", video: "/media/life/铃铛.mp4", poster: "/media/life/铃铛.jpg" },
];

const lifeVideoCarouselBaseItems = [
  ...lifeTravelStories,
  ...lifeTravelClips.map((clip, index) => ({
    ...clip,
    number: String(index + lifeTravelStories.length + 1).padStart(2, "0"),
    location: "旅途中的短片",
    description: [
      "把一天最后一段光线留在画面里，也保留旅途中慢下来的片刻。",
      "用安静的水面记录旅行中的慢节奏，也提醒自己保持观察。",
      "记录从山脚走向雪线的过程，在风、海拔和不断变化的光线中保持敬畏与耐心。",
      "收录途中容易被忽略的声音与细节，让一段小片段成为记忆坐标。",
    ][index],
  })),
];

const lifeVideoCarouselItems = [
  lifeVideoCarouselBaseItems[4],
  ...lifeVideoCarouselBaseItems.filter((_, index) => index !== 4),
].map((item, index) => ({
  ...item,
  number: String(index + 1).padStart(2, "0"),
}));

const lifePhotoSlots = Array.from({ length: 67 }, (_, index) => index + 1)
  .filter((photoNumber) => photoNumber !== 23 && photoNumber !== 66)
  .map((photoNumber, index) => ({
    label: `旅行照片 ${String(index + 1).padStart(2, "0")}`,
    src: `/media/life/travel-archive/travel-${String(photoNumber).padStart(3, "0")}.jpg`,
  }));

const lifeCultureCollections = [
  {
    key: "books",
    number: "01",
    english: "BOOKS",
    title: "读书",
    items: [
      { name: "《杀死一只知更鸟》", meta: "文学 / 成长", note: "在偏见与不公面前，仍然选择理解、勇气与善意。", cover: "/media/life/books/book-01.jpg" },
      { name: "《鞋狗》", meta: "商业 / 创业", note: "从耐克的成长经历里，看见长期主义、选择与冒险。", cover: "/media/life/books/book-02.jpg" },
      { name: "《光荣与梦想》", meta: "历史 / 社会", note: "把个人命运放进时代背景中，理解社会如何持续变化。", cover: "/media/life/books/book-03.jpg" },
      { name: "《月亮与六便士》", meta: "文学 / 理想", note: "关于现实生活、内在冲动与个人选择的持续追问。", cover: "/media/life/books/book-04.jpg" },
      { name: "《平凡的世界》", meta: "文学 / 人生", note: "在普通生活的重量里，看见人的坚韧、尊严与成长。", cover: "/media/life/books/book-05.jpg" },
      { name: "《明朝那些事儿》", meta: "历史 / 叙事", note: "用更易读的叙事方式理解历史人物、制度与时代进程。", cover: "/media/life/books/book-06.jpg" },
      { name: "《奇点更近》", meta: "科技 / 未来", note: "从技术加速的视角，观察人工智能与人类未来的关系。", cover: "/media/life/books/book-07.jpg" },
      { name: "《机器学习》", meta: "AI / 算法", note: "连接算法原理、公式推导与代码实践，补足模型基础认知。", cover: "/media/life/books/book-08.jpg" },
      { name: "《智慧的疆界》", meta: "AI / 计算史", note: "沿着图灵机与人工智能的发展，理解机器智慧的边界。", cover: "/media/life/books/book-09.jpg" },
    ],
  },
  {
    key: "films",
    number: "02",
    english: "FILMS",
    title: "影视",
    items: [
      { name: "《辛德勒的名单》", meta: "电影 / 历史", note: "在黑暗历史中，看见个体选择所能守住的人性与生命。", cover: "/media/life/films/film-01.jpg" },
      { name: "《教父》", meta: "电影 / 家族", note: "权力、家庭与秩序交织下的经典人物叙事。", cover: "/media/life/films/film-02.jpg" },
      { name: "《勇敢的心》", meta: "电影 / 史诗", note: "关于自由、信念与承担代价的史诗表达。", cover: "/media/life/films/film-03.jpg" },
      { name: "《生活大爆炸》", meta: "剧集 / 喜剧", note: "用轻松日常讲述理工思维、友谊与共同成长。", cover: "/media/life/films/film-04.jpg" },
      { name: "《志愿军：浴血和平》", meta: "电影 / 战争", note: "在战场与谈判的双线中理解和平背后的牺牲。", cover: "/media/life/films/film-05.jpg" },
      { name: "《阿甘正传》", meta: "电影 / 人生", note: "以真诚和行动穿过时代变化，保留对生活的相信。", cover: "/media/life/films/film-06.jpg" },
      { name: "《权力的游戏》", meta: "剧集 / 奇幻", note: "庞大世界观中关于权力、选择与命运的群像叙事。", cover: "/media/life/films/film-07.jpg" },
      { name: "《指环王》", meta: "电影 / 奇幻", note: "在漫长旅途中理解勇气、伙伴与普通人的坚持。", cover: "/media/life/films/film-08.jpg" },
      { name: "《肖申克的救赎》", meta: "电影 / 希望", note: "困境之中仍保有耐心、希望与重新选择的能力。", cover: "/media/life/films/film-09.jpg" },
      { name: "《绿皮书》", meta: "电影 / 公路", note: "在一段旅程中跨越偏见，建立理解与真正的友谊。", cover: "/media/life/films/film-10.jpg" },
    ],
  },
  {
    key: "manga",
    number: "03",
    english: "ANIME",
    title: "漫画与动漫",
    items: [
      { name: "《咒术回战》", meta: "动漫 / 战斗", note: "在高压对抗中观察选择、责任与同伴之间的关系。", cover: "/media/life/anime/anime-01.jpg" },
      { name: "《葬送的芙莉莲》", meta: "动漫 / 时间", note: "在缓慢旅途中重新认识时间、记忆与陪伴。", cover: "/media/life/anime/anime-02.jpg" },
      { name: "《排球少年!!》", meta: "动漫 / 排球", note: "关于团队协作、长期训练和持续突破的热血故事。", cover: "/media/life/anime/anime-03.jpg" },
      { name: "《强风吹拂》", meta: "动漫 / 跑步", note: "十个人用各自的节奏共同奔向同一个长期目标。", cover: "/media/life/anime/anime-04.png" },
      { name: "《钻石王牌》", meta: "动漫 / 棒球", note: "在竞争和配合中不断磨炼技术，也重新理解团队位置。", cover: "/media/life/anime/anime-05.jpg" },
    ],
  },
] as const;

function CardVisual({ variant }: { variant: string }) {
  const chapterVideo = chapterVideos[variant];

  if (chapterVideo) {
    return (
      <div className={`card-visual visual-${variant}`} aria-hidden="true">
        <span className="visual-label">
          {chapterVideo.english} / {chapterVideo.number}
        </span>
        <div className="mini-chapter-type">
          <strong>{chapterVideo.number}</strong>
          <span>{chapterVideo.english}</span>
          <i />
        </div>
      </div>
    );
  }

  const visuals: Record<string, ReactNode> = {
    method: (
      <div className="mini-assets">
        <i><b>GOAL</b><span>业务目标</span></i>
        <i><b>STD</b><span>数据标准</span></i>
        <i><b>EVAL</b><span>双人盲审</span></i>
        <i><b>FLOW</b><span>自动链路</span></i>
      </div>
    ),
    capability: (
      <div className="mini-matrix">
        <i>标准</i>
        <i>评测</i>
        <i>自动化</i>
        <i>闭环</i>
      </div>
    ),
    projects: (
      <div className="mini-projects">
        <i><b>01</b><span>音视频</span></i>
        <i><b>02</b><span>LoRA</span></i>
        <i><b>03</b><span>Caption</span></i>
        <i><b>04</b><span>SFT</span></i>
      </div>
    ),
    evidence: (
      <div className="mini-metrics">
        <i style={{ "--bar": "62%" } as CSSProperties}><b>37%</b></i>
        <i style={{ "--bar": "88%" } as CSSProperties}><b>92.6%</b></i>
        <i style={{ "--bar": "74%" } as CSSProperties}><b>60%</b></i>
      </div>
    ),
    assets: (
      <div className="mini-assets">
        <i><b>SOP</b><span>标注标准</span></i>
        <i><b>EVAL</b><span>评测体系</span></i>
        <i><b>FLOW</b><span>自动化模板</span></i>
        <i><b>CASE</b><span>缺陷闭环</span></i>
      </div>
    ),
  };

  return (
    <div className={`card-visual visual-${variant}`} aria-hidden="true">
      <span className="visual-label">AI DATA / SYSTEM</span>
      {visuals[variant]}
    </div>
  );
}

function ActiveSectionStage({
  variant,
  onPlayProject,
}: {
  variant: string;
  onPlayProject: (project: VideoProject) => void;
}) {
  return (
    <section
      className={`active-visual-stage active-variant-${variant}`}
      aria-label="当前章节核心内容"
    >
      {variant === "projects" && (
        <>
          <div className="stage-heading">
            <span>PROJECT VIDEO INDEX / 03</span>
            <strong>点击图片播放 8 秒项目概览</strong>
          </div>
          <div className="stage-projects">
            {videoProjects.map((project) => (
              <button
                type="button"
                key={project.number}
                onClick={() => onPlayProject(project)}
                aria-label={`播放 ${project.title} 的 8 秒视频`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.poster} alt="" />
                <span>{project.number}</span>
                <b>{project.title}</b>
                <small>00:08　▶</small>
              </button>
            ))}
          </div>
        </>
      )}

      {variant === "evidence" && (
        <>
          <div className="stage-heading">
            <span>MEASURABLE OUTCOMES / 04</span>
            <strong>结果、口径与验证方式</strong>
          </div>
          <div className="stage-evidence">
            <article><strong>37%</strong><span>风格相似度提升</span><small>双人盲审均值</small></article>
            <article><strong>92.6%</strong><span>意图识别准确率</span><small>固定测试集</small></article>
            <article><strong>60%</strong><span>人工工时降低</span><small>单位素材耗时</small></article>
          </div>
        </>
      )}

      {variant === "assets" && (
        <>
          <div className="stage-heading">
            <span>REUSABLE ASSETS / 05</span>
            <strong>让项目经验成为下一次起点</strong>
          </div>
          <div className="stage-assets">
            <article><b>01 / SOP</b><span>标注标准</span><small>准入、边界、格式</small></article>
            <article><b>02 / EVAL</b><span>评测体系</span><small>维度、权重、复核</small></article>
            <article><b>03 / FLOW</b><span>自动化模板</span><small>清洗、审核、导出</small></article>
            <article><b>04 / CASE</b><span>缺陷闭环</span><small>归因、回流、追踪</small></article>
          </div>
        </>
      )}

    </section>
  );
}

function WorkMethodDrawerContent() {
  const modules = [
    {
      code: "01 / STANDARD",
      title: "业务拆解 & 专项标准体系搭建",
      text: "对接产品、运营业务痛点，针对文本、图文海报、商品素材、音视频、LoRA 微调场景，拆解业务约束、合规要求、行业专业规则；输出 SOP、标注维度、挂载规范、错误判定基准，解决模型输出内容冲突、政策错误、图文不一致等线上问题。",
      image: "/media/work-module-01-wide.png",
    },
    {
      code: "02 / PRODUCTION",
      title: "数据生产全链路管控",
      text: "基于已制定标准，统筹内部 + 外包标注资源，做任务拆解、人员培训、质检规则落地；把控数据产出质量、交付时效，处理标注歧义 Case 闭环，过滤低质样本，保障训练 / 评测数据集稳定性。",
      image: "/media/work-module-02-wide.png",
    },
    {
      code: "03 / ENGINEERING",
      title: "流程工程化与效率优化",
      text: "不依赖纯人工，梳理重复工作，配合工具 / 低代码搭建自动化流水线：样本过滤、抽帧、Caption 生成、初筛校验，减少人工重复工作量，提升数据生产人效，沉淀可复用工具与流程。",
      image: "/media/work-module-03-wide.png",
    },
    {
      code: "04 / EVALUATION",
      title: "模型评测与迭代闭环",
      text: "搭建对应业务场景评测体系，设计评测数据集、评测维度；对模型输出结果做效果验收，定位模型缺陷，反向输出数据优化方向，用数据反馈驱动模型迭代，验证业务指标改善效果。",
      image: "/media/work-module-04-wide.png",
    },
  ];
  const loopSteps = [
    {
      code: "01",
      title: "业务输入",
      text: "从产品、运营、内容安全侧收集真实问题，先判断模型问题、数据问题还是流程问题。",
      image: "/media/work-loop-04.png",
    },
    {
      code: "02",
      title: "标准拆解",
      text: "把抽象目标拆成可标注、可验收、可复核的字段、规则、边界和反例。",
      image: "/media/work-loop-02.png",
    },
    {
      code: "03",
      title: "数据生产",
      text: "组织标注、质检、抽样复核与歧义处理，保证数据集稳定交付。",
      image: "/media/work-loop-03.png",
    },
    {
      code: "04",
      title: "评测回流",
      text: "用 BadCase 和评测结果反推样本补强方向，让模型迭代有明确依据。",
      image: "/media/work-loop-01.png",
    },
  ];
  const assetCards = [
    { title: "标准资产", text: "SOP、标注维度、错误类型、验收口径、合规边界。" },
    { title: "流程资产", text: "任务拆解、人员培训、抽检节奏、交付看板、质量回溯。" },
    { title: "工具资产", text: "样本过滤、抽帧、Caption 初筛、重复校验、BadCase 归档。" },
  ];
  const qualityChecks = ["口径一致", "样本有效", "质检可追溯", "模型可验证"];

  return (
    <div className="work-method-drawer">
      <section className="work-method-drawer-hero">
        <span>WORK CORE / BUSINESS-DRIVEN DATA LOOP</span>
        <h2>工作核心｜以数据驱动多模态大模型业务落地</h2>
      </section>

      <section className="work-method-drawer-positioning">
        <div className="work-method-positioning-copy">
          <span>CORE POSITIONING</span>
          <h3>我的核心定位</h3>
          <p>
            不只是执行层 AI 训练师，作为业务侧数据训练负责人，承接业务真实诉求，打通「业务需求 → 标准体系 → 数据生产 → 评测校验 → 模型迭代」完整链路。
          </p>
          <p>
            兼顾规则设计、标注团队管理、流水线工程化、模型效果验证，输出可复用的数据资产，最终解决业务实际问题，带来可量化业务收益。
          </p>
        </div>
        <figure className="work-method-positioning-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/work-method-ai-wisdom.png" alt="大理石智者与人工智能认证图景" />
        </figure>
      </section>

      <section className="work-method-drawer-loop">
        <header>
          <span>OPERATION MAP</span>
          <h3>从业务问题到模型改善的闭环路径</h3>
          <p>把“要模型变好”拆成可执行的连续动作，每一步都留下标准、数据、评测和复盘记录。</p>
        </header>
        <div className="work-method-loop-track" aria-label="业务到模型的闭环流程">
          {loopSteps.map((step) => (
            <article key={step.code} style={{ backgroundImage: `url(${step.image})` }}>
              <span>{step.code}</span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="work-method-drawer-module-section">
        <header>
          <span>04 CORE MODULES</span>
          <h3>四大核心工作模块</h3>
        </header>
        <div className="work-method-drawer-modules">
          {modules.map((module, index) => (
            <article key={module.code} style={{ backgroundImage: `url(${module.image})` }}>
              <span>{module.code}</span>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h4>{module.title}</h4>
              <p>{module.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="work-method-drawer-assets">
        <div className="work-method-assets-hero">
          <span>REUSABLE ASSETS</span>
          <strong>SOP / DATA / EVAL</strong>
          <p>最终沉淀的不是一次性交付，而是一套可以被复用、迁移和持续迭代的训练资产。</p>
        </div>
        <div className="work-method-assets-grid">
          {assetCards.map((asset, index) => (
            <article key={asset.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{asset.title}</h3>
              <p>{asset.text}</p>
            </article>
          ))}
        </div>
        <div className="work-method-quality-strip" aria-label="质量检查项">
          {qualityChecks.map((check) => (
            <span key={check}>{check}</span>
          ))}
        </div>
      </section>

      <section className="work-method-drawer-summary">
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
      </section>
    </div>
  );
}

function LifeVideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const scrollToItem = (index: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];

    if (!track || !slide) return;

    track.scrollTo({
      left: Math.max(0, slide.offsetLeft - 12),
      behavior: "smooth",
    });
  };

  const activateItem = (index: number) => {
    setActiveIndex(index);
    window.requestAnimationFrame(() => scrollToItem(index));
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    if (isAutoPaused || isHovering) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % lifeVideoCarouselItems.length;
        window.requestAnimationFrame(() => scrollToItem(next));
        return next;
      });
    }, 4800);

    return () => window.clearInterval(timer);
  }, [isAutoPaused, isHovering]);

  return (
    <section
      className="life-video-carousel"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label="旅行视频横向画廊"
    >
      <div
        className="life-video-carousel-track"
        ref={trackRef}
        onWheel={(event) => {
          if (!trackRef.current || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
          event.preventDefault();
          trackRef.current.scrollLeft += event.deltaY;
        }}
      >
        {lifeVideoCarouselItems.map((item, index) => (
          <article
            className={`life-video-carousel-slide${index === activeIndex ? " is-active" : ""}`}
            key={`${item.number}-${item.title}`}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
          >
            <button
              type="button"
              className="life-video-carousel-media"
              onMouseEnter={() => activateItem(index)}
              onClick={() => {
                activateItem(index);
                void videoRefs.current[index]?.play().catch(() => undefined);
              }}
              aria-label={`播放${item.title}视频`}
            >
              <video
                ref={(node) => {
                  videoRefs.current[index] = node;
                }}
                src={item.video}
                poster={item.poster}
                muted
                loop
                playsInline
                preload={index < 2 ? "metadata" : "none"}
              />
              <span>TRAVEL FILM / {item.number}</span>
              <i aria-hidden="true">▶</i>
            </button>
            <div className="life-video-carousel-copy">
              <span>{item.number} / {String(lifeVideoCarouselItems.length).padStart(2, "0")}　{item.location}</span>
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <nav className="life-video-carousel-controls" aria-label="旅行视频切换">
        <div>
          {lifeVideoCarouselItems.map((item, index) => (
            <button
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              key={item.number}
              onClick={() => activateItem(index)}
              aria-label={`查看第${index + 1}个视频：${item.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          className="life-video-carousel-pause"
          onClick={() => setIsAutoPaused((current) => !current)}
          aria-label={isAutoPaused ? "继续自动轮播" : "暂停自动轮播"}
        >
          ↻
        </button>
      </nav>
    </section>
  );
}

function AboutMeDrawerContent() {
  const [detailProject, setDetailProject] = useState<VideoProject | null>(null);
  const [lifeCultureIndexes, setLifeCultureIndexes] = useState<Record<string, number>>({
    books: 0,
    films: 0,
    manga: 0,
  });
  const detailProjectIndex = detailProject
    ? videoProjects.findIndex((project) => project.number === detailProject.number)
    : -1;

  const showNextCultureItem = (key: string, itemCount: number) => {
    setLifeCultureIndexes((current) => ({
      ...current,
      [key]: ((current[key] ?? 0) + 1) % itemCount,
    }));
  };

  return (
    <div className="about-me-drawer">
      <section className="about-me-hero">
        <div className="about-me-summary">
          <p>ABOUT ME</p>
          <h2>贾伟玲</h2>
          <h3>3 年商业化多模态大模型训练落地经验</h3>
          <div className="about-me-tags" aria-label="核心能力标签">
            <span>多模态数据集搭建</span>
            <span>模型评测体系</span>
            <span>项目全流程落地</span>
          </div>
        </div>
        <blockquote>
          “高质量训练数据是大模型能力的底座，AI 训练的本质，是把真实业务场景转化为模型能够学习、理解的知识，用体系化的数据建设实现模型能力可持续迭代。”
        </blockquote>
        <figure className="about-me-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/jia-weiling-portrait.jpg" alt="贾伟玲职业形象照" />
        </figure>
      </section>

      <section className="about-me-projects">
        <div className="about-me-projects-layout">
          <header className="about-me-projects-copy">
            <h3>代表项目</h3>
            <p className="about-me-projects-intro">
              专注多模态大模型数据训练领域，擅长从业务痛点切入，独立完成标注规范搭建、自动化流水线落地、标注团队统筹、模型评测、数据集交付闭环工作。覆盖文本对话、图文对齐、主播 LoRA 微调、音视频生成评测四大场景，以高质量训练数据驱动模型迭代，沉淀可复用的数据资产，落地多项商业化 AIGC 项目。
            </p>
          </header>
          <div className="about-me-projects-list">
            {videoProjects.map((project) => (
              <button
                type="button"
                className="about-me-project-card"
                key={project.number}
                onClick={() => setDetailProject(project)}
                aria-label={`查看${project.title}项目详情`}
              >
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.poster} alt="" />
                  <span>{project.number}</span>
                </div>
                <small>{project.tags}</small>
                <strong>{project.title}</strong>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="about-me-life">
        <header>
          <span>LIFE OUTSIDE WORK</span>
          <h3>工作之外，我如何感知世界</h3>
          <div className="about-me-life-overview">
            <p className="about-me-life-intro">
              工作之外，我热衷于持续探索 AI 前沿生成技术，也习惯留出时间走出城市短途出行。喜欢观察真实世界中的画面、语言与叙事逻辑，这份感知能力也持续反哺多模态数据样本设计。
              <br /><br />
              做事理性务实，擅长拆解复杂目标、搭建标准化流程；同时保持开放心态，乐于沟通协作，持续在数据与模型落地的交叉领域长期深耕。
            </p>
            <LifeVideoCarousel />
          </div>
        </header>
        <div className="about-me-life-sections">
          <section className="life-chapter life-travel-chapter">
            <div className="life-photo-collection">
              <header>
                <div>
                  <h5>旅行照片集合</h5>
                </div>
              </header>
              <div className="life-photo-grid" aria-label={`${lifePhotoSlots.length}张旅行照片`}>
                {lifePhotoSlots.map((photo) => (
                  <div key={photo.src} className="has-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt={photo.label} loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="life-chapter life-culture-chapter">
            <header className="life-chapter-header">
              <div>
                <h4>宅在家里，也保持输入</h4>
              </div>
            </header>
            <div className="life-culture-cards">
              {lifeCultureCollections.map((collection) => {
                const activeIndex = lifeCultureIndexes[collection.key] ?? 0;
                const activeItem = collection.items[activeIndex];

                return (
                  <button
                    type="button"
                    key={collection.key}
                    onClick={() => showNextCultureItem(collection.key, collection.items.length)}
                    aria-label={`查看下一条${collection.title}记录`}
                  >
                    <span>{collection.number} / {collection.english}</span>
                    <small>{collection.title}</small>
                    {"cover" in activeItem && activeItem.cover && (
                      <figure className="life-culture-cover">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={activeItem.cover} alt={`${activeItem.name}封面`} />
                      </figure>
                    )}
                    <strong aria-live="polite">{activeItem.name}</strong>
                    <p>{activeItem.note}</p>
                    <div>
                      <em>{activeItem.meta}</em>
                      <i>{String(activeIndex + 1).padStart(2, "0")} / {String(collection.items.length).padStart(2, "0")}　点击下一条 →</i>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="life-chapter life-personality-chapter">
            <header className="life-chapter-header">
              <span>03 / PERSONALITY</span>
              <div>
                <h4>可独处，也能融入团队</h4>
                <p>需要深度思考时保持安静专注，进入协作场景时主动表达、快速对齐。</p>
              </div>
            </header>
            <div className="life-personality-panel">
              <strong>I / E</strong>
              <div>
                <p>理性务实，但不失感受力；喜欢拆解复杂问题，也愿意在旅行、影像与阅读中保持对真实世界的观察。</p>
                <ul>
                  <li>独立思考</li>
                  <li>开放沟通</li>
                  <li>长期主义</li>
                  <li>持续输入</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="about-me-contact">
        <div>
          <span>LET&apos;S WORK TOGETHER</span>
          <h3>如果你正在寻找一名<br />能把数据、流程与模型结果连接起来的 AI 训练专家。</h3>
        </div>
        <div>
          <a href="mailto:wljcc518@163.com">wljcc518@163.com ↗</a>
          <a href="/resume.pdf" download>下载完整简历 PDF ↓</a>
        </div>
      </section>

      {detailProject && (
        <div
          className="exp-project-detail-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${detailProject.title}项目介绍`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDetailProject(null);
          }}
        >
          <article className="exp-project-detail-panel">
            <header>
              <span>PROJECT {detailProject.number} / CASE OVERVIEW</span>
              <button
                type="button"
                onClick={() => setDetailProject(null)}
                aria-label="关闭项目介绍"
                autoFocus
              >
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
                    detailProjectIndex - 1 + videoProjects.length
                  ) % videoProjects.length;
                  setDetailProject(videoProjects[previous]);
                }}
              >
                ← 上一个项目
              </button>
              <span>{detailProject.number} / {String(videoProjects.length).padStart(2, "0")}</span>
              <button
                type="button"
                onClick={() => {
                  const next = (detailProjectIndex + 1) % videoProjects.length;
                  setDetailProject(videoProjects[next]);
                }}
              >
                下一个项目 →
              </button>
            </footer>
          </article>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const active = sections[activeIndex];
  const activeBackgroundVideo = sectionBackgroundVideos[active.visual];

  useEffect(() => {
    if (!activeVideo) {
      document.body.classList.remove("modal-open");
      return;
    }

    document.body.classList.add("modal-open");
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("modal-open");
    };
  }, [activeVideo]);

  useEffect(() => {
    if (!detailOpen) return;
    document.body.classList.add("modal-open");
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("modal-open");
    };
  }, [detailOpen]);

  const selectCard = (index: number) => {
    setActiveIndex(index);
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const move = (direction: number) => {
    const next =
      (activeIndex + direction + sections.length) % sections.length;
    selectCard(next);
  };

  const moveDetail = (direction: number) => {
    const next = (activeIndex + direction + sections.length) % sections.length;
    selectCard(next);
  };

  return (
    <main
      className={`portfolio-shell theme-${active.visual} ${
        activeBackgroundVideo ? "has-video-background" : ""
      }`}
      style={{ "--accent": active.accent } as AccentStyle}
    >
      {activeBackgroundVideo && (
        <div className="page-video-background" aria-hidden="true">
          <video
            key={activeBackgroundVideo}
            src={activeBackgroundVideo}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
          />
        </div>
      )}

      <div className="ambient-visual" aria-hidden="true">
        <div className="ambient-grid">
          {Array.from({ length: 30 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
        <span className="ambient-code">{active.code}</span>
        <span className="ambient-line" />
      </div>

      <header className="topbar">
        <Link className="brand" href="/" aria-label="贾伟玲 AI 训练专家首页">
          <span className="brand-dot" />
          <span>
            JIA WEILING
            <small>AI TRAINING PORTFOLIO</small>
          </span>
        </Link>
        <nav aria-label="主要导航">
          <a href="#chapters">章节</a>
          <Link href="/section/representative-projects">项目</Link>
          <Link href="/section/assets">资产</Link>
        </nav>
        <a className="resume-link" href="/resume.pdf" download>
          下载简历 PDF
        </a>
      </header>

      <section className="hero-content" aria-live="polite">
        <div className="chapter-meta">
          <span>{active.eyebrow}</span>
          <span className="meta-rule" />
          <span>{active.meta}</span>
        </div>
        <h1 key={`${active.slug}-title`}>
          {active.number === "01" ? (
            <>
              资深 <em>AI</em>训练师
            </>
          ) : (
            active.title
          )}
        </h1>
        <p key={`${active.slug}-summary`}>{active.summary}</p>
        <div className="hero-actions">
          {active.number === "01" ? (
            <>
              <button
                type="button"
                className="detail-link"
                onClick={() => setDetailOpen(true)}
              >
                <span>个人总览</span>
                <b aria-hidden="true">↗</b>
              </button>
              <button
                type="button"
                className="secondary-link"
                onClick={() => {
                  selectCard(3);
                  setDetailOpen(true);
                }}
              >
                <span>代表项目</span>
                <b aria-hidden="true">↗</b>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="detail-link"
                onClick={() => setDetailOpen(true)}
              >
                <span>查看详情</span>
                <b aria-hidden="true">↗</b>
              </button>
              <span className="proof">{active.proof}</span>
            </>
          )}
        </div>
        {active.number === "01" && (
          <div className="profile-tags" aria-label="AI训练师能力标签">
            <span>LLM 对话 SFT</span>
            <span>音视频模型评测</span>
            <span>Dify 自动化</span>
            <span>BadCase 闭环</span>
          </div>
        )}
      </section>

      {!activeBackgroundVideo && (
        <ActiveSectionStage
          variant={active.visual}
          onPlayProject={setActiveVideo}
        />
      )}

      <section className="chapter-gallery" id="chapters">
        <div className="card-rail" aria-label="七个作品集章节">
          {sections.map((section, index) => (
            <button
              className={`chapter-card ${
                index === activeIndex ? "is-active" : ""
              }`}
              key={section.slug}
              onClick={() => selectCard(index)}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              style={{ "--card-accent": section.accent } as AccentStyle}
              aria-pressed={index === activeIndex}
              aria-label={`查看第 ${section.number} 章：${section.title}`}
            >
              <CardVisual variant={section.visual} />
              <span className="card-index">{section.number}</span>
              <span className="card-kicker">{section.cardKicker}</span>
              <strong>{section.cardTitle}</strong>
              <span className="card-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>

        <div className="gallery-controls">
          <button onClick={() => move(-1)} aria-label="上一张卡片">
            ←
          </button>
          <button onClick={() => move(1)} aria-label="下一张卡片">
            →
          </button>
          <span>
            <b>{active.number}</b> / 07
          </span>
        </div>
      </section>

      <footer className="home-footer">
        <span>文本 · 图文 · 音视频 · LoRA</span>
        <a href="mailto:wljcc518@163.com">wljcc518@163.com</a>
      </footer>

      {detailOpen && (
        <div
          className="section-drawer-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDetailOpen(false);
          }}
        >
          <aside
            className="section-drawer apple-detail-theme"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.cardTitle}详情`}
            style={{ "--drawer-accent": active.accent } as CSSProperties}
          >
            <header className="section-drawer-header">
              <div>
                <span>SECTION / {active.number}</span>
                <b>{active.eyebrow}</b>
              </div>
              <button
                type="button"
                onClick={() => setDetailOpen(false)}
                aria-label="关闭详情"
                autoFocus
              >
                ×
              </button>
            </header>

            <div className="section-drawer-scroll">
              {active.visual === "thinking" ? (
                <AboutMeDrawerContent />
              ) : active.visual === "method" ? (
                <WorkMethodDrawerContent />
              ) : (
                <>
              <section className="section-drawer-intro">
                <span>{active.code}</span>
                <div>
                  <h2>{active.title}</h2>
                  <p>{active.intro}</p>
                </div>
              </section>

              <section className="section-drawer-metrics" aria-label="关键指标">
                {active.metrics.map((metric, index) => (
                  <article key={`${metric.value}-${metric.label}`}>
                    <span>0{index + 1}</span>
                    <strong>{metric.value}</strong>
                    <p>{metric.label}</p>
                  </article>
                ))}
              </section>

              <section className="section-drawer-points">
                <div className="section-drawer-label">
                  <span>DETAIL / APPROACH</span>
                  <b>{active.meta}</b>
                </div>
                <div>
                  {active.points.map((point, index) => (
                    <article key={point.title}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{point.title}</h3>
                      <p>{point.text}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="section-drawer-assets">
                <div>
                  <span>OUTPUT / ASSETS</span>
                  <h3>可展示与持续沉淀</h3>
                </div>
                <ul>
                  {active.artifacts.map((artifact) => (
                    <li key={artifact}>{artifact}</li>
                  ))}
                </ul>
              </section>
                </>
              )}
            </div>

            <footer className="section-drawer-footer">
              <button type="button" onClick={() => moveDetail(-1)}>
                ← 上一章
              </button>
              <span>
                <b>{active.number}</b> / 07
              </span>
              <button type="button" onClick={() => moveDetail(1)}>
                下一章 →
              </button>
            </footer>
          </aside>
        </div>
      )}

      {activeVideo && (
        <div
          className="project-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.title}视频`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              videoRef.current?.pause();
              setActiveVideo(null);
            }
          }}
        >
          <div className="project-video-dialog">
            <div className="project-video-dialog-header">
              <div>
                <span>
                  {activeVideo.label ?? "PROJECT"} {activeVideo.number} /{" "}
                  {activeVideo.durationLabel ?? "00:08"}
                </span>
                <h2>{activeVideo.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  videoRef.current?.pause();
                  setActiveVideo(null);
                }}
                aria-label="关闭视频"
                title="关闭视频"
              >
                ×
              </button>
            </div>
            <video
              ref={videoRef}
              key={activeVideo.video}
              src={activeVideo.video}
              poster={activeVideo.poster || undefined}
              controls
              autoPlay
              playsInline
            />
            <div className="project-video-dialog-copy">
              <span>{activeVideo.tags}</span>
              <p>{activeVideo.result}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
