import { createServer } from "node:http";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "public/media");
const port = 3102;

await mkdir(output, { recursive: true });

const projects = [
  {
    id: "project-01-evaluation",
    title: "音视频生成模型横向评测",
    subtitle: "AUDIO / VIDEO MODEL EVALUATION",
    metric: "800+",
    metricLabel: "缺陷 BadCase 沉淀",
    steps: ["分层测试集", "多模型生成", "双人盲审", "七维评分", "缺陷归因"],
    notes: ["场景 × 难度", "MODEL A—E", "去除品牌信息", "加权汇总", "回流评测"],
    accent: "#2f63c6",
    bg: "#e9eff5",
    dark: false,
  },
  {
    id: "project-02-lora",
    title: "LoRA 主播模型设计",
    subtitle: "HOST PERSONA LORA PIPELINE",
    metric: "+37%",
    metricLabel: "风格相似度平均提升",
    steps: ["直播切片", "ASR 转写", "样本清洗", "LoRA 训练", "风格盲测"],
    notes: ["音频 / 视频", "说话人分离", "SFT 指令构造", "人设与表达", "相似度校准"],
    accent: "#1d78a8",
    bg: "#e7f1f5",
    dark: false,
  },
  {
    id: "project-03-caption",
    title: "图片视频 Caption 数据工程",
    subtitle: "IMAGE / VIDEO CAPTION PIPELINE",
    metric: "12万+",
    metricLabel: "多模态素材治理",
    steps: ["素材接入", "自动 Caption", "规则清洗", "人工复核", "版本入库"],
    notes: ["图片 / 视频", "主体与事件", "敏感与幻觉过滤", "双层质检", "可追溯数据集"],
    accent: "#297b68",
    bg: "#e9f3ef",
    dark: false,
  },
  {
    id: "project-04-sft",
    title: "SFT 对话数据集治理",
    subtitle: "MULTI-TURN SFT DATASET",
    metric: "92.6%",
    metricLabel: "意图识别准确率",
    steps: ["意图拆解", "指令构造", "多轮标注", "一致性质检", "离线评测"],
    notes: ["场景与边界", "单轮 / 多轮", "Role / Content", "冲突样本校准", "固定测试集"],
    accent: "#7094df",
    bg: "#101820",
    dark: true,
  },
];

