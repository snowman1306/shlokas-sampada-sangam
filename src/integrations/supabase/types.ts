export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          city: string | null
          created_at: string | null
          date_of_birth: string | null
          id: string
          name: string | null
          state: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          id: string
          name?: string | null
          state?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          id?: string
          name?: string | null
          state?: string | null
        }
        Relationships: []
      },
      shlokas: {
        Row: {
          id: string;
          text: string;
          transliteration?: string | null;
          meaning?: string | null;
          source?: string | null;
          category_id?: string | null;
          created_by: string;
          is_public: boolean;
          created_at?: string | null;
        };
        Insert: {
          id?: string;
          text: string;
          transliteration?: string | null;
          meaning?: string | null;
          source?: string | null;
          category_id?: string | null;
          created_by: string;
          is_public?: boolean;
          created_at?: string | null;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["shlokas"]["Row"], "id">> & { id: string };
        Relationships: [];
      },
      categories: {
        Row: {
          id: string;
          name: string;
          description?: string | null;
          created_by: string;
          created_at?: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_by: string;
          created_at?: string | null;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["categories"]["Row"], "id">> & { id: string };
        Relationships: [];
      },
      translations: {
        Row: {
          id: string;
          shloka_id: string;
          language: string;
          translation: string;
          created_by: string;
          created_at?: string | null;
        };
        Insert: {
          id?: string;
          shloka_id: string;
          language: string;
          translation: string;
          created_by: string;
          created_at?: string | null;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["translations"]["Row"], "id">> & { id: string };
        Relationships: [];
      },
      weather_data: {
        Row: {
          id: string;
          city: string;
          temperature: number;
          conditions: string;
          humidity: number;
          wind_speed: number;
          created_at?: string | null;
        };
        Insert: {
          id?: string;
          city: string;
          temperature: number;
          conditions: string;
          humidity: number;
          wind_speed: number;
          created_at?: string | null;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["weather_data"]["Row"], "id">> & { id: string };
        Relationships: [];
      },
      government_policies: {
        Row: {
          id: string;
          title: string;
          description: string;
          language: string;
          is_active: boolean;
          published_date: string;
          created_at?: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          language: string;
          is_active?: boolean;
          published_date: string;
          created_at?: string | null;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["government_policies"]["Row"], "id">> & { id: string };
        Relationships: [];
      },
      chat_messages: {
        Row: {
          id: string;
          user_id: string;
          message: string;
          message_type: string;
          media_url?: string | null;
          created_at?: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          message: string;
          message_type: string;
          media_url?: string | null;
          created_at?: string | null;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["chat_messages"]["Row"], "id">> & { id: string };
        Relationships: [];
      },
      favorites: {
        Row: {
          id: string;
          shloka_id: string;
          user_id: string;
          created_at?: string | null;
        };
        Insert: {
          id?: string;
          shloka_id: string;
          user_id: string;
          created_at?: string | null;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["favorites"]["Row"], "id">> & { id: string };
        Relationships: [];
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_shloka_with_translations: {
        Args: { p_shloka_id: string };
        Returns: any;
      };
      update_weather_data: {
        Args: { p_city: string; p_temperature: number; p_conditions: string; p_humidity: number; p_wind_speed: number };
        Returns: any;
      };
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
