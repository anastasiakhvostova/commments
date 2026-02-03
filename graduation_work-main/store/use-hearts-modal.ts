import { create } from "zustand"

type HeartsModalSlate = {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const useHeartsModal = create<HeartsModalSlate>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true}),
    close: () => set({ isOpen: false})
}))