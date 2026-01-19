import { ImageResponse } from "next/og";
import { getWeddingBySlug } from "@/lib/weddings";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type PageProps = {
  params: { slug: string };
};

export default async function OpengraphImage({ params }: PageProps) {
  const { slug } = params;
  const event = await getWeddingBySlug(slug);

  const title = event
    ? `${event.brideName} & ${event.groomName}`
    : "Wedding Invitation";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #f8efe4 0%, #f3e1cf 50%, #e9c7a9 100%)",
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
            WEDDING INVITATION
          </div>
          <div style={{ fontSize: 64, fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 24, color: "rgba(0,0,0,0.6)" }}>
            {event ? `${event.city} di ${event.venue}` : "Save the date"}
          </div>
        </div>
      </div>
    ),
    size
  );
}
