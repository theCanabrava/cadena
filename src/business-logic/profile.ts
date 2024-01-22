import { create } from "zustand";

type ProfileState = {
    username?: string;
}

export const useProfileStore = create<ProfileState>(() => ({
    username: undefined
}))

export const profileActions = {

    registerUser: async (username: string) => {
    
        //api.Profile.registerUser(username);
        useProfileStore.setState(() => ({username}));
    }
    
}
