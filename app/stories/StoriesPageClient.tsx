'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StoryLibraryPanel from '@/components/story/StoryLibraryPanel';
import {
  useHydrateLocale,
  useHydrateUiTheme,
  useHydrateTextSize,
  useLocale,
} from '@/hooks/use-atlas';
import { buildStoryLibraryRows } from '@/lib/story-library-build';
import { arcIdToProgressKey, FULL_TIMELINE_PROGRESS_KEY } from '@/lib/story-progress';

export default function StoriesPageClient() {
  useHydrateLocale();
  useHydrateUiTheme();
  useHydrateTextSize();
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsConsumed = useRef(false);
  const [bootstrap, setBootstrap] = useState<{
    focusProgressKey?: string;
    openDetail?: boolean;
  } | null>(null);

  useEffect(() => {
    if (paramsConsumed.current) return;
    paramsConsumed.current = true;
    const lib = searchParams.get('library');
    if (lib === '1' || lib === 'true') {
      let focusProgressKey: string | undefined;
      if (searchParams.has('libraryArc')) {
        const a = searchParams.get('libraryArc') ?? '';
        focusProgressKey =
          a === '' ? FULL_TIMELINE_PROGRESS_KEY : arcIdToProgressKey(a);
      }
      const openDetail = searchParams.get('libraryDetail') === '1';
      setBootstrap({ focusProgressKey, openDetail });
    }
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.replaceState({}, '', '/stories');
    }
  }, [searchParams]);

  const rows = useMemo(() => buildStoryLibraryRows(locale), [locale]);

  const onClose = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <StoryLibraryPanel
      open
      onClose={onClose}
      useShellChrome={false}
      bootstrap={bootstrap}
      onBootstrapConsumed={() => setBootstrap(null)}
      allRowsOverride={rows}
    />
  );
}
