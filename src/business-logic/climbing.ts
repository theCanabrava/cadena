import { create } from "zustand";
import { api, Attempt, ClimbingGym, Grade, Route, Session } from "./api";
import { useProfileStore } from "./profile";

type ClimbingState = {
    routes: Route[],
    grades: Grade[],
    sessions: Session[],
    currentSession: Session,
    workingAttempts: Attempt[];
}

const getBlankSession: () => Session = () => ({
    place: {
        id: '-1',
        name: '',
        address: '',
        type: 'gym'
    },
    startTime: new Date(),
    endTime: new Date(),
    playsAlarm: false,
    routeObjective: 0,
    attempts: [],
    observation: ''
})

export const useClimbingStore = create<ClimbingState>(() => ({
    routes: [],
    grades: [],
    sessions: [],
    currentSession: getBlankSession(),
    workingAttempts: [],
}))

export const climbingActions = {

    loadGrades: async () => {
        const { gradingSystem } = useProfileStore.getState();
        
        if(gradingSystem) {
            const grades = await api.Climbing.getGrades(gradingSystem);
            useClimbingStore.setState(() => ({ grades }))
        }
    },

    loadRoutes: async (gym: ClimbingGym) => {

        const routes = await api.Climbing.getRoutes(gym);
        useClimbingStore.setState(() => ({ routes }));

    },

    startSession: async (gym: ClimbingGym) => {
        
        const currentSession: Session = {
            place: gym,
            startTime: getStartingHour(),
            endTime: getStartingHour(),
            playsAlarm: false,
            routeObjective: 0,
            attempts: [],
            observation: ''
        }

        useClimbingStore.setState(() => ({ currentSession }))

    },

    editCurrentSession: async (currentSession: Session) => {
        useClimbingStore.setState(() => ({ currentSession }))
    },

    setWorkingAttempts: async (attempts: Attempt[]) => {
        useClimbingStore.setState(() => ({workingAttempts: [...attempts]}));
    },

    editAttempt: (id: string) => {

        const { currentSession } = useClimbingStore.getState();
        const attempt = currentSession.attempts.find(a => a.id === id);

        if(attempt === undefined) return;

        useClimbingStore.setState(() => ({ currentSession: {...currentSession, edittingAttempt: { ...attempt }} }));

    },

    commitAttempt: () => {

        const { currentSession } = useClimbingStore.getState();
        const index = currentSession.attempts.findIndex(a => a.id === currentSession.edittingAttempt?.id);

        if(index === -1) return;

        currentSession.attempts[index] = currentSession.edittingAttempt!;
        useClimbingStore.setState(() => ({ currentSession: {...currentSession, edittingAttempt: undefined} }));

    },

    saveSession: async (observation: String) => {
        const session = useClimbingStore.getState().currentSession;
        session.observation = observation;

        await api.Climbing.saveSession(session);

        // await api.Climbing.getSessions();

        useClimbingStore.setState((s) => ({
            currentSession: getBlankSession(),
            sessions: [...s.sessions, session],
        }))


    },

    saveRoute: async(route: Route) => {

        const { routes } = useClimbingStore.getState();
        const index = routes.findIndex(r => r.id === route.id);
        if(index === -1) routes.push(route);
        else routes[index] = route;

        routes.sort((a, b) => {
            if(a.grade.hardness > b.grade.hardness) return 1;
            else if (a.grade.hardness < b.grade.hardness) return -1;
            else if (a.name > b.name) return 1;
            else if (b.name < b.name) return -1;
            return 0;
        })

        await api.Climbing.saveRoutes([...routes]);
        useClimbingStore.setState(() => ({routes: [...routes]}));

    },

    addAttemptsToSession: async(attempts: Attempt[]) => {
        const { currentSession } = useClimbingStore.getState();
        currentSession.attempts = [ ...currentSession.attempts, ...attempts ];
        useClimbingStore.setState(() => ({ currentSession: {...currentSession}, workingAttempts: []}));
    }
}

const getStartingHour = () =>
{
    const date = new Date();
    const quarter = Math.floor(date.getMinutes() / 15)
    date.setMinutes(quarter*15)
    return date;
}
