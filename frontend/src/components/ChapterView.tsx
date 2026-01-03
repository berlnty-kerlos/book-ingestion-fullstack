import { useChapter } from '../hooks/useChapters';

interface Props {
  chapterId: string | null;
}

export function ChapterView({ chapterId }: Props) {
  const { data, isLoading, error } = useChapter(chapterId);

  if (!chapterId) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Select a chapter to begin reading
      </div>
    );
  }

  if (isLoading) {
    return <p className="p-6">Loading chapter…</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">Failed to load chapter</p>;
  }

  return (
    <article className="max-w-3xl p-8">
      <h2 className="mb-4 text-2xl font-bold">
        {data?.title}
      </h2>

      {data?.summary && (
        <section className="mb-6 rounded-lg bg-blue-50 p-4 text-sm">
          <p className="font-medium mb-1">Summary</p>
          <p>{data.summary}</p>
        </section>
      )}

      <section className="prose prose-sm max-w-none whitespace-pre-wrap">
        {data?.content}
      </section>
    </article>
  );
}
