import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClimbingGym, GradeSystem, api } from '../business-logic/api';
import GradingSystems from './static-data/grading-systems';

const profileKey = '@cadena-profile';

type ProfileStorage = {
    username?: string;
    gradingSystem?: GradeSystem;
    climbingGyms: ClimbingGym[],
    selectedGym?: ClimbingGym,
}

const readProfileStorage: () => Promise<ProfileStorage> = async () => {
    
    const raw = await AsyncStorage.getItem(profileKey);

    if (raw === null) {
        return {
            climbingGyms: [],
        }
    } else {
        const processed = JSON.parse(raw) as ProfileStorage;
        return processed;
    }

}

const saveProfileStorage: (s: ProfileStorage) => Promise<void> = async (storage) => {
    const raw = JSON.stringify(storage);
    await AsyncStorage.setItem(profileKey, raw);
}

const Profile: typeof api.Profile = {

    registerUser: async (u, g) => {
        const storage = await readProfileStorage();
        storage.username = u;
        storage.gradingSystem = g;
        await saveProfileStorage(storage);
    },

    registerGyms: async (g) => {
        const storage = await readProfileStorage();
        storage.climbingGyms = g;
        await saveProfileStorage(storage);
    },

    getGradingSystemOptions: async () => GradingSystems,

    getUser: async () => {
        const storage = await readProfileStorage();
        return {
            username: storage.username,
            climbingGyms: storage.climbingGyms,
            gradingSystem: storage.gradingSystem
        }
    },

}

export default Profile;