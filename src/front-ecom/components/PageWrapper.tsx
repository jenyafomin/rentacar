"use client"
import { ReactNode } from 'react';
import { useScrollReset } from '../hooks/useScrollReset';

interface PageWrapperProps {
  children: ReactNode;
  resetScroll?: boolean;
}

export default function PageWrapper({ children, resetScroll = true }: PageWrapperProps) {
  // Используем хук для сброса скролла
  if (resetScroll) {
    useScrollReset();
  }

  return <>{children}</>;
} 