import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { getSection, sections } from "../../content";
import SectionExperience from "./SectionExperience";
import { sitePath } from "../../site-path";

const detailVideos: Record<string, string> = {
  thinking: "/media/chapter-01-profile.mp4",
  method: "/media/05.mp4",
  capability: "/media/07.mp4",
  projects: "/media/09.mp4",
  evidence: "/media/06.mp4",
  assets: "/media/04.mp4",
  career: "/media/08.mp4",
};

export function generateStaticParams() {
  return sections.map((section) => ({ slug: section.slug }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getSection(slug);

  if (!section) {
    notFound();
  }

  const video = detailVideos[section.visual];

  return (
    <main
      className={`experience-page experience-${section.visual}`}
      style={{ "--accent": section.accent } as CSSProperties}
    >
      <section className="experience-hero">
        {video && (
          <div className="experience-hero-video" aria-hidden="true">
            <video
              key={video}
              src={video}
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
            />
          </div>
        )}

        <header className="experience-header">
          <a href={sitePath("/")} className="experience-back">
            ← 返回首页
          </a>
          <span className="experience-brand">
            JIA WEILING
            <small>AI TRAINING PORTFOLIO</small>
          </span>
          <a href="/resume.pdf" download>
            下载简历 PDF
          </a>
        </header>

        <div className="experience-hero-copy">
          <p>
            {section.eyebrow} / {section.number}
          </p>
          <h1>{section.title}</h1>
          <span>{section.summary}</span>
          <div>
            <b>{section.proof}</b>
            <a href="#chapter-content">进入本章 ↓</a>
          </div>
        </div>

        <nav className="experience-chapter-nav" aria-label="七个作品集章节">
          {sections.map((item) => (
            <a
              href={sitePath(`/section/${item.slug}/`)}
              className={item.slug === section.slug ? "is-current" : ""}
              key={item.slug}
              aria-current={item.slug === section.slug ? "page" : undefined}
            >
              <span>{item.number}</span>
              <b>{item.cardTitle}</b>
            </a>
          ))}
        </nav>
      </section>

      <SectionExperience section={section} />
    </main>
  );
}
