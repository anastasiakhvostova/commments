import { create } from "zustand"

type ExitModalSlate = {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const useExitModal = create<ExitModalSlate>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true}),
    close: () => set({ isOpen: false})
}))