import { useChapters } from '../hooks/useChapters';

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ChapterList({ selectedId, onSelect }: Props) {
  const { data, isLoading, error } = useChapters();

  if (isLoading) {
    return <p className="p-4 text-sm text-gray-500">Loading chapters…</p>;
  }

  if (error) {
    return <p className="p-4 text-red-600">Failed to load chapters</p>;
  }

  return (
    <aside className="h-screen overflow-y-auto border-r bg-white">
      <ul className="divide-y">
        {data?.map(ch => (
          <li
            key={ch.id}
            onClick={() => onSelect(ch.id)}
            className={`
              cursor-pointer px-4 py-3 text-sm
              hover:bg-gray-100
              ${selectedId === ch.id ? 'bg-gray-100 font-medium' : ''}
            `}
          >
            <span className="mr-2 text-gray-500">
              {ch.chapter_number}.
            </span>
            {ch.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}
