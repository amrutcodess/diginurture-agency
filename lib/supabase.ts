import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''

const isConfigured = 
  supabaseUrl && 
  supabaseUrl !== 'your_supabase_project_url_here' && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'your_supabase_anon_key_here' &&
  supabaseAnonKey !== 'your_supabase_publishable_key_here'

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({} as any, {
      get(target, prop) {
        return () => {
          throw new Error("Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.")
        }
      }
    })

export const isSupabaseConfigured = !!isConfigured

export type AuditRequest = {
  id?: string
  created_at?: string
  name: string
  company: string
  email: string
  industry: string
  bottleneck: string
  lead_volume: string
  tech_stack: string
  primary_goal: string
  notes: string
}

