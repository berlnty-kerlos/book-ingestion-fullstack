import { useQuery } from '@tanstack/react-query';
import { fetchChapters, fetchChapterById, type Chapter } from '../api/chapters';

export const useChapters = () =>
  useQuery<Chapter[]>({
    queryKey: ['chapters'],
    queryFn: fetchChapters,
  });

export const useChapter = (id: string | null) =>
  useQuery<Chapter>({
    queryKey: ['chapter', id],
    queryFn: () => fetchChapterById(id as string),
    enabled: !!id,
  });