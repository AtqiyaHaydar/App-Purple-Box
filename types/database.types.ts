export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chatbot: {
        Row: {
          additional_prompt: string | null
          client_id: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          additional_prompt?: string | null
          client_id: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          additional_prompt?: string | null
          client_id?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      client: {
        Row: {
          additional_information_url: string | null
          additional_informations: Json | null
          address: string | null
          created_at: string
          custom_domain: string | null
          human_contact: string | null
          id: string
          image_url: string | null
          name: string
          platform: string
          platform_informations: Json | null
          store: string | null
        }
        Insert: {
          additional_information_url?: string | null
          additional_informations?: Json | null
          address?: string | null
          created_at?: string
          custom_domain?: string | null
          human_contact?: string | null
          id?: string
          image_url?: string | null
          name: string
          platform: string
          platform_informations?: Json | null
          store?: string | null
        }
        Update: {
          additional_information_url?: string | null
          additional_informations?: Json | null
          address?: string | null
          created_at?: string
          custom_domain?: string | null
          human_contact?: string | null
          id?: string
          image_url?: string | null
          name?: string
          platform?: string
          platform_informations?: Json | null
          store?: string | null
        }
        Relationships: []
      }
      customer: {
        Row: {
          client_id: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_channel: {
        Row: {
          conversation: Json | null
          created_at: string
          credential_id: string
          customer_id: string | null
          id: string
          platform: string
        }
        Insert: {
          conversation?: Json | null
          created_at?: string
          credential_id: string
          customer_id?: string | null
          id?: string
          platform: string
        }
        Update: {
          conversation?: Json | null
          created_at?: string
          credential_id?: string
          customer_id?: string | null
          id?: string
          platform?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_channel_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_detail: {
        Row: {
          category: string
          channel_id: string
          created_at: string
          id: string
          language: string | null
          note: string | null
          redirect_link: string | null
          resolved: boolean
          status: string | null
          sub_category: string | null
          updated_at: string | null
          urgency: string | null
        }
        Insert: {
          category: string
          channel_id: string
          created_at?: string
          id?: string
          language?: string | null
          note?: string | null
          redirect_link?: string | null
          resolved?: boolean
          status?: string | null
          sub_category?: string | null
          updated_at?: string | null
          urgency?: string | null
        }
        Update: {
          category?: string
          channel_id?: string
          created_at?: string
          id?: string
          language?: string | null
          note?: string | null
          redirect_link?: string | null
          resolved?: boolean
          status?: string | null
          sub_category?: string | null
          updated_at?: string | null
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_detail_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: true
            referencedRelation: "customer_channel"
            referencedColumns: ["id"]
          },
        ]
      }
      google_sheet: {
        Row: {
          client_id: string
          created_at: string
          custom_sheet_id: string | null
          id: number
          official_sheet_id: string | null
        }
        Insert: {
          client_id: string
          created_at?: string
          custom_sheet_id?: string | null
          id?: number
          official_sheet_id?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          custom_sheet_id?: string | null
          id?: number
          official_sheet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "google_sheet_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram: {
        Row: {
          client_id: string
          created_at: string
          data_access_expired_at: string | null
          id: number
          instagram_id: string
          instagram_username: string | null
          page_access_token: string | null
        }
        Insert: {
          client_id: string
          created_at?: string
          data_access_expired_at?: string | null
          id?: number
          instagram_id: string
          instagram_username?: string | null
          page_access_token?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          data_access_expired_at?: string | null
          id?: number
          instagram_id?: string
          instagram_username?: string | null
          page_access_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instagram_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      link: {
        Row: {
          client_id: string
          created_at: string
          id: string
          link_type: string
          locale: string | null
          url: string | null
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          link_type: string
          locale?: string | null
          url?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          link_type?: string
          locale?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "link_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          client_id: string
          created_at: string
          email: string
          id: string
          name: string | null
        }
        Insert: {
          client_id?: string
          created_at?: string
          email: string
          id: string
          name?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp: {
        Row: {
          about: string | null
          client_id: string
          created_at: string
          description: string | null
          id: number
          image_url: string | null
          number: string | null
          prefilled_message: string | null
          sid: string | null
          updated_at: string
          vertical: string | null
        }
        Insert: {
          about?: string | null
          client_id: string
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          number?: string | null
          prefilled_message?: string | null
          sid?: string | null
          updated_at?: string
          vertical?: string | null
        }
        Update: {
          about?: string | null
          client_id?: string
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          number?: string | null
          prefilled_message?: string | null
          sid?: string | null
          updated_at?: string
          vertical?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_client:
        | {
            Args: {
              p_name?: string
              p_store?: string
              p_platform?: string
              p_platform_informations?: Json
            }
            Returns: string
          }
        | {
            Args: {
              p_name?: string
              p_store?: string
              p_platform_informations?: Json
            }
            Returns: string
          }
      get_client_by_identifier: {
        Args: {
          p_id?: string
          p_store?: string
          p_whatsapp?: string
          p_name?: string
          p_instagram_id?: string
        }
        Returns: {
          id: string
          name: string
          store: string
          custom_domain: string
          address: string
          additional_informations: Json
          platform: string
          platform_informations: Json
          additional_information_url: string
          human_contact: string
          created_at: string
          links: Json
          chatbot: Json
          google_sheet: Json
          instagram: Json
          whatsapp: Json
        }[]
      }
      get_customer_by_credential_id: {
        Args: {
          p_credential_id: string
        }
        Returns: Json
      }
      insert_customer_data: {
        Args: {
          p_client_id: string
          p_platform: string
          p_credential_id: string
          p_conversations: Json
        }
        Returns: undefined
      }
      update_client: {
        Args: {
          p_client_id: string
          p_name?: string
          p_store?: string
          p_custom_domain?: string
          p_address?: string
          p_additional_information?: Json
          p_trial?: boolean
          p_vertical?: string
          p_image_url?: string
          p_platform?: string
          p_platform_informations?: Json
          p_whatsapp_sid?: string
          p_whatsapp?: string
          p_additional_information_url?: string
          p_human_contact?: string
          p_whatsapp_about?: string
          p_whatsapp_prefilled?: string
        }
        Returns: string
      }
      upsert_chatbot: {
        Args: {
          p_client_id: string
          p_name?: string
          p_description?: string
          p_additional_prompt?: string
        }
        Returns: string
      }
      upsert_google_sheet: {
        Args: {
          p_client_id: string
          p_official_sheet_id?: string
          p_custom_sheet_id?: string
        }
        Returns: string
      }
      upsert_instagram: {
        Args: {
          p_client_id: string
          p_instagram_id?: string
          p_page_access_token?: string
          p_data_access_expired_at?: string
        }
        Returns: string
      }
      upsert_link: {
        Args: {
          p_client_id: string
          p_link_type?: string
          p_locale?: string
          p_url?: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
