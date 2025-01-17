"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { ClientUpdate } from "@/types/Form";
import { revalidatePath } from "next/cache";

export async function getClient() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("client")
    .select("*")
    .eq("id", user?.user_metadata.client_id)
    .single();

  const { data: chatbotData } = await supabase
    .from("chatbot")
    .select("*")
    .eq("client_id", user?.user_metadata.client_id)
    .single();

  const { data: whatsappData } = await supabase
    .from("whatsapp")
    .select("*")
    .eq("client_id", user?.user_metadata.client_id)
    .single();

  if (error) throw error;
  return { ...data, ...chatbotData, ...whatsappData };
}

interface WhatsappFields {
  prefilled_message?: string;
  about?: string;
  vertical?: string;
}

async function deleteOldLogo(oldImageUrl: string) {
  const supabase = await createSupabaseServerClient();
  const path = oldImageUrl.split("/").slice(-2).join("/"); // Get path from URL

  const { error } = await supabase.storage.from("logos").remove([path]);

  if (error) console.error("Error deleting old logo:", error);
}

async function uploadLogo(file: File, clientId: string) {
  const supabase = await createSupabaseServerClient();
  console.log("step 1");
  const fileExt = file.name.split(".").pop();
  const fileName = `${clientId}/logo-${Date.now()}.${fileExt}`;
  console.log("step 2");

  const { error: uploadError } = await supabase.storage
    .from("logos")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });
  console.log("step 3");

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("logos").getPublicUrl(fileName);

  return publicUrl;
}

export async function updateClient(
  formData: Partial<ClientUpdate>,
  file?: FormData
) {
  const supabase = await createSupabaseServerClient();

  const logoFile = file?.get("logoFile") as File | null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { prefilled_message, about, vertical, name, ...clientData } = formData;

  console.log("form data", clientData);

  try {
    // Handle logo upload if present
    if (logoFile) {
      // Get current logo URL
      const { data: currentData } = await supabase
        .from("client")
        .select("image_url")
        .eq("id", user?.user_metadata.client_id)
        .single();

      // Delete old logo if exists
      if (currentData?.image_url) {
        await deleteOldLogo(currentData.image_url);
      }

      const logoUrl = await uploadLogo(logoFile, user?.user_metadata.client_id);
      clientData.image_url = logoUrl;
    }

    const whatsappData: WhatsappFields = {
      ...(prefilled_message && { prefilled_message }),
      ...(about && { about }),
      ...(vertical && { vertical }),
    };

    if (name) {
      const { error: chatbotError } = await supabase
        .from("chatbot")
        .update({
          name,
        })
        .eq("client_id", user?.user_metadata.client_id);

      if (chatbotError) throw chatbotError;
    }

    if (Object.keys(clientData).length > 0) {
      const { error: clientError } = await supabase
        .from("client")
        .update(clientData)
        .eq("id", user?.user_metadata.client_id);

      if (clientError) throw clientError;
    }

    if (Object.keys(whatsappData).length > 0) {
      const { error: whatsappError, status } = await supabase
        .from("whatsapp")
        .update(whatsappData)
        .eq("client_id", user?.user_metadata.client_id);

      if (whatsappError) throw whatsappError;
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : "");
  }
}

export async function deleteClient(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("client").delete().eq("id", id);

  if (error) throw error;
  revalidatePath("/dashboard/customizations/company-info");
}
