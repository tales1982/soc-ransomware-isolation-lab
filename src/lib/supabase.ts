import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(url, key);

export interface ExerciseSubmissionRow {
  id: string;
  visitor_id: string;
  exercise_id: string;
  submission: string;
  ai_feedback: ExerciseFeedback | null;
  score: number | null;
  created_at: string;
  updated_at: string;
}

export interface ExerciseFeedback {
  score: number;
  scoreLabel: 'Excellent' | 'Good' | 'Needs Work' | 'Incomplete';
  strengths: string[];
  improvements: string[];
  missedConcepts: string[];
  summary: string;
}
