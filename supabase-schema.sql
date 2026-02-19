-- Supabase Schema for AI Opportunity Audit
-- Run this in your Supabase SQL editor to set up the database

-- Create the audit_submissions table
CREATE TABLE IF NOT EXISTS audit_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT NOT NULL,
  sector TEXT NOT NULL,
  business_size TEXT NOT NULL,
  tech_level TEXT NOT NULL,
  budget TEXT NOT NULL,
  pain_points TEXT[] NOT NULL,
  overall_score INTEGER NOT NULL,
  estimated_savings TEXT,
  top_solutions TEXT[],
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_audit_submissions_created_at ON audit_submissions(created_at DESC);
CREATE INDEX idx_audit_submissions_sector ON audit_submissions(sector);
CREATE INDEX idx_audit_submissions_source ON audit_submissions(source);

-- Enable Row Level Security
ALTER TABLE audit_submissions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous users (for the form)
CREATE POLICY "Allow anonymous inserts" ON audit_submissions
  FOR INSERT
  WITH CHECK (true);

-- Only allow authenticated users to read (for your dashboard)
CREATE POLICY "Allow authenticated reads" ON audit_submissions
  FOR SELECT
  USING (auth.role() = 'authenticated');
