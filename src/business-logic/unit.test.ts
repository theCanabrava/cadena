import State from ".";
import { Palette } from "../design-system";
import { Api, ClimbingGym, Route } from "./api";

describe('Profile state', () => {

    beforeEach(() => {
        State.stateHooks.useProfileStore.setState((s) => ({
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
    })

    it('registers a new user', async () => {
        const storage = {username: '', system: {id: '', name: ''}};
        await State.configure(generateIntegrationApi(storage));
        await State.dispatch.profileActions.registerUser('user', {id: '1', name: 'Grade'});

        expect(storage.username).toBe('user');
        expect(storage.system.id).toBe('1');
        
    })

    it('adds a gym if none exists', async () => {
        await State.configure(generateIntegrationApi({}));
        await State.dispatch.profileActions.editGym({name: 'gym', id: '1', address: '', type: 'gym'});

        const { climbingGyms } = State.stateHooks.useProfileStore.getState();
        expect(climbingGyms.length).toBe(1);

    })

    it('edits a gym if one with same id exists', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.profileActions.editGym({name: 'gym', id: '2', address: '', type: 'gym'});
        await State.dispatch.profileActions.editGym({name: 'updated-gym', id: '2', address: '', type: 'gym'});

        const { climbingGyms } = State.stateHooks.useProfileStore.getState();
        expect(climbingGyms.length).toBe(1);
        expect(climbingGyms[0].name).toBe('updated-gym');
    })

    it('removes a gym from registered list', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.profileActions.editGym({name: 'gym', id: '2', address: '', type: 'gym'});
        await State.dispatch.profileActions.removeGym({name: 'gym', id: '2', address: '', type: 'gym'});

        const { climbingGyms } = State.stateHooks.useProfileStore.getState();
        expect(climbingGyms.length).toBe(0);
            
    })

    it('submit registered gyms to the API', async () => {
        const storage: { climbingGyms: ClimbingGym[] } = { climbingGyms: [] }
        await State.configure(generateIntegrationApi(storage));
        await State.dispatch.profileActions.editGym({name: 'gym', id: '1', address: '', type: 'gym'});
        await State.dispatch.profileActions.submitGyms();

        expect(storage.climbingGyms.length).toBe(1);

    })

    it('logs in', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.profileActions.registerUser('user', {id: '1', name: 'Grade'});
        await State.dispatch.profileActions.editGym({name: 'gym', id: '1', address: '', type: 'gym'});
        await State.dispatch.profileActions.logIn();

        const { loggedIn } = State.stateHooks.useProfileStore.getState();

        expect(loggedIn).toBe(true);
    })

    it('logs in automatically', async () => {

        const api = generateIntegrationApi({})
        await State.configure({...api, Profile: {...api.Profile, 
            getUser: async () => ({
                username: 'user',
                gradingSystem: { id: '1', name: 'system'},
                climbingGyms: [{ id: '1', name: 'gym', address: '', type: 'gym'}]
            })
        }});

        const { loggedIn } = State.stateHooks.useProfileStore.getState();

        expect(loggedIn).toBe(true);
    })

    it('toggles the gym modal flag', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.profileActions.toggleGymModal(true);

        const { displayGymSelector } = State.stateHooks.useProfileStore.getState();

        expect(displayGymSelector).toBe(true);
    })

    it('selects a gym', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.profileActions.selectGym({name: 'gym', id: '1', address: '', type: 'gym'});

        const { selectedGym } = State.stateHooks.useProfileStore.getState();
        expect(selectedGym.name).toBe('gym');

    })
})

