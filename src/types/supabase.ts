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
      Flags: {
        Row: {
          created_at: string
          description: string | null
          id: number
          issue: string | null
          question_id: number | null
          resolved: boolean | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          issue?: string | null
          question_id?: number | null
          resolved?: boolean | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          issue?: string | null
          question_id?: number | null
          resolved?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Flags_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "Questions"
            referencedColumns: ["id"]
          },
        ]
      }
      Questions: {
        Row: {
          category: string | null
          created_at: string
          duration: number | null
          id: number
          question: string | null
          special: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          duration?: number | null
          id?: number
          question?: string | null
          special?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          duration?: number | null
          id?: number
          question?: string | null
          special?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      Users: {
        Row: {
          admin: boolean | null
          created_at: string
          email: string | null
          first_name: string | null
          id: number
          image_url: string | null
          last_active_at: string | null
          last_name: string | null
          last_sign_in_at: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          admin?: boolean | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          image_url?: string | null
          last_active_at?: string | null
          last_name?: string | null
          last_sign_in_at?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          admin?: boolean | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          image_url?: string | null
          last_active_at?: string | null
          last_name?: string | null
          last_sign_in_at?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
