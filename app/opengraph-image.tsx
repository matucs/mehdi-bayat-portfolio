import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#09090b",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#60a5fa", letterSpacing: 4, textTransform: "uppercase" }}>
          Vienna, Austria
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 24 }}>Mehdi Bayat</div>
        <div style={{ display: "flex", fontSize: 34, color: "#a1a1aa", marginTop: 16 }}>
          Senior Full-Stack Engineer · Distributed Systems · Cloud &amp; AI
        </div>
        <div style={{ display: "flex", marginTop: 56, gap: 12 }}>
          {["Kafka", "Redis", "PostgreSQL", "WebSockets", "AWS"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 20,
                color: "#a1a1aa",
                border: "1px solid #27272a",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
