import createSupabaseServerClient from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const formData = await request.formData();
    const file = formData.get("file") as File;

    const apiFormData = new FormData();
    apiFormData.append("file", file);

    const response = await fetch(
      "https://d48b-2001-448a-50a0-8175-e98a-8f86-bc5e-54f9.ngrok-free.app/api/client",
      {
        method: "POST",
        body: apiFormData,
        headers: {
          Cookie: request.headers.get("cookie") || "",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