describe('Climbing store', () => {

    beforeEach(() => {
        State.stateHooks.useProfileStore.setState((s) => ({
            username: 'user',
            gradingSystemOptions: [{id: '1', name: 'grade'}],
            loggedIn: true,
            displayGymSelector: false,
            climbingGyms: [{id: '1', name: 'gym', address: '', type: 'gym'}],
            selectedGym: {
                id: '1',
                name: 'gym',
                address: '',
                type: 'gym' 
            }
        }))

        State.stateHooks.useClimbingStore.setState((s) => ({
            routes: [],
            grades: [],
            sessions: [],
            currentSession: {
                id: '1',
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
            },
            workingAttempts: [],
        }))
    })

    it('load grades', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.climbingActions.loadGrades();

        const { grades } = State.stateHooks.useClimbingStore.getState();
        expect(grades[0].name).toBe('4');

    })

    it('load routes', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.climbingActions.loadRoutes({id: '1', name: 'gym', address: '', type: 'gym'});

        const { routes } = State.stateHooks.useClimbingStore.getState();
        expect(routes[0].name).toBe('route');

    })

    it('starts a new session', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.climbingActions.startSession({id: '1', name: 'gym', address: '', type: 'gym'});

        const { currentSession } = State.stateHooks.useClimbingStore.getState();
        expect(currentSession.place.name).toBe('gym');

    })

    it('edits a session', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.climbingActions.startSession({id: '1', name: 'gym', address: '', type: 'gym'});

        const { currentSession: currentSessionUnedited } = State.stateHooks.useClimbingStore.getState();
        await State.dispatch.climbingActions.editCurrentSession({...currentSessionUnedited, routeObjective: 10})
        const { currentSession: currentSessionEdited } = State.stateHooks.useClimbingStore.getState();

        expect(currentSessionEdited.routeObjective).toBe(10);

    })

    it('updates working attempt', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.climbingActions.setWorkingAttempts([{id: '1', dificulty: 1, status: 'redpoint'}]);

        const { workingAttempts } = State.stateHooks.useClimbingStore.getState();
        expect(workingAttempts[0].status).toBe('redpoint');

    })

    it('updates a attempt from the session', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.climbingActions.startSession({id: '1', name: 'gym', address: '', type: 'gym'});

        const { currentSession } = State.stateHooks.useClimbingStore.getState();
        await State.dispatch.climbingActions.editCurrentSession({...currentSession, attempts: [{id: '1', dificulty: 1, status: 'redpoint'}]});
        await State.dispatch.climbingActions.editAttempt('1');
        const { currentSession: currentSession2 } = State.stateHooks.useClimbingStore.getState();
        await State.dispatch.climbingActions.editCurrentSession({...currentSession2, edittingAttempt: {id: '1', dificulty: 5, status: 'redpoint'}});
        await State.dispatch.climbingActions.commitAttempt();

        const state = State.stateHooks.useClimbingStore.getState();
        expect(state.currentSession.attempts[0].dificulty).toBe(5);

    })

    it('load previous sessions', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.climbingActions.loadSessions({id: '1', name: 'gym', address: '', type: 'gym'});

        const { sessions } = State.stateHooks.useClimbingStore.getState();
        expect(sessions[0].id).toBe("1");

    })

    it('saves a session', async () => {

        const storage = {session: {observation: ''}}
        await State.configure(generateIntegrationApi(storage));
        await State.dispatch.climbingActions.startSession({id: '1', name: 'gym', address: '', type: 'gym'});
        await State.dispatch.climbingActions.saveSession('observation');

        const { sessions, currentSession } = State.stateHooks.useClimbingStore.getState();

        expect(sessions[0].observation).toBe('observation');
        expect(currentSession.place.id).toBe('-1');
        expect(storage.session.observation).toBe('observation');

    })

    it('saves a route', async () => {

        const storage: {routes: Route[]} = {routes: []};
        await State.configure(generateIntegrationApi(storage));
        await State.dispatch.climbingActions.saveRoute({
            id: '1', 
            gymId: '1', 
            grade: {
                systemId: '1',
                name: '4',
                hardness: 1,
                palette: Palette.deepPurple
            },
            name: 'Route',
            mode: 'top-rope',
            retired: false
        });

        const { routes } = await State.stateHooks.useClimbingStore.getState();
        expect(routes[0].id).toBe('1');
        expect(storage.routes[0].id).toBe('1');

    })

    it('transfers working attempts to current session', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.climbingActions.startSession({id: '1', name: 'gym', address: '', type: 'gym'});
        await State.dispatch.climbingActions.setWorkingAttempts([{id: '1', dificulty: 1, status: 'redpoint'}]);

        const { workingAttempts } = State.stateHooks.useClimbingStore.getState();
        await State.dispatch.climbingActions.addAttemptsToSession(workingAttempts);
        const { currentSession } = State.stateHooks.useClimbingStore.getState();

        expect(currentSession.attempts[0].id).toBe('1');
        
    })
})


const generateIntegrationApi: (mockStorage: any) => Api = (mockStorage) => {

    return {
    
        Profile: {
            registerUser: async (username, system) => {
                mockStorage.username = username;
                mockStorage.system = system;
            },
            getGradingSystemOptions: async () => {
               return []
            },

            registerGyms: async (gyms) => {
                mockStorage.climbingGyms = gyms;
            },
    
            getUser: async () => {
                return { climbingGyms: [] }
            }
        },
    
        Climbing: {
            getGrades: async(system) => {
                return [{
                    systemId: '1',
                    name: '4',
                    palette: Palette.deepPurple,
                    hardness: 1
                }];
            },
    
            getRoutes: async(gym) => {
                return [{
                    gymId: '1',
                    grade: {
                        systemId: '1',
                        name: '4',
                        palette: Palette.deepPurple,
                        hardness: 1
                    },
                    name: 'route',
                    id: '1',
                    mode: 'top-rope',
                    retired: false
                }];
            },
    
            saveRoutes: async (routes) => {mockStorage.routes = routes},
    
            saveSession: async (session) => {mockStorage.session = session},
    
            getSessions: async(gym) => {
                return [{
                    id: '1',
                    place: { id: '1', name: 'gym', address: '', type: 'gym'},
                    startTime: new Date(),
                    endTime: new Date(),
                    playsAlarm: false,
                    routeObjective: 0,
                    attempts: [],
                    observation: '',
                }]
            }
        }
    }
}