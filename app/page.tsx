"use client";

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
import { ProjectCaseStudy, ProjectCaseStudyHero } from "./project-case-study";
import { sitePath } from "./site-path";

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

const chapterCardPreviewImages: Record<string, string> = {
  thinking: "/media/home-card-01-portfolio.webp",
  method: "/media/home-card-02-method.webp?v=20260812-2",
  capability: "/media/home-card-03-capability.webp?v=20260812-2",
  projects: "/media/home-card-04-projects.webp?v=20260812-2",
  evidence: "/media/home-card-05-evidence.webp?v=20260812-1",
  assets: "/media/home-card-06-assets.webp?v=20260812-2",
  career: "/media/home-card-07-career.webp?v=20260812-2",
};

const artifactShowcase: Record<string, { image: string; alt: string }> = {
  图片规则库: {
    image: "/asset-showcase/image-rule-library.webp",
    alt: "图片规则库素材治理流程图",
  },
  视频规则库: {
    image: "/asset-showcase/video-rule-library.webp",
    alt: "视频规则库音视频模型评测系统图",
  },
  工作流模板库: {
    image: "/asset-showcase/workflow-template-library.webp",
    alt: "Dify 自动化工作流模板库流程图",
  },
  "BadCase 目录": {
    image: "/asset-showcase/badcase-directory.webp",
    alt: "多模态智能客服 BadCase 目录图",
  },
  能力矩阵: {
    image: "/asset-showcase/capability-matrix.webp",
    alt: "AI 训练专家六维熟练度雷达图",
  },
  流程泳道图: {
    image: "/asset-showcase/process-swimlane.webp",
    alt: "多模态素材治理全链路流程泳道图",
  },
  团队质检机制: {
    image: "/asset-showcase/team-qc.webp",
    alt: "三级质控闭环体系图",
  },
};

const assetCardImages = [
  { image: "/asset-cards/rule-assets.webp", alt: "规则资产视觉图" },
  { image: "/asset-cards/tool-assets.webp", alt: "工具资产视觉图" },
  { image: "/asset-cards/defect-assets.webp", alt: "缺陷资产视觉图" },
];

const careerCardImages = [
  { image: "/career-cards/data-production.webp", alt: "数据生产基础视觉图" },
  { image: "/career-cards/multimodal-expansion.webp", alt: "多模态扩展视觉图" },
  { image: "/career-cards/training-evaluation-loop.webp", alt: "训练与评测闭环视觉图" },
];

const artifactDescriptions: Record<string, string> = {
  指标口径卡:
    "固化全项目统一统计公式、指标定义、基线规范，新项目无需重复搭建核算体系",
  "Before / After":
    "效果前后对照样本、画质 / 时序 / 一致性对比截图，直观呈现优化收益",
  "BadCase 证据链":
    "带时间戳标注的缺陷样本库、问题归类台账，用于模型迭代复盘与边界场景扩充",
};

const lifeTravelStories = [
  {
    number: "01",
    title: "夜爬泰山",
    location: "从深夜走到日出",
    description: "把漫长的夜路、抵达山顶前的疲惫与第一束日光放在同一段叙事中，让视频和文字共同保留这次经历。",
    video: "/media/life/夜爬泰山.mp4",
    poster: "/media/life/日出.webp",
  },
  {
    number: "02",
    title: "去海边",
    location: "把节奏交给浪潮",
    description: "海边更像一次短暂清空：听浪、看落日、记录没有任务的时间。在缓慢的浪潮里重新找回观察和感受的节奏。",
    video: "/media/life/海边.mp4",
    poster: "/media/life/海边.webp",
  },
];

const lifeTravelClips = [
  { title: "日落", video: "/media/life/日落.mp4", poster: "/media/life/日落.webp" },
  { title: "湖面", video: "/media/life/湖面.mp4", poster: "/media/life/湖面.webp" },
  { title: "爬雪山", video: "/media/life/雪山.mp4", poster: "/media/life/雪山.webp" },
  { title: "铃铛", video: "/media/life/铃铛.mp4", poster: "/media/life/铃铛.webp" },
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
    src: `/media/life/travel-archive/travel-${String(photoNumber).padStart(3, "0")}.webp`,
  }));

