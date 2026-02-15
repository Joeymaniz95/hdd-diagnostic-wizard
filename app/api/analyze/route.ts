import { NextResponse } from "next/server";

export const runtime = "nodejs";

type AnalyzeRequest = {
  uploadUrl?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as AnalyzeRequest;

  if (!body.uploadUrl || typeof body.uploadUrl !== "string") {
    return NextResponse.json({ ok: false, error: "uploadUrl is required." }, { status: 400 });
  }

  return NextResponse.json({
    screenType: "unknown",
    confidence: 0.5,
    signals: {
      smartHealth: "unknown",
      warnings: [],
    },
  });
}
