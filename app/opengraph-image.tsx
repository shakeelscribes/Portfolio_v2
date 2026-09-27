import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "Mohamed Shakeel, GenAI and LLM Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const fontData = await readFile(
    path.join(process.cwd(), "public/fonts/clash-display-600.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          padding: 72,
          fontFamily: "Clash",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#ccf544",
            }}
          />
          <div
            style={{
              color: "#a2a2aa",
              fontSize: 26,
              fontWeight: 500,
              letterSpacing: 1,
            }}
          >
            Open to full-time roles
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#f2f2ef",
              fontSize: 104,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Mohamed Shakeel
          </div>
          <div
            style={{
              color: "#ccf544",
              fontSize: 44,
              fontWeight: 600,
              marginTop: 12,
            }}
          >
            GenAI &amp; LLM Engineer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#66666e",
            fontSize: 26,
          }}
        >
          <div>ahamedshakeel2005@gmail.com</div>
          <div>github.com/shakeelscribes</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Clash",
          data: fontData,
          weight: 600,
          style: "normal",
        },
      ],
    },
  );
}
