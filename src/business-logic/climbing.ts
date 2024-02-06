import { create } from "zustand";
import { api, ClimbingGym, Grade, Session } from "./api";
import { useProfileStore } from "./profile";

type ClimbingState = {
    routes: any[],
    grades: Grade[],
    sessions: Session[],
    currentSession: Session,
}

export const useClimbingStore = create<ClimbingState>(() => ({
    routes: [],
    grades: [],
    sessions: [],
    currentSession: {
        place: {
            id: '-1',
            name: '',
            address: '',
            type: 'gym'
        },
        startTime: new Date(),
        endTime: new Date(),
        playsAlarm: false,
        routeObjective: 0
    }
}))

export const climbingActions = {

    loadGrades: async () => {
        const { gradingSystem } = useProfileStore.getState();
        
        if(gradingSystem) {
            const grades = await api.Climbing.getGrades(gradingSystem);
            useClimbingStore.setState(() => ({ grades }))
        }
    },

    startSession: async (gym: ClimbingGym) => {
        
        const currentSession: Session = {
            place: gym,
            startTime: getStartingHour(),
            endTime: getStartingHour(),
            playsAlarm: false,
            routeObjective: 0
        }

        useClimbingStore.setState(() => ({ currentSession }))

    },

    editCurrentSession: async (currentSession: Session) => {
        useClimbingStore.setState(() => ({ currentSession }))
    }
}

const getStartingHour = () =>
{
    const date = new Date();
    const quarter = Math.floor(date.getMinutes() / 15)
    date.setMinutes(quarter*15)
    return date;
}
