import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface Chapter {
  id: string;
  chapter_number: number;
  title: string;
  content?: string;
  summary?: string;
  created_at?: string;
}


export const fetchChapters = async (): Promise<Chapter[]> => {
  const { data } = await axios.get(`${API_URL}/chapters`);
  return data;
};


export const fetchChapterById = async (id: string): Promise<Chapter> => {
  const { data } = await axios.get(`${API_URL}/chapters/${id}`);
  return data;
};
