import { Tables } from "./database.types";

export type Client = Tables<"client">;
export type Whatsapp = Tables<"whatsapp">;
export type Link = Tables<"link">;
export type Chatbot = Tables<"chatbot">;

export type ClientUpdate = Client &
  Whatsapp & {
    whatsappId: string;
    logoFile?: {
      name: string;
      type: string;
      size: number;
      arrayBuffer: () => Promise<ArrayBuffer>;
    } | null;
  };
