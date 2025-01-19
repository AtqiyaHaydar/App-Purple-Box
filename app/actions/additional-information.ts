"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function uploadFile(formData: FormData) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const cookieStore = cookies();

    const response = await fetch(
      `${process.env.NEXT_CHATBOT_BACKEND_URL}/api/client`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Cookie: cookieStore.toString(),
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    revalidatePath("/dashboard/customizations/additional-info");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteFile(index: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const cookieStore = cookies();

    const response = await fetch(
      `${process.env.NEXT_CHATBOT_BACKEND_URL}/api/client/additional-information?index=${index}`,
      {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

    if (!response.ok) {
      console.log("fail to delete", response);
      throw new Error("Delete failed");
    }

    const data = await response.json();
    revalidatePath("/dashboard/customizations/additional-info");
    return data;
  } catch (error) {
    console.error(error);
  }
}
