"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadFile(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const file = formData.get("file") as File;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fileName = `${user?.user_metadata.client_id}/${file.name}`;

  const { data, error } = await supabase.storage
    .from("additional-info")
    .upload(fileName, file);

  if (error) throw error;

  await supabase.from("client_files").insert({
    client_id: user?.user_metadata.client_id,
    file_name: file.name,
    file_path: data?.path,
  });

  revalidatePath("/dashboard/customizations/additional-info");
  return data;
}
