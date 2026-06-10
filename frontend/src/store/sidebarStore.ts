/* src/store/sidebarStore.ts */
import { create } from 'zustand';

type SidebarStateType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useSidebarStore = create<SidebarStateType>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}));
