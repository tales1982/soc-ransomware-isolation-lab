import type { ExerciseFeedback } from './supabase';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

export interface ExerciseAnswerContext {
  title: string;
  text: string;
  mitre?: string[];
  tools?: string[];
}

export async function evaluateExerciseAnswer(
  submissionText: string,
  exercise: ExerciseAnswerContext,
  language: 'en' | 'fr' | 'pt',
): Promise<ExerciseFeedback> {
  if (!API_KEY) throw new Error('VITE_GEMINI_API_KEY not configured');

  const langInstruction =
    language === 'pt' ? 'Respond entirely in Brazilian Portuguese (pt-BR).'
    : language === 'fr' ? 'Respond entirely in French.'
    : 'Respond entirely in English.';

  const prompt = `You are a SOC (Security Operations Center) instructor reviewing a student's answer to a hands-on cybersecurity lab exercise.
${langInstruction}

EXERCISE TITLE:
${exercise.title}

EXERCISE INSTRUCTIONS (what the student was asked to do and report back):
${exercise.text}
${exercise.mitre?.length ? `\nRelevant MITRE ATT&CK techniques: ${exercise.mitre.join(', ')}` : ''}
${exercise.tools?.length ? `\nExpected tools: ${exercise.tools.join(', ')}` : ''}

STUDENT'S ANSWER:
${submissionText}

Judge the answer against what the exercise instructions actually asked for — did the student report the fields/values/behavior the exercise asked them to find or explain, and do they show real understanding of what happened (not just that they ran a command)? A short but precise, technically correct answer should score well; a long answer that doesn't address the actual question should not. Return ONLY a valid JSON object with this exact structure:
{
  "score": <integer 0-10>,
  "scoreLabel": <"Excellent" if 9-10 | "Good" if 7-8 | "Needs Work" if 4-6 | "Incomplete" if 0-3>,
  "strengths": [<up to 3 specific things the student got right, each a short sentence>],
  "improvements": [<up to 3 specific, concrete improvements, each a short sentence>],
  "missedConcepts": [<concepts or fields the exercise asked for that the student's answer omitted, as short labels>],
  "summary": <2-3 sentence overall assessment>
}

Scoring guide:
- 9-10: Directly answers what the exercise asked, technically accurate, shows real understanding
- 7-8: Mostly correct, minor omissions or imprecision
- 4-6: Partial — attempted the exercise but missed key fields/values or misunderstood part of it
- 0-3: Too short, off-topic, or shows a fundamental misunderstanding of the exercise

Be constructive and specific. Do not be harsh — this is a self-study lab, not a graded exam.`;

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2 },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API ${res.status}: ${err}`);
  }

  const data = await res.json();
  const raw: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
  return JSON.parse(cleaned) as ExerciseFeedback;
}
