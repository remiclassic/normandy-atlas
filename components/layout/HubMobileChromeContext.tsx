'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';

type HubMobileChromeContextValue = {
  openMoreSheet: () => void;
  moreSheetOpen: boolean;
};

const HubMobileChromeContext = createContext<HubMobileChromeContextValue | null>(null);

export function HubMobileChromeProvider({
  children,
  openMoreSheet,
  moreSheetOpen,
}: {
  children: ReactNode;
  openMoreSheet: () => void;
  moreSheetOpen: boolean;
}) {
  const value = useMemo(
    () => ({ openMoreSheet, moreSheetOpen }),
    [openMoreSheet, moreSheetOpen],
  );
  return <HubMobileChromeContext.Provider value={value}>{children}</HubMobileChromeContext.Provider>;
}

export function useHubMobileChrome(): HubMobileChromeContextValue | null {
  return useContext(HubMobileChromeContext);
}

type AtlasHubDesktopToolsContextValue = {
  openDesktopToolsMenu: () => void;
};

const AtlasHubDesktopToolsContext = createContext<AtlasHubDesktopToolsContextValue | null>(null);

export function AtlasHubDesktopToolsProvider({
  children,
  openDesktopToolsMenu,
}: {
  children: ReactNode;
  openDesktopToolsMenu: () => void;
}) {
  const value = useMemo(() => ({ openDesktopToolsMenu }), [openDesktopToolsMenu]);
  return (
    <AtlasHubDesktopToolsContext.Provider value={value}>{children}</AtlasHubDesktopToolsContext.Provider>
  );
}

export function useAtlasHubDesktopTools(): AtlasHubDesktopToolsContextValue | null {
  return useContext(AtlasHubDesktopToolsContext);
}
