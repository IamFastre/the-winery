"use client";
import { useShortcuts } from "@/providers/Shortcuts";

export function HomeShortcuts() {
  useShortcuts([
    { key: 'h', alt: true, clickableId: 'home-page-button' },
    { key: '1', alt: true, clickableId: 'search-page-button' },
    { key: '2', alt: true, clickableId: 'user-page-button' },
    { key: '3', alt: true, clickableId: 'compose-page-button' },
    { key: '4', alt: true, clickableId: 'settings-page-button' },
    { key: '5', alt: true, clickableId: 'info-page-button' },
  ]);

  return null;
}
