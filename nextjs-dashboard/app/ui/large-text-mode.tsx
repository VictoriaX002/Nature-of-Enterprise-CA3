'use client';

import clsx from 'clsx';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';

const LARGE_TEXT_STORAGE_KEY = 'student-hub-large-text-mode';
const HIGH_CONTRAST_STORAGE_KEY = 'student-hub-high-contrast-mode';

type PageAccessibilityContextValue = {
  largeText: boolean;
  toggleLargeText: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
};

const PageAccessibilityContext = createContext<PageAccessibilityContextValue | null>(null);

function persist(key: string, value: boolean) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    /* ignore quota / private mode */
  }
}

export function LargeTextProvider({ children }: { children: ReactNode }) {
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(LARGE_TEXT_STORAGE_KEY) === 'true') {
        setLargeText(true);
      }
      if (localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY) === 'true') {
        setHighContrast(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLargeText = useCallback(() => {
    setLargeText((prev) => {
      const next = !prev;
      persist(LARGE_TEXT_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const toggleHighContrast = useCallback(() => {
    setHighContrast((prev) => {
      const next = !prev;
      persist(HIGH_CONTRAST_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ largeText, toggleLargeText, highContrast, toggleHighContrast }),
    [largeText, highContrast, toggleLargeText, toggleHighContrast]
  );

  return (
    <PageAccessibilityContext.Provider value={value}>{children}</PageAccessibilityContext.Provider>
  );
}

export function LargeTextMain({ className, children, ...rest }: ComponentProps<'main'>) {
  const ctx = useContext(PageAccessibilityContext);
  if (!ctx) {
    throw new Error('LargeTextMain must be used inside LargeTextProvider');
  }
  return (
    <main
      {...rest}
      data-high-contrast={ctx.highContrast ? 'true' : undefined}
      className={clsx(className, ctx.largeText && 'origin-top [zoom:1.15]')}
    >
      {children}
    </main>
  );
}

export function LargeTextToggleButton({ className }: { className?: string }) {
  const ctx = useContext(PageAccessibilityContext);
  if (!ctx) {
    throw new Error('LargeTextToggleButton must be used inside LargeTextProvider');
  }
  const { largeText, toggleLargeText } = ctx;

  return (
    <button
      type="button"
      onClick={toggleLargeText}
      aria-pressed={largeText}
      aria-label={largeText ? 'Use standard text size' : 'Use large text size for readability'}
      className={clsx(
        'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
        largeText
          ? 'border-blue-600 bg-blue-50 text-blue-900 hover:bg-blue-100'
          : 'border-slate-300 text-slate-800 hover:bg-slate-100',
        className
      )}
    >
      {largeText ? 'Standard text size' : 'Large text size'}
    </button>
  );
}

export function HighContrastToggleButton({ className }: { className?: string }) {
  const ctx = useContext(PageAccessibilityContext);
  if (!ctx) {
    throw new Error('HighContrastToggleButton must be used inside LargeTextProvider');
  }
  const { highContrast, toggleHighContrast } = ctx;

  return (
    <button
      type="button"
      onClick={toggleHighContrast}
      aria-pressed={highContrast}
      aria-label={
        highContrast ? 'Use default colors' : 'Use high contrast colors for readability'
      }
      className={clsx(
        'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
        highContrast
          ? 'border-yellow-300 bg-neutral-900 text-yellow-200 hover:bg-neutral-800'
          : 'border-slate-300 text-slate-800 hover:bg-slate-100',
        className
      )}
    >
      {highContrast ? 'Default contrast' : 'High contrast'}
    </button>
  );
}
