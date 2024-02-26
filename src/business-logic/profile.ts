import { create } from "zustand";
import { api, ClimbingGym, GradeSystem } from "./api";

type ProfileState = {
    username?: string;
    gradingSystem?: GradeSystem;
    gradingSystemOptions: GradeSystem[];
    climbingGyms: ClimbingGym[],
    selectedGym: ClimbingGym,

    loggedIn: boolean,
    displayGymSelector: boolean,
}

export const useProfileStore = create<ProfileState>(() => ({
    username: undefined,
    gradingSystemOptions: [],
    loggedIn: false,
    displayGymSelector: false,
    climbingGyms: [],
    selectedGym: {
        id: '-1',
        name: '',
        address: '',
        type: 'gym' 
    }
}))

export const profileActions = {

    registerUser: async (username: string, gradingSystem: GradeSystem) => {
    
        await api!.Profile.registerUser(username, gradingSystem);
        useProfileStore.setState(() => ({username, gradingSystem}));

    },

    editGym: async (gym: ClimbingGym) => {

        const { climbingGyms } = useProfileStore.getState();
        let editedGymIndex = climbingGyms.findIndex(g => g.id === gym.id);

        if(editedGymIndex !== -1) {
            climbingGyms[editedGymIndex] = { ...gym };
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

    submitGyms: async () => {
        const { climbingGyms } = useProfileStore.getState();
        await api.Profile.registerGyms(climbingGyms);
        useProfileStore.setState(() => ({selectedGym: climbingGyms[0]}));
    },

    logIn: () => {
        
        const { username, gradingSystem, climbingGyms } = useProfileStore.getState();
        if(username === undefined) return false;
        if(gradingSystem === undefined) return false;
        for(let gym of climbingGyms) {
            if(gym.name === '') return false;
            else if(gym.type !== "gym" && gym.type !== "craig") return false;
        }

        useProfileStore.setState(() => ({loggedIn: true}));
        return true;
        
    },

    loadState: async () => {
        const gradingSystemOptions = await api.Profile.getGradingSystemOptions();
        useProfileStore.setState(() => ({gradingSystemOptions}));
    },

    toggleGymModal: (display: boolean) => {
        useProfileStore.setState(() => ({displayGymSelector: display}));
    },

    selectGym: (gym: ClimbingGym) => {
        useProfileStore.setState(() => ({selectedGym: gym}));
    }
    
}
