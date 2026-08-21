import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.GITHUB_PAGES === "true"
  ? "https://wljcc518.github.io/web/"
  : "http://localhost:3000/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "贾伟玲｜AI 训练专家作品集",
  description:
    "多模态数据治理、LoRA 数据流水线、模型评测与 BadCase 资产沉淀作品集。",
  openGraph: {
    title: "贾伟玲｜AI 训练专家作品集",
    description: "数据 · 自动化 · 评测 · 资产",
    images: [{ url: "og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "贾伟玲｜AI 训练专家作品集",
    description: "数据 · 自动化 · 评测 · 资产",
    images: ["og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