const lifeCultureCollections = [
  {
    key: "books",
    number: "01",
    english: "BOOKS",
    title: "读书",
    items: [
      { name: "《杀死一只知更鸟》", meta: "文学 / 成长", note: "在偏见与不公面前，仍然选择理解、勇气与善意。", cover: "/media/life/books/book-01.webp" },
      { name: "《鞋狗》", meta: "商业 / 创业", note: "从耐克的成长经历里，看见长期主义、选择与冒险。", cover: "/media/life/books/book-02.webp" },
      { name: "《光荣与梦想》", meta: "历史 / 社会", note: "把个人命运放进时代背景中，理解社会如何持续变化。", cover: "/media/life/books/book-03.webp" },
      { name: "《月亮与六便士》", meta: "文学 / 理想", note: "关于现实生活、内在冲动与个人选择的持续追问。", cover: "/media/life/books/book-04.webp" },
      { name: "《平凡的世界》", meta: "文学 / 人生", note: "在普通生活的重量里，看见人的坚韧、尊严与成长。", cover: "/media/life/books/book-05.webp" },
      { name: "《明朝那些事儿》", meta: "历史 / 叙事", note: "用更易读的叙事方式理解历史人物、制度与时代进程。", cover: "/media/life/books/book-06.webp" },
      { name: "《奇点更近》", meta: "科技 / 未来", note: "从技术加速的视角，观察人工智能与人类未来的关系。", cover: "/media/life/books/book-07.webp" },
      { name: "《机器学习》", meta: "AI / 算法", note: "连接算法原理、公式推导与代码实践，补足模型基础认知。", cover: "/media/life/books/book-08.webp" },
      { name: "《智慧的疆界》", meta: "AI / 计算史", note: "沿着图灵机与人工智能的发展，理解机器智慧的边界。", cover: "/media/life/books/book-09.webp" },
    ],
  },
  {
    key: "films",
    number: "02",
    english: "FILMS",
    title: "影视",
    items: [
      { name: "《辛德勒的名单》", meta: "电影 / 历史", note: "在黑暗历史中，看见个体选择所能守住的人性与生命。", cover: "/media/life/films/film-01.webp" },
      { name: "《教父》", meta: "电影 / 家族", note: "权力、家庭与秩序交织下的经典人物叙事。", cover: "/media/life/films/film-02.webp" },
      { name: "《勇敢的心》", meta: "电影 / 史诗", note: "关于自由、信念与承担代价的史诗表达。", cover: "/media/life/films/film-03.webp" },
      { name: "《生活大爆炸》", meta: "剧集 / 喜剧", note: "用轻松日常讲述理工思维、友谊与共同成长。", cover: "/media/life/films/film-04.webp" },
      { name: "《志愿军：浴血和平》", meta: "电影 / 战争", note: "在战场与谈判的双线中理解和平背后的牺牲。", cover: "/media/life/films/film-05.webp" },
      { name: "《阿甘正传》", meta: "电影 / 人生", note: "以真诚和行动穿过时代变化，保留对生活的相信。", cover: "/media/life/films/film-06.webp" },
      { name: "《权力的游戏》", meta: "剧集 / 奇幻", note: "庞大世界观中关于权力、选择与命运的群像叙事。", cover: "/media/life/films/film-07.webp" },
      { name: "《指环王》", meta: "电影 / 奇幻", note: "在漫长旅途中理解勇气、伙伴与普通人的坚持。", cover: "/media/life/films/film-08.webp" },
      { name: "《肖申克的救赎》", meta: "电影 / 希望", note: "困境之中仍保有耐心、希望与重新选择的能力。", cover: "/media/life/films/film-09.webp" },
      { name: "《绿皮书》", meta: "电影 / 公路", note: "在一段旅程中跨越偏见，建立理解与真正的友谊。", cover: "/media/life/films/film-10.webp" },
    ],
  },
  {
    key: "manga",
    number: "03",
    english: "ANIME",
    title: "漫画与动漫",
    items: [
      { name: "《咒术回战》", meta: "动漫 / 战斗", note: "在高压对抗中观察选择、责任与同伴之间的关系。", cover: "/media/life/anime/anime-01.webp" },
      { name: "《葬送的芙莉莲》", meta: "动漫 / 时间", note: "在缓慢旅途中重新认识时间、记忆与陪伴。", cover: "/media/life/anime/anime-02.webp" },
      { name: "《排球少年!!》", meta: "动漫 / 排球", note: "关于团队协作、长期训练和持续突破的热血故事。", cover: "/media/life/anime/anime-03.webp" },
      { name: "《强风吹拂》", meta: "动漫 / 跑步", note: "十个人用各自的节奏共同奔向同一个长期目标。", cover: "/media/life/anime/anime-04.webp" },
      { name: "《钻石王牌》", meta: "动漫 / 棒球", note: "在竞争和配合中不断磨炼技术，也重新理解团队位置。", cover: "/media/life/anime/anime-05.webp" },
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
      image: "/media/work-module-01-wide.webp?v=wide-20260809-3",
    },
    {
      code: "02 / PRODUCTION",
      title: "数据生产全链路管控",
      text: "基于已制定标准，统筹内部 + 外包标注资源，做任务拆解、人员培训、质检规则落地；把控数据产出质量、交付时效，处理标注歧义 Case 闭环，过滤低质样本，保障训练 / 评测数据集稳定性。",
      image: "/media/work-module-03-wide.webp?v=wide-20260809-3",
    },
    {
      code: "03 / ENGINEERING",
      title: "流程工程化与效率优化",
      text: "不依赖纯人工，梳理重复工作，配合工具 / 低代码搭建自动化流水线：样本过滤、抽帧、Caption 生成、初筛校验，减少人工重复工作量，提升数据生产人效，沉淀可复用工具与流程。",
      image: "/media/work-module-02-wide.webp?v=wide-20260809-3",
    },
    {
      code: "04 / EVALUATION",
      title: "模型评测与迭代闭环",
      text: "搭建对应业务场景评测体系，设计评测数据集、评测维度；对模型输出结果做效果验收，定位模型缺陷，反向输出数据优化方向，用数据反馈驱动模型迭代，验证业务指标改善效果。",
      image: "/media/work-module-04-wide.webp?v=wide-20260809-3",
    },
  ];
  const loopSteps = [
    {
      code: "01",
      title: "业务输入",
      text: "从产品、运营、内容安全侧收集真实问题，先判断模型问题、数据问题还是流程问题。",
      image: "/media/work-loop-04.webp",
    },
    {
      code: "02",
      title: "标准拆解",
      text: "把抽象目标拆成可标注、可验收、可复核的字段、规则、边界和反例。",
      image: "/media/work-loop-02.webp",
    },
    {
      code: "03",
      title: "数据生产",
      text: "组织标注、质检、抽样复核与歧义处理，保证数据集稳定交付。",
      image: "/media/work-loop-03.webp",
    },
    {
      code: "04",
      title: "评测回流",
      text: "用 BadCase 和评测结果反推样本补强方向，让模型迭代有明确依据。",
      image: "/media/work-loop-01.webp",
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
        <span>OPERATION MAP</span>
        <h2>从业务问题到模型改善的闭环路径</h2>
        <p>把“要模型变好”拆成可执行的连续动作，每一步都留下标准、数据、评测和复盘记录。</p>
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
          <img src="/media/work-method-ai-wisdom.webp" alt="大理石智者与人工智能认证图景" />
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

function AudioEvaluationHero() {
  return (
    <>
      <section className="audio-project-masthead">
        <div><span>CASE STUDY / 01</span><h2>音视频生成模型横向评测</h2><p>从业务选型问题，到可复用的评测资产。</p></div>
      </section>
      <nav className="audio-project-steps" aria-label="项目详情页章节">
        {["项目信息", "背景 & 痛点", "核心工作", "数据可信", "质控机制", "流程泳道", "量化成果", "项目复盘"].map((item, index) => (
          <a key={item} href={`#audio-section-${index + 1}`}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span></a>
        ))}
      </nav>
      <section id="audio-section-1" className="audio-project-hero" aria-labelledby="audio-project-title">
      <div className="audio-project-hero-heading">
        <h1 id="audio-project-title">音视频生成模型<br />横向评测专项</h1>
      </div>

      <div className="audio-project-facts">
        <article className="audio-project-fact-pair">
          <div><span>项目周期：</span><strong>2025.04‑2025.05</strong></div>
          <div><span>我的角色：</span><strong>评测 & 数据负责人</strong></div>
        </article>
        <article className="audio-project-goal"><span>业务目标：</span><strong>多款第三方音视频 AIGC 模型横向对比选型</strong><p>输出选型决策依据，沉淀可复用评测资产，指导后续模型迭代。</p></article>
      </div>
      </section>
    </>
  );
}

function AudioEvaluationCaseStudy() {
  const workstreams = [
    {
      number: "01",
      title: "标准体系搭建",
      lead: "把主观观感，变成可量化、可执行的业务标准。",
      points: ["对齐真实业务场景，设计 7 维加权评测体系", "覆盖事实准确性、主体时序稳定性、音画字幕对齐、画质、叙事逻辑、人物完整性、业务可用性", "划分缺陷严重等级，输出音视频评测 SOP", "构建普通、高频业务、长尾边界 Case 分层测试集"],
    },
    {
      number: "02",
      title: "模型评测与盲审",
      lead: "隐去模型身份，用控制变量保证横向对比公平。",
      points: ["样本脱敏混淆，执行双人盲审，消除模型偏好", "统一提示词与生成参数，控制变量", "逐视频记录缺陷及时间戳", "输出完整选型报告、落地风险与选型建议"],
    },
    {
      number: "03",
      title: "自动化数据链路",
      lead: "把时间留给判断，而不是重复的统计和整理。",
      points: ["脚本辅助批量任务调度、样本归集和元数据打标", "自动汇总评测结果并计算加权总分", "按模型、缺陷类型、难度等级自动归档", "减少 Excel 手工统计，显著压缩整体评测周期"],
    },
    {
      number: "04",
      title: "BadCase 闭环运营",
      lead: "不只给出排名，还要让每个缺陷成为模型优化的坐标。",
      points: ["搭建 800+ 视频缺陷库，记录标签与缺陷时间片段", "根因归类主体漂移、人物畸变、音画不同步等问题", "将缺陷库交付算法团队，用于迭代与训练数据补充", "新版本复用同一测试集回归验证，形成持续闭环"],
    },
  ];

  const blindReviewSteps = ["样本脱敏", "双人独立打分", "分歧归集", "负责人仲裁", "一致性监控"];
  const swimlaneSteps = [
    ["业务产品", "业务需求输入", "输出选型报告"],
    ["评测负责人（本人）", "评测维度 & 权重设计", "构建分层难度测试集", "争议仲裁", "自动聚合统计"],
    ["评测执行小组", "模型统一生成样本", "样本脱敏盲审", "双人打分"],
    ["算法团队", "BadCase 缺陷库沉淀", "模型版本复测迭代"],
  ];

  return (
    <div className="audio-case-study">
      <section className="audio-case-banner">
        <div><span>01 / PROJECT BRIEF</span><h3>音视频生成模型横向评测专项</h3></div>
        <dl>
          <div><dt>项目周期</dt><dd>当年落地专项</dd></div>
          <div><dt>项目定位</dt><dd>多款商业化音视频 AIGC 模型选型 + 能力摸底评测</dd></div>
          <div><dt>我的角色</dt><dd>评测体系 & 数据训练负责人（独立设计评测框架、测试集和盲审机制，沉淀缺陷库并输出业务选型报告）</dd></div>
          <div><dt>服务对象</dt><dd>业务产品、算法团队</dd></div>
        </dl>
        <article><span>BUSINESS GOAL</span><p>解决多模型选型缺少客观标准、人工打分主观误差大的问题；输出横向对比结论支撑商业化选型，同时沉淀视频 BadCase 库，为模型训练与数据优化提供方向。</p></article>
      </section>

      <section id="audio-section-2" className="audio-case-pain">
        <header><span>02 / CONTEXT</span><h3>为什么需要<br />重新定义评测？</h3><p className="audio-case-section-intro">业务需要从多款第三方音视频生成模型中，选出真正适合商业落地的版本。原有模式却无法提供稳定、客观、可复现的判断。</p></header>
        <div>{[
          ["无统一评测标准", "每个人评判侧重点不同，主观感受代替客观指标。"],
          ["评测样本混乱", "普通场景过多，边界与高难业务场景缺失，结论失真。"],
          ["评测成本高、周期长", "全人工逐条审片，整理与统计占用大量人力。"],
          ["只有分数，没有沉淀", "只给排名，不保留缺陷样本，无法支持算法定向优化。"],
        ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h4>{title}</h4><p>{copy}</p></article>)}</div>
      </section>

      <section id="audio-section-3" className="audio-case-work">
        <header><span>03 / CORE WORK</span><h3>四条工作流，<br />构成一套完整的评测系统。</h3></header>
        <div>{workstreams.map((item) => <article key={item.number}><span>{item.number}</span><div><h4>{item.title}</h4><strong>{item.lead}</strong><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div></article>)}</div>
      </section>

      <section id="audio-section-4" className="audio-case-trust">
        <header><span>04 / DATA CREDIBILITY</span><h3>数据能否经得起追问，<br />取决于口径、证据和边界。</h3></header>
        <div className="trust-baselines">
          <article><span>DATA 01</span><h4>完整评测周期</h4><dl><div><dt>基线</dt><dd>纯人工全流程评测一轮需要 3 天</dd></div><div><dt>统计主体</dt><dd>评测小组工时记录</dd></div><div><dt>核验方式</dt><dd>全流程节点计时汇总</dd></div><div><dt>个人动作影响</dt><dd>脱敏盲审 + 自动化归集和聚合脚本，周期压缩至 4 小时，人力成本下降 70%</dd></div></dl></article>
          <article><span>DATA 02</span><h4>评测主观偏差</h4><dl><div><dt>基线</dt><dd>单人独立评测分数偏差区间 ±18%</dd></div><div><dt>统计主体</dt><dd>本人汇总多人员打分数据计算离散度</dd></div><div><dt>核验方式</dt><dd>同一样本多人打分差值统计</dd></div><div><dt>个人动作影响</dt><dd>7 维度加权 SOP + 双人盲审，打分偏差收窄至 ±5% 以内</dd></div></dl></article>
        </div>
        <div className="trust-evidence">
          <article><span>PROCESS EVIDENCE</span><h4>过程证据</h4><ol><li>7 维度加权评测 SOP 与权重说明</li><li>分层难易测试集样本清单</li><li>脱敏盲审打分原始记录表</li><li>800+ 带时间戳 BadCase 素材库</li><li>多模型横向对比选型终版报告</li></ol></article>
          <article><span>CAUSAL BOUNDARY</span><h4>因果边界</h4><ol><li><b>个人直接产出：</b>评测框架、维度权重、盲审方案、自动统计逻辑</li><li><b>团队协同：</b>双人评审分工、分歧仲裁校准</li><li><b>模型收益：</b>BadCase 回流后，新版本时序和音画同步问题改善</li></ol></article>
        </div>
      </section>

      <section id="audio-section-5" className="audio-case-review">
        <header><span>05 / QUALITY CONTROL</span><h3>双人盲审，<br />让结果不被偏好左右。</h3><p>样本脱敏混淆后进入双人独立打分；分差超阈值时进入争议池，由负责人依据 SOP 仲裁、更新规则，并持续监控评测人员一致性。</p></header>
        <div className="blind-review-flow">{blindReviewSteps.map((step, index) => <div key={step}><i>{index + 1}</i><span>{step}</span>{index < blindReviewSteps.length - 1 && <b>→</b>}</div>)}</div>
        <strong className="review-result">产出效果：显著降低人为主观带来的评测偏差。</strong>
      </section>

      <section id="audio-section-6" className="audio-case-swimlane">
        <header><span>06 / DELIVERY FLOW</span><h3>从需求输入，<br />到模型复测的完整泳道。</h3></header>
        <div className="flow-sequence">{["业务需求输入", "评测维度 & 权重设计", "构建分层难度测试集", "模型统一生成样本", "样本脱敏盲审", "双人打分 + 争议仲裁", "自动化聚合统计指标", "输出选型报告", "BadCase 缺陷库沉淀", "模型版本复测迭代"].map((step, index) => <span key={step}><b>{String(index + 1).padStart(2, "0")}</b>{step}</span>)}</div>
        <div className="swimlane-chart">{swimlaneSteps.map(([lane, ...steps]) => <div className="swimlane-row" key={lane}><b>{lane}</b><div>{steps.map((step) => <span key={step}>{step}</span>)}</div></div>)}</div>
        <div className="swimlane-assets"><span>评测 SOP</span><span>分层测试集</span><span>打分原始记录</span><span>选型报告</span><span>视频 BadCase 库</span></div>
      </section>

      <section id="audio-section-7" className="audio-case-results">
        <span>07 / MEASURABLE OUTCOME</span><h3>标准被建立，<br />周期被重新定义。</h3>
        <div className="result-hero"><strong>70%</strong><p>评测人力成本下降</p></div>
        <div className="result-grid"><article><strong>3 天 → 4 小时</strong><p>完整评测任务周期</p></article><article><strong>800+</strong><p>带时间戳的视频缺陷样本</p></article><article><strong>7 维度</strong><p>加权评测体系与分层测试集</p></article></div>
        <ul className="result-evidence"><li>建立 7 维度加权评测体系与分层难度测试集，填补业务标准空白。</li><li>商业化选型报告直接支撑模型采购决策，输出风险与落地建议。</li><li>SOP、测试集和缺陷标签体系可复用，大幅缩短新模型接入周期。</li></ul>
      </section>

      <section id="audio-section-8" className="audio-case-retro">
        <header><span>08 / RETROSPECTIVE</span><h3>一份报告会过期，<br />一套方法可以持续生长。</h3></header>
        <ol><li>音视频评测必须绑定真实业务场景，否则“好看”不代表“可用”。</li><li>盲审和控制变量是多模型横向对比公平的关键。</li><li>评测的长期价值是沉淀可复用的测试集与 BadCase 资产。</li><li><b>待改进：</b>极长尾高难场景样本仍有限，后续将持续扩充覆盖度。</li></ol>
      </section>
    </div>
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
          <img src="/media/jia-weiling-portrait.webp" alt="贾伟玲职业形象照" />
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
                onClick={() => {
                  if (project.number === "04") {
                    window.alert("项目04(智能客服数据建设)正在完善中,暂未提供 PDF。");
                    return;
                  }
                  const pdfUrl =
                    project.number === "01" ? "/pdfs/01-评测维度.pdf"
                    : project.number === "02" ? "/pdfs/02-LoRA数据集自动化.pdf"
                    : project.number === "03" ? "/pdfs/03-惠农素材标注规范.pdf"
                    : null;
                  if (pdfUrl) window.open(pdfUrl, "_blank", "noopener,noreferrer");
                }}
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
          <article className="exp-project-detail-panel is-apple-project">
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
              <ProjectCaseStudyHero projectNumber={detailProject.number} />
            </div>

            <ProjectCaseStudy projectNumber={detailProject.number} />

            {false ? (
              <div className="apple-project-story">
                <section className="apple-project-intro">
                  <span>THE CHALLENGE</span>
                  <h3>不是选出“最强模型”，<br />而是建立可信的选型方法。</h3>
                  <p>多业务线并行调用生成模型，但没有统一的样本、参数和评分口径。结果是质量判断依赖主观感受，成本、稳定性与合规风险无法被提前看见。</p>
                </section>

                <section className="apple-project-numbers" aria-label="项目关键数据">
                  <article><strong>5</strong><span>款主流模型</span></article>
                  <article><strong>100</strong><span>条独立生成样本</span></article>
                  <article><strong>7</strong><span>个核心评测维度</span></article>
                  <article><strong>7天</strong><span>完成一轮专项横评</span></article>
                </section>

                <section className="apple-project-system">
                  <header>
                    <span>THE SYSTEM</span>
                    <h3>从 Prompt 到决策，<br />每一步都可追溯。</h3>
                  </header>
                  <div className="apple-project-steps">
                    {[
                      ["分层测试集", "按 1:2:1 划分低、中、高难度，覆盖广告、数字人与短视频真实业务。"],
                      ["统一生成", "固定 16:9、720P 与视频时长，控制参数变量，保证模型间公平对比。"],
                      ["双人盲审", "打乱模型名称和样本顺序，双人独立标注，分歧样本由第三人仲裁。"],
                      ["缺陷回流", "对 BadCase 进行 P0–P3 分级、缺陷归因和样本归档，支持后续复测。"],
                    ].map(([title, copy], index) => (
                      <article key={title}>
                        <span>0{index + 1}</span>
                        <h4>{title}</h4>
                        <p>{copy}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="apple-project-dimensions">
                  <span>SEVEN DIMENSIONS</span>
                  <h3>把“看起来不错”，<br />拆成七个可执行的判断。</h3>
                  <div>
                    {["音视频遵循", "画面质量", "叙事流畅度", "声音品质", "音视频同步", "音频呈现力", "创意与美感"].map((item, index) => (
                      <span key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>
                    ))}
                  </div>
                </section>

                <section className="apple-project-outcome">
                  <span>OUTCOME</span>
                  <h3>评测不停在报告，<br />而是进入真实业务路由。</h3>
                  <p>最终输出按 Prompt 难度和业务类型分流的模型调度策略，并设定异常率超过 20% 自动熔断的灰度规则。从选型、审核到复测，形成可持续运转的闭环。</p>
                  <div>
                    <strong>800+</strong>
                    <span>缺陷样本沉淀为可复用资产</span>
                  </div>
                </section>
              </div>
            ) : (
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
            )}

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
  const [activeArtifactIndex, setActiveArtifactIndex] = useState(0);
  const [autoCycleToken, setAutoCycleToken] = useState(0);
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);
  const [detailProject, setDetailProject] = useState<VideoProject | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const active = sections[activeIndex];
  const activeBackgroundVideo = sectionBackgroundVideos[active.visual];
  const activeArtifact =
    active.artifacts[Math.min(activeArtifactIndex, active.artifacts.length - 1)] ?? "";
  const activeArtifactShowcase = artifactShowcase[activeArtifact];
  const activeArtifactDescription = artifactDescriptions[activeArtifact];

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
      if (event.key !== "Escape") return;
      if (detailProject) {
        setDetailProject(null);
        return;
      }
      setDetailOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("modal-open");
    };
  }, [detailOpen, detailProject]);

  useEffect(() => {
    if (detailOpen || activeVideo || detailProject) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % sections.length);
      setActiveArtifactIndex(0);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, autoCycleToken, detailOpen, activeVideo, detailProject]);

  const selectCard = (index: number) => {
    setActiveIndex(index);
    setActiveArtifactIndex(0);
    setAutoCycleToken((current) => current + 1);
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const openSectionDetail = (visual: string) => {
    const targetIndex = sections.findIndex((section) => section.visual === visual);
    if (targetIndex < 0) return;

    selectCard(targetIndex);
    setDetailProject(null);
    setDetailOpen(true);
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
            src={sitePath(activeBackgroundVideo)}
            poster={sitePath(chapterCardPreviewImages[active.visual])}
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
        <a className="brand" href={sitePath("/")} aria-label="贾伟玲 AI 训练专家首页">
          <span className="brand-dot" />
          <span>
            JIA WEILING
            <small>AI TRAINING PORTFOLIO</small>
          </span>
        </a>
        <nav aria-label="主要导航">
          <a href="#chapters">章节</a>
          <button type="button" onClick={() => openSectionDetail("projects")}>
            项目
          </button>
          <button type="button" onClick={() => openSectionDetail("assets")}>
            资产
          </button>
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
          {sections.map((section, index) => {
            const previewImage = chapterCardPreviewImages[section.visual];

            return (
              <button
                className={`chapter-card ${
                  previewImage ? "has-card-preview" : ""
                } ${index === activeIndex ? "is-active" : ""}`}
                key={section.slug}
                type="button"
                onClick={() => {
                  selectCard(index);
                }}
                onDoubleClick={() => {
                  selectCard(index);
                  setDetailOpen(true);
                }}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                style={{ "--card-accent": section.accent } as AccentStyle}
                aria-pressed={index === activeIndex}
                aria-label={`打开第 ${section.number} 章右侧详情页：${section.title}`}
              >
                {previewImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="chapter-card-preview-image" src={previewImage} alt="" />
                ) : (
                  <>
                    <CardVisual variant={section.visual} />
                    <span className="card-index">{section.number}</span>
                    <span className="card-kicker">{section.cardKicker}</span>
                    <strong>{section.cardTitle}</strong>
                    <span className="card-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </>
                )}
              </button>
            );
          })}
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
                <section
                  className={[
                    "section-drawer-intro",
                    active.visual === "projects" ? "section-drawer-intro-projects" : "",
                    active.visual === "assets" ? "section-drawer-intro-assets" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                <span>{active.visual === "capability" ? "DETAIL / APPROACH" : active.code}</span>
                <div>
                  <h2>{active.title}</h2>
                  <p>{active.intro}</p>
                </div>
              </section>

                {active.visual !== "projects" && active.visual !== "assets" && (
                  <section className="section-drawer-metrics" aria-label="关键指标">
                  {active.metrics.map((metric, index) => (
                    <article key={`${metric.value}-${metric.label}`}>
                      <span>0{index + 1}</span>
                      <strong>{metric.value}</strong>
                      {active.visual === "career" ? (
                        <div className="career-metric-labels">
                          <div className="career-metric-projects">
                            {metric.label.split("\n").map((label) => (
                              <p key={label}>{label}</p>
                            ))}
                          </div>
                          {(metric.stage || metric.highlights) && (
                            <div className="career-metric-detail">
                              {metric.stage && (
                                <p className="career-metric-stage">{metric.stage}</p>
                              )}
                              {metric.highlights && (
                                <ul className="career-metric-highlights">
                                  {metric.highlights.map((highlight) => (
                                    <li key={highlight}>{highlight}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        metric.label.split("\n").map((label) => (
                          <p key={label}>{label}</p>
                        ))
                      )}
                    </article>
                  ))}
                </section>
              )}

              <section className="section-drawer-points">
                {active.visual !== "projects" && (
                  <div className="section-drawer-label">
                    <span>DETAIL / APPROACH</span>
                    {active.visual !== "capability" && <b>{active.meta}</b>}
                  </div>
                )}
                <div>
                  {active.points.map((point, index) => {
                    const project = videoProjects[index];
                    const card = (
	                      <article
	                        key={point.title}
	                        className={[
	                          active.visual === "projects" ? "section-drawer-project-card" : "",
	                          point.detail ? "has-hover-detail" : "",
	                        ].filter(Boolean).join(" ") || undefined}
	                        aria-label={point.detail ? `${point.title}：${point.detail}` : undefined}
	                      >
                        {active.visual === "projects" && project?.poster && (
                          <div className="section-drawer-project-cover">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={project.poster}
                              alt={`${point.title}项目流程图`}
                            />
                          </div>
	                        )}
	                        {active.visual === "career" && careerCardImages[index] && (
	                          // eslint-disable-next-line @next/next/no-img-element
	                          <img
	                            className="career-card-image"
	                            src={careerCardImages[index].image}
	                            alt={careerCardImages[index].alt}
	                          />
	                        )}
	                        <span>{String(index + 1).padStart(2, "0")}</span>
	                        <h3>{point.title}</h3>
	                        <p className="point-summary">
	                          {point.text.split("\n\n").map((paragraph) => (
	                            <span key={paragraph}>{paragraph}</span>
	                          ))}
	                        </p>
	                        {active.visual === "assets" && assetCardImages[index] && (
	                          // eslint-disable-next-line @next/next/no-img-element
	                          <img
	                            className="asset-card-image"
	                            src={assetCardImages[index].image}
	                            alt={assetCardImages[index].alt}
	                          />
	                        )}
	                        {point.detail && <p className="point-detail">{point.detail}</p>}
	                        {active.visual === "projects" && <i>查看项目详情 ↗</i>}
	                      </article>
                    );

                    return active.visual === "projects" && project ? (
                      <button
                        type="button"
                        className="section-drawer-project-link"
                        key={point.title}
                        onClick={() => {
                  if (project.pdfUrl) {
                    window.open(project.pdfUrl, "_blank");
                  } else {
                    setDetailProject(project);
                  }
                }}
                        aria-label={`查看${project.title}项目详情`}
                      >
                        {card}
                      </button>
                    ) : (
                      card
                    );
                  })}
                </div>
              </section>

              {active.visual !== "career" && (
              <section className="section-drawer-assets">
                <div>
                  <span>OUTPUT / ASSETS</span>
                  <h3>可展示与持续沉淀</h3>
                </div>
                <div className="section-drawer-assets-showcase">
                  <ul>
                    {active.artifacts.map((artifact, index) => (
                      <li key={artifact}>
                        <button
                          type="button"
                          className={index === activeArtifactIndex ? "is-active" : ""}
                          onClick={() => setActiveArtifactIndex(index)}
                          aria-pressed={index === activeArtifactIndex}
                        >
                          {artifact}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {activeArtifactShowcase && (
                    <figure className="section-drawer-asset-preview">
                      <img
                        src={activeArtifactShowcase.image}
                        alt={activeArtifactShowcase.alt}
                      />
                    </figure>
                  )}
                  {activeArtifactDescription && (
                    <p className="section-drawer-asset-description">
                      {activeArtifactDescription}
                    </p>
                  )}
                </div>
              </section>
              )}
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
          <article className="exp-project-detail-panel is-apple-project">
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
              <ProjectCaseStudyHero projectNumber={detailProject.number} />
            </div>

            <ProjectCaseStudy projectNumber={detailProject.number} />

            {false && (
              <div className="apple-project-story">
                <section className="apple-project-intro">
                  <span>THE CHALLENGE</span>
                  <h3>不是选出“最强模型”，<br />而是建立可信的选型方法。</h3>
                  <p>在没有统一样本、生成参数和评分口径的情况下，模型选型依赖主观感受，质量、成本、稳定性和合规风险都无法被提前看见。</p>
                </section>
                <section className="apple-project-numbers" aria-label="项目关键数据">
                  <article><strong>5</strong><span>款主流模型</span></article>
                  <article><strong>100</strong><span>条独立生成样本</span></article>
                  <article><strong>7</strong><span>个核心评测维度</span></article>
                  <article><strong>7天</strong><span>完成一轮专项横评</span></article>
                </section>
                <section className="apple-project-system">
                  <header><span>THE SYSTEM</span><h3>从 Prompt 到决策，<br />每一步都可追溯。</h3></header>
                  <div className="apple-project-steps">
                    {[
                      ["分层测试集", "按 1:2:1 划分低、中、高难度，覆盖真实业务。"],
                      ["统一生成", "固定画幅、分辨率和时长，保证公平对比。"],
                      ["双人盲审", "双人独立标注，分歧样本由第三人仲裁。"],
                      ["缺陷回流", "BadCase 分级、归因与归档，用于后续复测。"],
                    ].map(([title, copy], index) => (
                      <article key={title}><span>0{index + 1}</span><h4>{title}</h4><p>{copy}</p></article>
                    ))}
                  </div>
                </section>
                <section className="apple-project-dimensions">
                  <span>SEVEN DIMENSIONS</span>
                  <h3>把“看起来不错”，<br />拆成七个可执行的判断。</h3>
                  <div>{["音视频遵循", "画面质量", "叙事流畅度", "声音品质", "音视频同步", "音频呈现力", "创意与美感"].map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>)}</div>
                </section>
                <section className="apple-project-outcome">
                  <span>OUTCOME</span>
                  <h3>评测不停在报告，<br />而是进入真实业务路由。</h3>
                  <p>输出按 Prompt 难度和业务类型分流的模型调度策略，设定异常率超过 20% 自动熔断的灰度规则。</p>
                  <div><strong>800+</strong><span>缺陷样本沉淀为可复用资产</span></div>
                </section>
              </div>
            )}

            {false && <div className="exp-project-detail-bottom">
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
            </div>}

            <footer>
              <button
                type="button"
                onClick={() => {
                  const current = videoProjects.findIndex(
                    (project) => project.number === detailProject.number,
                  );
                  const previous = (current - 1 + videoProjects.length) % videoProjects.length;
                  setDetailProject(videoProjects[previous]);
                }}
              >
                ← 上一个项目
              </button>
              <span>{detailProject.number} / {String(videoProjects.length).padStart(2, "0")}</span>
              <button
                type="button"
                onClick={() => {
                  const current = videoProjects.findIndex(
                    (project) => project.number === detailProject.number,
                  );
                  const next = (current + 1) % videoProjects.length;
                  setDetailProject(videoProjects[next]);
                }}
              >
                下一个项目 →
              </button>
            </footer>
          </article>
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
