import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://yyofzptzwtxuovkuqclo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5b2Z6cHR6d3R4dW92a3VxY2xvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MzAxNzEsImV4cCI6MjA2MzIwNjE3MX0.RexwjX9wuYFFGfVlvFZFRAUGiUKoPVEn6eopQEVMk8U";

export const supabase = createClient<any>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);