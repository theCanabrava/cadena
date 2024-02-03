import { create } from "zustand";

type ClimbingState = {
    routes: any[],
    sessions: any[]
}

export const useClimbingStore = create<ClimbingState>(() => ({
    routes: [],
    sessions: []
}))
