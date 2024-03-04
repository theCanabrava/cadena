import AsyncStorage from '@react-native-async-storage/async-storage';
import { Attempt, ClimbingGym, GradeSystem, Route, Session, api } from '../business-logic/api';
import Grades from './static-data/grades';

const climbingKey = '@cadena-climbing';

type FlatRoute = Omit<Route, 'grade'> & { gradeName: string, gradeSystemId: string };
type FlatAttempt = Omit<Attempt, 'route'> & { routeId: string, sessionId: string };
type FlatSession = {
    id: string,
    gymId: string,
    startTime: string,
    expectedEndTime?: string,
    endTime: string,
    routeObjective: number,
    observation: string,
};

type ClimbingStorage = {
    routes: FlatRoute[]
    sessions: FlatSession[]
    attempts: FlatAttempt[]

}

const readClimbingStorage: () => Promise<ClimbingStorage> = async () => {
    
    const raw = await AsyncStorage.getItem(climbingKey);

    if (raw === null) {
        return {
            routes: [],
            sessions: [],
            attempts: [],
        }
    } else {
        const processed = JSON.parse(raw) as ClimbingStorage;
        return processed;
    }

}

const saveClimbingStorage: (s: ClimbingStorage) => Promise<void> = async (storage) => {
    const raw = JSON.stringify(storage);
    await AsyncStorage.setItem(climbingKey, raw);
}

const Climbing: typeof api.Climbing = {
    getGrades: async (system) => {
        const systemGrades = Grades.filter(i => i.systemId === system.id);
        return systemGrades;
    },

    getRoutes: async (gym) => {
        
        const storage = await readClimbingStorage();
        const routes = storage.routes.filter(r => r.gymId === gym.id);
        return routes.map(r => {
            const grade = Grades.find(g => g.systemId === r.gradeSystemId && g.name === r.gradeName);
            return {
                gymId: r.gymId,
                grade: grade ?? Grades[0],
                name: r.name,
                id: r.id,
                mode: r.mode,
                retired: r.retired
            } 
        });

    },

    saveRoutes: async (routes: Route[]) => {

        const storage = await readClimbingStorage();
        const remainingRoutes = storage.routes.filter(r => r.gymId !== routes[0].gymId);
        const flattenedRoutes: FlatRoute[] = routes.map(r => ({
            gymId: r.gymId,
            gradeSystemId: r.grade.systemId,
            gradeName: r.grade.name,
            name: r.name,
            id: r.id,
            mode: r.mode,
            retired: r.retired
        }))
        storage.routes = [ ...remainingRoutes, ...flattenedRoutes ];
        await saveClimbingStorage(storage);

    },

    saveSession: async (session) => {

        const storage = await readClimbingStorage();
        const remainingSessions = storage.sessions.filter(s => s.id !== session.id);
        const remainingAttempts = storage.attempts.filter(a => a.sessionId !== session.id);

        const flatAttempts: FlatAttempt[] = session.attempts.map(a => ({
            sessionId: session.id,
            id: a.id,
            routeId: a.route!.id ?? '',
            dificulty: a.dificulty,
            status: a.status
        }))

        const flatSession: FlatSession = {
            id: session.id,
            gymId: session.place.id,
            startTime: session.startTime.toISOString(),
            expectedEndTime: session.expectedEndTime?.toISOString(),
            endTime: session.endTime.toISOString(),
            routeObjective: session.routeObjective,
            observation: session.observation,
        }

        storage.attempts = [ ...remainingAttempts, ...flatAttempts ];
        storage.sessions = [ ...remainingSessions, flatSession ];

        await saveClimbingStorage(storage);

    },

    getSessions: async (gym) => {
        
        const storage = await readClimbingStorage();

        const flatSessions = storage.sessions.filter(s => s.gymId === gym.id);
        const sessions = flatSessions.map(s => {
            const flatAttempts = storage.attempts.filter(a => a.sessionId === s.id);
            const attempts = flatAttempts.map(a => {
                const flatRoute = storage.routes.find(r => r.id === a.routeId)!;
                const grade = Grades.find(g => g.name === flatRoute.gradeName && g.systemId === flatRoute.gradeSystemId)!;
                const route = {
                    gymId: flatRoute.gymId,
                    grade: grade,
                    name: flatRoute.name,
                    id: flatRoute.id,
                    mode: flatRoute.mode,
                    retired: flatRoute.retired
                }

                return {
                    id: a.id,
                    route: route,
                    dificulty: a.dificulty,
                    status: a.status
                }
            })

            return {
                id: s.id,
                place: gym,
                startTime: new Date(s.startTime),
                expectedEndTime: s.expectedEndTime !== undefined ? new Date(s.expectedEndTime) : undefined,
                endTime: new Date(s.endTime),
                playsAlarm: false,
                routeObjective: s.routeObjective,
                attempts: attempts,
                edittingAttempt: undefined,
                observation: s.observation,
            }
            
        })

        
        return sessions;
    }
}

export default Climbing;