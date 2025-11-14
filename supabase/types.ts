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
      drafts: {
        Row: {
          author_uuid: string
          content: string
          id: number
          timestamp: string
          title: string | null
        }
        Insert: {
          author_uuid: string
          content: string
          id?: number
          timestamp?: string
          title?: string | null
        }
        Update: {
          author_uuid?: string
          content?: string
          id?: number
          timestamp?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drafts_author_uuid_fkey"
            columns: ["author_uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          id: string
          post: number
          timestamp: string
          user_uuid: string
        }
        Insert: {
          id?: string
          post?: number
          timestamp?: string
          user_uuid?: string
        }
        Update: {
          id?: string
          post?: number
          timestamp?: string
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_fkey"
            columns: ["post"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_uuid: string | null
          content: string
          id: number
          timestamp: string
          title: string | null
          score: number | null
        }
        Insert: {
          author_uuid?: string | null
          content: string
          id?: number
          timestamp?: string
          title?: string | null
        }
        Update: {
          author_uuid?: string | null
          content?: string
          id?: number
          timestamp?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_uuid_fkey"
            columns: ["author_uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          anniversary: Database["public"]["CompositeTypes"]["birth_date"] | null
          avatar: string
          bio: string
          created_at: string
          display_name: string | null
          gender: Database["public"]["Enums"]["user_gender"] | null
          id: string
          username: string
          finesse: number
        }
        Insert: {
          anniversary?:
            | Database["public"]["CompositeTypes"]["birth_date"]
            | null
          avatar: string
          bio?: string
          created_at?: string
          display_name?: string | null
          gender?: Database["public"]["Enums"]["user_gender"] | null
          id: string
          username: string
        }
        Update: {
          anniversary?:
            | Database["public"]["CompositeTypes"]["birth_date"]
            | null
          avatar?: string
          bio?: string
          created_at?: string
          display_name?: string | null
          gender?: Database["public"]["Enums"]["user_gender"] | null
          id?: string
          username?: string
        }
        Relationships: []
      }
      saves: {
        Row: {
          id: string
          post: number
          timestamp: string
          user_uuid: string
        }
        Insert: {
          id?: string
          post?: number
          timestamp?: string
          user_uuid?: string
        }
        Update: {
          id?: string
          post?: number
          timestamp?: string
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "saves_post_fkey"
            columns: ["post"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saves_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      super_likes: {
        Row: {
          id: string
          post: number
          redacted: boolean
          timestamp: string
          user_uuid: string
        }
        Insert: {
          id?: string
          post?: number
          redacted?: boolean
          timestamp?: string
          user_uuid?: string
        }
        Update: {
          id?: string
          post?: number
          redacted?: boolean
          timestamp?: string
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "super_likes_post_fkey"
            columns: ["post"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "super_likes_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users_meta: {
        Row: {
          badges: Database["public"]["Enums"]["badge"][]
          id: string
        }
        Insert: {
          badges?: Database["public"]["Enums"]["badge"][]
          id?: string
        }
        Update: {
          badges?: Database["public"]["Enums"]["badge"][]
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_meta_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      finesse: {
        Args: { "": Database["public"]["Tables"]["profiles"]["Row"] }
        Returns: {
          error: true
        } & "the function public.finesse with parameter or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache"
      }
      get_username: { Args: never; Returns: string }
      is_confirmed: { Args: { id: string }; Returns: boolean }
      score: {
        Args: { "": Database["public"]["Tables"]["posts"]["Row"] }
        Returns: {
          error: true
        } & "the function public.score with parameter or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache"
      }
      to_unix: { Args: { stamp: string }; Returns: number }
    }
    Enums: {
      badge: "special"
      interaction_type: "dislike" | "seen" | "like"
      user_gender: "male" | "female" | "toaster"
    }
    CompositeTypes: {
      birth_date: {
        d: number
        m: number
      }
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
    Enums: {
      badge: ["special"],
      interaction_type: ["dislike", "seen", "like"],
      user_gender: ["male", "female", "toaster"],
    },
  },
} as const
