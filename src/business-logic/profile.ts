import { create } from "zustand";
import { api } from "./api";

type ProfileState = {
    username?: string;
}

export const useProfileStore = create<ProfileState>(() => ({
    username: undefined
}))

export const profileActions = {

    registerUser: async (username: string) => {
    
        await api!.Profile.registerUser(username);
        useProfileStore.setState(() => ({username}));

    }
    
}
