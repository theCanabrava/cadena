import { create } from "zustand";
import { api, GradeSystem } from "./api";

type ProfileState = {
    username?: string;
    gradingSystem?: GradeSystem;
    gradingSystemOptions: GradeSystem[];
}

export const useProfileStore = create<ProfileState>(() => ({
    username: undefined,
    gradingSystemOptions: []
}))

export const profileActions = {

    registerUser: async (username: string, gradingSystem: GradeSystem) => {
    
        await api!.Profile.registerUser(username, gradingSystem);
        useProfileStore.setState(() => ({username}));

    },

    loadState: async () => {
        const gradingSystemOptions = await api.Profile.getGradingSystemOptions();
        useProfileStore.setState(() => ({gradingSystemOptions}))
    }
    
}
