import { useState } from 'react'
import { ChapterList } from './components/ChapterList';
import { ChapterView } from './components/ChapterView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'

const queryClient = new QueryClient();

export default function App() {
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen">
        <div className="w-72">
          <ChapterList
            selectedId={selectedChapterId}
            onSelect={setSelectedChapterId}
          />
        </div>

        <main className="flex-1 overflow-y-auto bg-white">
          <ChapterView chapterId={selectedChapterId} />
        </main>
      </div>
    </QueryClientProvider>
  );
}

