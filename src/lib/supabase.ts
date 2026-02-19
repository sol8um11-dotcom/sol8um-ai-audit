import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface AuditSubmission {
  name: string;
  phone: string;
  business_name: string;
  tribe: string;
  sector: string;
  business_size: string;
  tech_level: string;
  budget: string;
  pain_points: string[];
  overall_score: number;
  estimated_savings: string;
  top_solutions: string[];
  source: string;
  created_at?: string;
}

export async function saveAuditResult(data: AuditSubmission) {
  if (!supabase) {
    console.log("Supabase not configured — skipping save");
    return { error: null, data: null };
  }

  const { error, data: result } = await supabase
    .from("audit_submissions")
    .insert([data]);

  return { error, data: result };
}
