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
          score: number
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
      get_username: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_confirmed: {
        Args: {
          id: string
        }
        Returns: boolean
      }
      score: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      to_unix: {
        Args: {
          stamp: string
        }
        Returns: number
      }
    }
    Enums: {
      badge: "special"
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
