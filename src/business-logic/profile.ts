import { create } from "zustand";
import { api, ClimbingGym, GradeSystem } from "./api";

type ProfileState = {
    username?: string;
    gradingSystem?: GradeSystem;
    gradingSystemOptions: GradeSystem[];
    climbingGyms: ClimbingGym[],

    loggedIn: boolean,
}

export const useProfileStore = create<ProfileState>(() => ({
    username: undefined,
    gradingSystemOptions: [],
    loggedIn: false,
    climbingGyms: []
}))

export const profileActions = {

    registerUser: async (username: string, gradingSystem: GradeSystem) => {
    
        await api!.Profile.registerUser(username, gradingSystem);
        useProfileStore.setState(() => ({username}));

    },

    editGym: async (gym: ClimbingGym) => {

        const { climbingGyms } = useProfileStore.getState();
        let editedGym = climbingGyms.find(g => g.id === gym.id);

        if(editedGym) {
            editedGym = { ...gym };
        } else {
            climbingGyms.push(gym);
        }

        useProfileStore.setState(() => ({climbingGyms: [...climbingGyms]}));
    },


    removeGym: async (gym: ClimbingGym) => {

        const climbingGyms = useProfileStore
                                .getState()
                                .climbingGyms
                                .filter(g => g.id !== gym.id);

        
        useProfileStore.setState(() => ({climbingGyms}));

    },

    loadState: async () => {
        const gradingSystemOptions = await api.Profile.getGradingSystemOptions();
        useProfileStore.setState(() => ({gradingSystemOptions}))
    }
    
}
