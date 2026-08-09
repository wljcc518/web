"use client";

import { useEffect, useRef, useState } from "react";
import { type VideoProject, videoProjects } from "../../project-data";

export default function ProjectVideoGallery() {
  const [activeProject, setActiveProject] = useState<VideoProject | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!activeProject) {
      document.body.classList.remove("modal-open");
      return;
    }

    document.body.classList.add("modal-open");
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("modal-open");
    };
  }, [activeProject]);

  const closeVideo = () => {
    videoRef.current?.pause();
    setActiveProject(null);
  };

  return (
    <>
      <div className="project-video-grid">
        {videoProjects.map((project) => (
          <article key={project.number}>
            <button
              className="project-video-cover"
              type="button"
              onClick={() => setActiveProject(project)}
              aria-label={`播放 ${project.title} 的 8 秒视频`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.poster} alt={`${project.title}流程图封面`} />
              <span className="project-video-number">{project.number}</span>
              <span className="project-video-duration">00:08</span>
              <span className="project-video-play" aria-hidden="true">▶</span>
            </button>
            <div className="project-video-copy">
              <p>{project.english}</p>
              <div>
                <h3>{project.title}</h3>
                <strong>{project.metric}</strong>
              </div>
              <span>{project.tags}</span>
              <p>{project.result}</p>
            </div>
          </article>
        ))}
      </div>

      {activeProject && (
        <div
          className="project-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title}项目视频`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeVideo();
            }
          }}
        >
          <div className="project-video-dialog">
            <div className="project-video-dialog-header">
              <div>
                <span>PROJECT {activeProject.number} / 00:08</span>
                <h2>{activeProject.title}</h2>
              </div>
              <button
                type="button"
                onClick={closeVideo}
                aria-label="关闭视频"
                title="关闭视频"
              >
                ×
              </button>
            </div>
            <video
              ref={videoRef}
              key={activeProject.video}
              src={activeProject.video}
              poster={activeProject.poster}
              controls
              autoPlay
              playsInline
            />
            <div className="project-video-dialog-copy">
              <span>{activeProject.tags}</span>
              <p>{activeProject.result}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
