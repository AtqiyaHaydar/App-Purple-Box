"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { Link } from "@/types/Form";
import { revalidatePath } from "next/cache";

export async function getLinks() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("link")
    .select("*")
    .eq("client_id", user?.user_metadata.client_id);

  const { data: clientData } = await supabase
    .from("client")
    .select("store")
    .eq("id", user?.user_metadata.client_id)
    .single();

  const { data: chatbotData } = await supabase
    .from("chatbot")
    .select("*")
    .eq("client_id", user?.user_metadata.client_id)
    .single();

  if (error) throw error;
  return { ...chatbotData, store: clientData?.store, links: [...data] };
}

export async function updateLinks(formData: {
  links: Partial<Link>[];
  additionalPrompt: string;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const clientId = user?.user_metadata.client_id;
  formData.links.map(async (link) => {
    if (link.link_type !== "" && link.locale !== "" && link.url !== "") {
      await supabase.from("link").upsert({
        client_id: clientId,
        link_type: link.link_type,
        locale: link.locale,
        url: link.url,
      });
    }
  });

  if (formData.additionalPrompt !== "") {
    await supabase
      .from("chatbot")
      .update({
        additional_prompt: formData.additionalPrompt,
      })
      .eq("client_id", clientId);
  }
}

export async function deleteLink(id: string) {
  const supabase = await createSupabaseServerClient();

  try {
    const { error } = await supabase.from("link").delete().eq("id", id);

    if (error) throw error;
    revalidatePath("/dashboard/customizations/links-and-prompts");
  } catch (error) {
    throw error;
  }
}
