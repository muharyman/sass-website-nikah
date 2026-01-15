import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #fdf8f2 0%, #f4dcc6 50%, #e7bf9e 100%)",
          color: "#1d1b1a",
          padding: "64px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "2px solid rgba(0,0,0,0.08)",
            borderRadius: "36px",
            padding: "48px",
            background: "rgba(255,255,255,0.7)",
          }}
        >
          <div style={{ fontSize: 24, letterSpacing: "0.3em" }}>
            SAAS WEDDING WEBSITES
          </div>
          <div style={{ fontSize: 64, fontWeight: 600 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 24, color: "rgba(0,0,0,0.6)" }}>
            {siteConfig.description}
          </div>
        </div>
      </div>
    ),
    size
  );
}
