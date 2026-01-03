import { supabase } from '../lib/supabaseClient';

export interface Chapter {
  id: string;
  chapter_number: number;
  title: string;
  content?: string;
  summary?: string;
  created_at?: string;
}


export async function getAllChapters(): Promise<Chapter[]> {
  const { data, error } = await supabase
    .from('chapters')
    .select('id, chapter_number, title')
    .order('chapter_number', { ascending: true });

  if (error) throw error;
  return data;
}


export async function getChapterById(id: string): Promise<Chapter | null> {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
