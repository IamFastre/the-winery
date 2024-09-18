"use client";
import { useShortcuts } from "@/providers/Shortcuts";

export function CardPageShortcuts() {
  useShortcuts([
    { key: 'l', alt: true, clickableId: 'like-post' },
    { key: 's', alt: true, clickableId: 'save-post' },
    { key: 'c', alt: true, clickableId: 'share-post' },
    { key: 'u', alt: true, clickableId: 'user-post' },

    { key: 'l', alt: true, ctrl: true, clickableId: 'like-list' },
  ]);

  return null;
}
