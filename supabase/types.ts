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
          author: string | null
          author_uuid: string | null
          content: string
          id: number
          timestamp: string
          title: string | null
        }
        Insert: {
          author?: string | null
          author_uuid?: string | null
          content: string
          id?: number
          timestamp?: string
          title?: string | null
        }
        Update: {
          author?: string | null
          author_uuid?: string | null
          content?: string
          id?: number
          timestamp?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drafts_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["identifier"]
          },
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
          post: number
          timestamp: string
          user: string
          user_uuid: string | null
          uuid: string
        }
        Insert: {
          post?: number
          timestamp?: string
          user: string
          user_uuid?: string | null
          uuid?: string
        }
        Update: {
          post?: number
          timestamp?: string
          user?: string
          user_uuid?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_id_fkey"
            columns: ["post"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_post_fkey"
            columns: ["post"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["identifier"]
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
          author: string | null
          author_uuid: string | null
          content: string
          id: number
          timestamp: string
          title: string | null
        }
        Insert: {
          author?: string | null
          author_uuid?: string | null
          content: string
          id?: number
          timestamp?: string
          title?: string | null
        }
        Update: {
          author?: string | null
          author_uuid?: string | null
          content?: string
          id?: number
          timestamp?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["identifier"]
          },
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
          avatar: string
          bio: string
          created_at: string
          display_name: string | null
          id: string
          identifier: string
          username: string
          username_displayname: string | null
        }
        Insert: {
          avatar: string
          bio?: string
          created_at?: string
          display_name?: string | null
          id: string
          identifier: string
          username: string
        }
        Update: {
          avatar?: string
          bio?: string
          created_at?: string
          display_name?: string | null
          id?: string
          identifier?: string
          username?: string
        }
        Relationships: []
      }
      saves: {
        Row: {
          post: number
          timestamp: string
          user: string
          user_uuid: string | null
          uuid: string
        }
        Insert: {
          post?: number
          timestamp?: string
          user: string
          user_uuid?: string | null
          uuid?: string
        }
        Update: {
          post?: number
          timestamp?: string
          user?: string
          user_uuid?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["identifier"]
          },
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_confirmed: {
        Args: {
          id: string
        }
        Returns: boolean
      }
      saved_posts: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>
      }
      username_displayname: {
        Args: {
          "": unknown
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
