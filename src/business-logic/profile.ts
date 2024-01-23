import { create } from "zustand";
import { api, GradeSystem } from "./api";

type ProfileState = {
    username?: string;
    gradingSystems: GradeSystem[];
}

export const useProfileStore = create<ProfileState>(() => ({
    username: undefined,
    gradingSystems: []
}))

export const profileActions = {

    registerUser: async (username: string) => {
    
        await api!.Profile.registerUser(username);
        useProfileStore.setState(() => ({username}));

    },

    loadState: async () => {
        const gradingSystems = await api.Profile.getGradingSystems();
        useProfileStore.setState(() => ({gradingSystems}))
    }
    
}
