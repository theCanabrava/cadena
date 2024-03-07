import State from ".";
import { Api, ClimbingGym } from "./api";

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

    it('Registers a new user', async () => {
        const storage = {username: '', system: {id: '', name: ''}};
        await State.configure(generateIntegrationApi(storage));
        await State.dispatch.profileActions.registerUser('user', {id: '1', name: 'Grade'});

        expect(storage.username).toBe('user');
        expect(storage.system.id).toBe('1');
        
    })

    it('Adds a gym if none exists', async () => {
        await State.configure(generateIntegrationApi({}));
        await State.dispatch.profileActions.editGym({name: 'gym', id: '1', address: '', type: 'gym'});

        const { climbingGyms } = State.stateHooks.useProfileStore.getState();
        expect(climbingGyms.length).toBe(1);

    })

    it('Edits a gym if one with same id exists', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.profileActions.editGym({name: 'gym', id: '2', address: '', type: 'gym'});
        await State.dispatch.profileActions.editGym({name: 'updated-gym', id: '2', address: '', type: 'gym'});

        const { climbingGyms } = State.stateHooks.useProfileStore.getState();
        expect(climbingGyms.length).toBe(1);
        expect(climbingGyms[0].name).toBe('updated-gym');
    })

    it('Removes a gym from registered list', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.profileActions.editGym({name: 'gym', id: '2', address: '', type: 'gym'});
        await State.dispatch.profileActions.removeGym({name: 'gym', id: '2', address: '', type: 'gym'});

        const { climbingGyms } = State.stateHooks.useProfileStore.getState();
        expect(climbingGyms.length).toBe(0);
            
    })

    it('Submit registered gyms to the API', async () => {
        const storage: { climbingGyms: ClimbingGym[] } = { climbingGyms: [] }
        await State.configure(generateIntegrationApi(storage));
        await State.dispatch.profileActions.editGym({name: 'gym', id: '1', address: '', type: 'gym'});
        await State.dispatch.profileActions.submitGyms();

        expect(storage.climbingGyms.length).toBe(1);

    })

    it('Logs in', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.profileActions.registerUser('user', {id: '1', name: 'Grade'});
        await State.dispatch.profileActions.editGym({name: 'gym', id: '1', address: '', type: 'gym'});
        await State.dispatch.profileActions.logIn();

        const { loggedIn } = State.stateHooks.useProfileStore.getState();

        expect(loggedIn).toBe(true);
    })

    it('Logs in automatically', async () => {

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

    it('Toggles the gym modal flag', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.profileActions.toggleGymModal(true);

        const { displayGymSelector } = State.stateHooks.useProfileStore.getState();

        expect(displayGymSelector).toBe(true);
    })

    it('Selects a gym', async () => {

        await State.configure(generateIntegrationApi({}));
        await State.dispatch.profileActions.selectGym({name: 'gym', id: '1', address: '', type: 'gym'});

        const { selectedGym } = State.stateHooks.useProfileStore.getState();
        expect(selectedGym.name).toBe('gym');

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
                return [];
            },
    
            getRoutes: async(gym) => {
                return [];
            },
    
            saveRoutes: async (routes) => {},
    
            saveSession: async (session) => {},
    
            getSessions: async(gym) => {
                return []
            }
        }
    }
}