const page = `<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8">
<title>Generate portfolio videos</title>
<style>
  body{margin:0;display:grid;place-items:center;min-height:100vh;background:#0b1116;color:#eaf0f4;font-family:Arial,"PingFang SC",sans-serif}
  main{width:min(760px,calc(100% - 40px))}
  h1{font-size:22px}p{color:#8e9aa3;font-size:13px;line-height:1.7}
  .bar{height:8px;background:#202b34}.bar i{display:block;width:0;height:100%;background:#5f8ce5;transition:width .1s linear}
  #status{margin-top:18px;color:#9fb9ef;font-family:monospace}
  canvas{position:fixed;left:-9999px;top:-9999px}
</style>
<main>
  <h1>正在生成 4 段项目视频</h1>
  <p>四段流程图动画同步录制，每段固定 8 秒。</p>
  <div class="bar"><i id="bar"></i></div>
  <div id="status">PREPARING</div>
</main>
<script>
const projects = ${JSON.stringify(projects)};
const width = 960;
const height = 540;
// A small encoding tail keeps native players displaying 0:08 instead of flooring to 0:07.
const duration = 8050;
const fps = 30;
const canvases = [];
const recordings = [];
const status = document.querySelector("#status");
const bar = document.querySelector("#bar");

function rounded(ctx, x, y, w, h, r, fill, stroke, lineWidth = 1) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function text(ctx, value, x, y, size, color, weight = 400, align = "left") {
  ctx.font = weight + " " + size + 'px Arial,"PingFang SC","Microsoft YaHei",sans-serif';
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "top";
  ctx.fillText(value, x, y);
}

function draw(project, canvas, progress) {
  const ctx = canvas.getContext("2d", { alpha: false });
  const ink = project.dark ? "#f7f9fb" : "#111820";
  const muted = project.dark ? "#88959e" : "#69757e";
  const panel = project.dark ? "#19232b" : "rgba(255,255,255,.82)";
  const border = project.dark ? "rgba(255,255,255,.16)" : "#bdc8d0";

  ctx.fillStyle = project.bg;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = project.dark ? "rgba(255,255,255,.055)" : "rgba(28,58,81,.055)";
  ctx.lineWidth = 1;
  for (let x = 32; x < width; x += 64) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 32; y < height; y += 52) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  text(ctx, project.subtitle, 48, 34, 10, project.accent, 700);
  text(ctx, project.title, 48, 59, 25, ink, 700);
  text(ctx, "DATA FLOW / 8 SEC OVERVIEW", 912, 38, 8, muted, 600, "right");

  const cardY = 194;
  const cardW = 144;
  const gap = 44;
  const startX = 48;
  const active = Math.min(4.999, progress * 5);
  const lineStart = startX + cardW;
  const lineEnd = startX + 4 * (cardW + gap);
  ctx.strokeStyle = border;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(lineStart, cardY + 54); ctx.lineTo(lineEnd, cardY + 54); ctx.stroke();
  ctx.strokeStyle = project.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(lineStart, cardY + 54);
  ctx.lineTo(lineStart + (lineEnd - lineStart) * Math.min(1, progress * 1.08), cardY + 54);
  ctx.stroke();

  project.steps.forEach((step, index) => {
    const x = startX + index * (cardW + gap);
    const reached = active >= index;
    rounded(ctx, x, cardY, cardW, 108, 3, reached ? project.accent + "18" : panel, reached ? project.accent : border, reached ? 2 : 1);
    text(ctx, String(index + 1).padStart(2, "0"), x + 12, cardY + 11, 8, reached ? project.accent : muted, 700);
    text(ctx, step, x + 12, cardY + 43, 13, ink, 700);
    text(ctx, project.notes[index], x + 12, cardY + 71, 8, muted, 400);
    if (index < 4) text(ctx, "→", x + cardW + 22, cardY + 45, 16, project.accent, 500, "center");
  });

  rounded(ctx, 48, 375, 864, 105, 3, panel, border);
  text(ctx, "MEASURABLE OUTCOME", 66, 394, 8, project.accent, 700);
  text(ctx, project.metric, 66, 416, 36, project.accent, 700);
  text(ctx, project.metricLabel, 255, 432, 12, ink, 700);
  rounded(ctx, 548, 420, 328, 9, 5, project.dark ? "rgba(255,255,255,.10)" : "#d5dce1");
  rounded(ctx, 548, 420, Math.max(9, 328 * progress), 9, 5, project.accent);
  text(ctx, (progress * 8).toFixed(1).padStart(4, "0") + " / 08.0 SEC", 876, 442, 8, muted, 500, "right");
}

async function upload(name, blob) {
  const response = await fetch("/upload?name=" + encodeURIComponent(name), {
    method: "POST",
    headers: { "Content-Type": blob.type || "application/octet-stream" },
    body: blob
  });
  if (!response.ok) throw new Error("Upload failed: " + name);
}

async function run() {
  status.textContent = "RECORDING / 00.0 SEC";
  for (const project of projects) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    draw(project, canvas, 0);
    const poster = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
    await upload(project.id + ".png", poster);
    const stream = canvas.captureStream(fps);
    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp8")
      ? "video/webm;codecs=vp8"
      : "video/webm";
    const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 1800000 });
    const chunks = [];
    recorder.ondataavailable = event => {
      if (event.data.size) chunks.push(event.data);
    };
    canvases.push({ project, canvas });
    recordings.push({ project, recorder, chunks });
    recorder.start(500);
  }

  const started = performance.now();
  await new Promise(resolve => {
    const tick = () => {
      const elapsed = performance.now() - started;
      const progress = Math.min(1, elapsed / duration);
      canvases.forEach(({ project, canvas }) => draw(project, canvas, progress));
      bar.style.width = (progress * 100).toFixed(1) + "%";
      status.textContent = "RECORDING / " + Math.min(8, elapsed / 1000).toFixed(1).padStart(4, "0") + " SEC";
      if (elapsed >= duration) {
        resolve();
      } else {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  });

  await Promise.all(recordings.map(({ recorder, chunks, project }) => new Promise((resolve, reject) => {
    recorder.onstop = async () => {
      try {
        await upload(project.id + ".webm", new Blob(chunks, { type: recorder.mimeType }));
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    recorder.stop();
  })));
  status.textContent = "DONE / 4 VIDEOS / 8 SEC EACH";
  document.title = "DONE";
}

run().catch(error => {
  status.textContent = "ERROR / " + error.message;
  document.title = "ERROR";
});
</script>
</html>`;

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://localhost:${port}`);
  if (request.method === "GET" && url.pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    response.end(page);
    return;
  }

  if (request.method === "POST" && url.pathname === "/upload") {
    const name = url.searchParams.get("name") ?? "";
    if (!/^[a-z0-9-]+\.(?:png|webm)$/.test(name)) {
      response.writeHead(400);
      response.end("Invalid file name");
      return;
    }
    const chunks = [];
    for await (const chunk of request) {
      chunks.push(chunk);
    }
    await writeFile(resolve(output, name), Buffer.concat(chunks));
    response.writeHead(204);
    response.end();
    console.log(`Saved ${name}`);
    return;
  }

  response.writeHead(404);
  response.end("Not found");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Generator ready at http://127.0.0.1:${port}/`);
});
