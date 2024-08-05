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
      admissionform: {
        Row: {
          address: string
          Board: string
          created_at: string
          email: string
          id: number
          instituteid: string
          medium: string
          mobilenumber: number
          name: string
          percentage: string
          standard: string | null
          stream: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          Board: string
          created_at?: string
          email: string
          id?: number
          instituteid: string
          medium: string
          mobilenumber: number
          name: string
          percentage: string
          standard?: string | null
          stream?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          Board?: string
          created_at?: string
          email?: string
          id?: number
          instituteid?: string
          medium?: string
          mobilenumber?: number
          name?: string
          percentage?: string
          standard?: string | null
          stream?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      banneradview: {
        Row: {
          click: number | null
          created_at: string
          id: number
          user_id: string
          view: number | null
        }
        Insert: {
          click?: number | null
          created_at?: string
          id?: number
          user_id: string
          view?: number | null
        }
        Update: {
          click?: number | null
          created_at?: string
          id?: number
          user_id?: string
          view?: number | null
        }
        Relationships: []
      }
      coaching: {
        Row: {
          Board: string | null
          city: string | null
          coachingname: string
          discription: string | null
          email: string | null
          id: number
          img: string | null
          location: string | null
          locationlink: string | null
          medium: string | null
          mobile: number | null
          ratingofcoaching: string | null
          Standard: string | null
          State: string | null
          stream: string | null
          subdistrict: string | null
          user_id: string
          videolink: string | null
          view: number | null
          website: string | null
        }
        Insert: {
          Board?: string | null
          city?: string | null
          coachingname: string
          discription?: string | null
          email?: string | null
          id?: number
          img?: string | null
          location?: string | null
          locationlink?: string | null
          medium?: string | null
          mobile?: number | null
          ratingofcoaching?: string | null
          Standard?: string | null
          State?: string | null
          stream?: string | null
          subdistrict?: string | null
          user_id: string
          videolink?: string | null
          view?: number | null
          website?: string | null
        }
        Update: {
          Board?: string | null
          city?: string | null
          coachingname?: string
          discription?: string | null
          email?: string | null
          id?: number
          img?: string | null
          location?: string | null
          locationlink?: string | null
          medium?: string | null
          mobile?: number | null
          ratingofcoaching?: string | null
          Standard?: string | null
          State?: string | null
          stream?: string | null
          subdistrict?: string | null
          user_id?: string
          videolink?: string | null
          view?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coaching_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contactus: {
        Row: {
          created_at: string
          Email: string | null
          id: number
          Message: string | null
          Name: string | null
          Subject: string | null
        }
        Insert: {
          created_at?: string
          Email?: string | null
          id?: number
          Message?: string | null
          Name?: string | null
          Subject?: string | null
        }
        Update: {
          created_at?: string
          Email?: string | null
          id?: number
          Message?: string | null
          Name?: string | null
          Subject?: string | null
        }
        Relationships: []
      }
      exams: {
        Row: {
          Board: string | null
          city: string | null
          discription: string
          email: string | null
          examsname: string
          id: number
          img: string | null
          location: string | null
          locationlink: string | null
          medium: string | null
          mobile: string | null
          Standard: string | null
          State: string | null
          stream: string | null
          subdistrict: string | null
          user_id: string
          videolink: string | null
          view: number | null
          website: string | null
        }
        Insert: {
          Board?: string | null
          city?: string | null
          discription: string
          email?: string | null
          examsname: string
          id?: never
          img?: string | null
          location?: string | null
          locationlink?: string | null
          medium?: string | null
          mobile?: string | null
          Standard?: string | null
          State?: string | null
          stream?: string | null
          subdistrict?: string | null
          user_id: string
          videolink?: string | null
          view?: number | null
          website?: string | null
        }
        Update: {
          Board?: string | null
          city?: string | null
          discription?: string
          email?: string | null
          examsname?: string
          id?: never
          img?: string | null
          location?: string | null
          locationlink?: string | null
          medium?: string | null
          mobile?: string | null
          Standard?: string | null
          State?: string | null
          stream?: string | null
          subdistrict?: string | null
          user_id?: string
          videolink?: string | null
          view?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exams_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      marketingDetails: {
        Row: {
          Board: string | null
          created_at: string
          District: string | null
          exam: string | null
          id: number
          img: string | null
          medium: string | null
          mobile: number
          name: string
          paid: boolean | null
          redirecturl: string | null
          Standard: string | null
          State: string | null
          user_id: string | null
          videolink: string
        }
        Insert: {
          Board?: string | null
          created_at?: string
          District?: string | null
          exam?: string | null
          id?: number
          img?: string | null
          medium?: string | null
          mobile: number
          name: string
          paid?: boolean | null
          redirecturl?: string | null
          Standard?: string | null
          State?: string | null
          user_id?: string | null
          videolink: string
        }
        Update: {
          Board?: string | null
          created_at?: string
          District?: string | null
          exam?: string | null
          id?: number
          img?: string | null
          medium?: string | null
          mobile?: number
          name?: string
          paid?: boolean | null
          redirecturl?: string | null
          Standard?: string | null
          State?: string | null
          user_id?: string | null
          videolink?: string
        }
        Relationships: []
      }
      marketingDetailsIndustry: {
        Row: {
          Board: string | null
          created_at: string
          id: number
          img: string | null
          medium: string | null
          paid: boolean | null
          redirecturl: string
          Standard: string | null
          State: string | null
          user_id: string | null
          videolink: string
        }
        Insert: {
          Board?: string | null
          created_at?: string
          id?: number
          img?: string | null
          medium?: string | null
          paid?: boolean | null
          redirecturl: string
          Standard?: string | null
          State?: string | null
          user_id?: string | null
          videolink: string
        }
        Update: {
          Board?: string | null
          created_at?: string
          id?: number
          img?: string | null
          medium?: string | null
          paid?: boolean | null
          redirecturl?: string
          Standard?: string | null
          State?: string | null
          user_id?: string | null
          videolink?: string
        }
        Relationships: []
      }
      onlineform: {
        Row: {
          app: string | null
          Board: string | null
          coachingname: string
          discription: string | null
          email: string | null
          id: number
          img: string | null
          link: string | null
          medium: string | null
          mobile: number | null
          ratingofcoaching: string | null
          Standard: string[] | null
          State: string | null
          stream: string | null
          user_id: string
          videolink: string | null
          view: number | null
          website: string | null
        }
        Insert: {
          app?: string | null
          Board?: string | null
          coachingname: string
          discription?: string | null
          email?: string | null
          id?: number
          img?: string | null
          link?: string | null
          medium?: string | null
          mobile?: number | null
          ratingofcoaching?: string | null
          Standard?: string[] | null
          State?: string | null
          stream?: string | null
          user_id: string
          videolink?: string | null
          view?: number | null
          website?: string | null
        }
        Update: {
          app?: string | null
          Board?: string | null
          coachingname?: string
          discription?: string | null
          email?: string | null
          id?: number
          img?: string | null
          link?: string | null
          medium?: string | null
          mobile?: number | null
          ratingofcoaching?: string | null
          Standard?: string[] | null
          State?: string | null
          stream?: string | null
          user_id?: string
          videolink?: string | null
          view?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coaching_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      School: {
        Row: {
          Board: string[] | null
          discription: string
          DISE: string | null
          District: string | null
          email: string | null
          exam: string | null
          id: number
          img: string
          location: string | null
          locationlink: string | null
          medium: string[] | null
          mobile1: number | null
          ratingofschool: string | null
          schoolname: string
          Standard: string[] | null
          State: string | null
          studentnumber: string | null
          subdistrict: string | null
          user_id: string
          videolink: string | null
          view: number | null
          website: string | null
        }
        Insert: {
          Board?: string[] | null
          discription: string
          DISE?: string | null
          District?: string | null
          email?: string | null
          exam?: string | null
          id?: number
          img?: string
          location?: string | null
          locationlink?: string | null
          medium?: string[] | null
          mobile1?: number | null
          ratingofschool?: string | null
          schoolname: string
          Standard?: string[] | null
          State?: string | null
          studentnumber?: string | null
          subdistrict?: string | null
          user_id: string
          videolink?: string | null
          view?: number | null
          website?: string | null
        }
        Update: {
          Board?: string[] | null
          discription?: string
          DISE?: string | null
          District?: string | null
          email?: string | null
          exam?: string | null
          id?: number
          img?: string
          location?: string | null
          locationlink?: string | null
          medium?: string[] | null
          mobile1?: number | null
          ratingofschool?: string | null
          schoolname?: string
          Standard?: string[] | null
          State?: string | null
          studentnumber?: string | null
          subdistrict?: string | null
          user_id?: string
          videolink?: string | null
          view?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "School_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      schoolDemo: {
        Row: {
          created_at: string
          discription: string | null
          id: number
          Standard: string | null
          subject: string | null
          Teachername: string | null
          user_id: string | null
          videolink: string | null
        }
        Insert: {
          created_at?: string
          discription?: string | null
          id?: number
          Standard?: string | null
          subject?: string | null
          Teachername?: string | null
          user_id?: string | null
          videolink?: string | null
        }
        Update: {
          created_at?: string
          discription?: string | null
          id?: number
          Standard?: string | null
          subject?: string | null
          Teachername?: string | null
          user_id?: string | null
          videolink?: string | null
        }
        Relationships: []
      }
      skillclass: {
        Row: {
          city: string | null
          discription: string | null
          email: string | null
          id: number
          img: string | null
          location: string | null
          locationlink: string | null
          mobile: number | null
          ratingofskillclass: string | null
          skillclassname: string
          skilltype: string
          State: string | null
          subdistrict: string | null
          user_id: string
          videolink: string | null
          view: number | null
          website: string | null
        }
        Insert: {
          city?: string | null
          discription?: string | null
          email?: string | null
          id?: number
          img?: string | null
          location?: string | null
          locationlink?: string | null
          mobile?: number | null
          ratingofskillclass?: string | null
          skillclassname: string
          skilltype: string
          State?: string | null
          subdistrict?: string | null
          user_id: string
          videolink?: string | null
          view?: number | null
          website?: string | null
        }
        Update: {
          city?: string | null
          discription?: string | null
          email?: string | null
          id?: number
          img?: string | null
          location?: string | null
          locationlink?: string | null
          mobile?: number | null
          ratingofskillclass?: string | null
          skillclassname?: string
          skilltype?: string
          State?: string | null
          subdistrict?: string | null
          user_id?: string
          videolink?: string | null
          view?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skillclass_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Student: {
        Row: {
          Board: string | null
          city: string | null
          Coins: number | null
          created_at: string
          email: string | null
          exam: string | null
          id: number
          medium: string | null
          name: string | null
          Standard: string | null
          standardcategory: string | null
          State: string | null
          subDistrict: string | null
          user_id: string
        }
        Insert: {
          Board?: string | null
          city?: string | null
          Coins?: number | null
          created_at?: string
          email?: string | null
          exam?: string | null
          id?: number
          medium?: string | null
          name?: string | null
          Standard?: string | null
          standardcategory?: string | null
          State?: string | null
          subDistrict?: string | null
          user_id: string
        }
        Update: {
          Board?: string | null
          city?: string | null
          Coins?: number | null
          created_at?: string
          email?: string | null
          exam?: string | null
          id?: number
          medium?: string | null
          name?: string | null
          Standard?: string | null
          standardcategory?: string | null
          State?: string | null
          subDistrict?: string | null
          user_id?: string
        }
        Relationships: []
      }
      vedAI: {
        Row: {
          city: string
          created_at: string
          email: string
          id: number
          mobile: string
          name: string
          standardcategory: string
          State: string
        }
        Insert: {
          city: string
          created_at?: string
          email: string
          id?: number
          mobile: string
          name: string
          standardcategory: string
          State: string
        }
        Update: {
          city?: string
          created_at?: string
          email?: string
          id?: number
          mobile?: string
          name?: string
          standardcategory?: string
          State?: string
        }
        Relationships: []
      }
      viewcoaching: {
        Row: {
          created_at: string
          demolecturesView: number | null
          id: number
          user_id: string
          view: number | null
        }
        Insert: {
          created_at?: string
          demolecturesView?: number | null
          id?: number
          user_id: string
          view?: number | null
        }
        Update: {
          created_at?: string
          demolecturesView?: number | null
          id?: number
          user_id?: string
          view?: number | null
        }
        Relationships: []
      }
      viewexams: {
        Row: {
          banneradviews: number | null
          cadview: number | null
          created_at: string
          demolecturesView: number | null
          id: number
          user_id: string
          view: number | null
        }
        Insert: {
          banneradviews?: number | null
          cadview?: number | null
          created_at?: string
          demolecturesView?: number | null
          id?: never
          user_id: string
          view?: number | null
        }
        Update: {
          banneradviews?: number | null
          cadview?: number | null
          created_at?: string
          demolecturesView?: number | null
          id?: never
          user_id?: string
          view?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "viewexams_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      viewonline: {
        Row: {
          created_at: string
          demolecturesView: number | null
          id: number
          user_id: string
          view: number | null
        }
        Insert: {
          created_at?: string
          demolecturesView?: number | null
          id?: number
          user_id: string
          view?: number | null
        }
        Update: {
          created_at?: string
          demolecturesView?: number | null
          id?: number
          user_id?: string
          view?: number | null
        }
        Relationships: []
      }
      viewschool: {
        Row: {
          banneradviews: number | null
          cadview: number | null
          created_at: string
          demolecturesView: number | null
          id: number
          user_id: string
          view: number | null
        }
        Insert: {
          banneradviews?: number | null
          cadview?: number | null
          created_at?: string
          demolecturesView?: number | null
          id?: number
          user_id: string
          view?: number | null
        }
        Update: {
          banneradviews?: number | null
          cadview?: number | null
          created_at?: string
          demolecturesView?: number | null
          id?: number
          user_id?: string
          view?: number | null
        }
        Relationships: []
      }
      viewskill: {
        Row: {
          created_at: string
          demolecturesView: number | null
          id: number
          user_id: string
          view: number | null
        }
        Insert: {
          created_at?: string
          demolecturesView?: number | null
          id?: number
          user_id: string
          view?: number | null
        }
        Update: {
          created_at?: string
          demolecturesView?: number | null
          id?: number
          user_id?: string
          view?: number | null
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          extracurricular: number | null
          facilityprovided: number | null
          id: number
          management: number | null
          qualityofeducation: number | null
          totalrating: number | null
          user_id: string | null
          view: number | null
        }
        Insert: {
          created_at?: string
          extracurricular?: number | null
          facilityprovided?: number | null
          id?: number
          management?: number | null
          qualityofeducation?: number | null
          totalrating?: number | null
          user_id?: string | null
          view?: number | null
        }
        Update: {
          created_at?: string
          extracurricular?: number | null
          facilityprovided?: number | null
          id?: number
          management?: number | null
          qualityofeducation?: number | null
          totalrating?: number | null
          user_id?: string | null
          view?: number | null
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
