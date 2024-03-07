import AsyncStorage from "@react-native-async-storage/async-storage"
import StorageApi from "."
import GradingSystems from "./static-data/grading-systems";
import { Route, Session } from "../business-logic/api";
import Grades from "./static-data/grades";

describe('Profile api', () => {

    beforeEach(async () => {
        await AsyncStorage.clear();
    })

    it('registers an user', async () => {
        await StorageApi.Profile.registerUser('user', {id: '1', name: 'system'});
        const { username, gradingSystem } = await StorageApi.Profile.getUser();

        expect(username).toBe('user');
        expect(gradingSystem?.name).toBe('system');
    })

    it('register gyms', async () => {
        await StorageApi.Profile.registerGyms([{id: '1', name: 'gym', address: '', type: 'gym'}]);
        const { climbingGyms } = await StorageApi.Profile.getUser();
        expect(climbingGyms[0].id).toBe('1');
    })

    it('loads grade systems', async () => {
        const gradeSystems = await StorageApi.Profile.getGradingSystemOptions();
        expect(gradeSystems[0].name).toBe('Graduação Brasileira');
    })

})

describe('Climbing api', () => {

    beforeEach(async () => {
        await AsyncStorage.clear();
    })

    it('loads grades', async () => {
        const grades = await StorageApi.Climbing.getGrades(GradingSystems[0]);
        expect(grades[0].name).toBe('4');
    })

    it('saves a route', async () => {
        const route: Route = {
            id: '1',
            gymId: '1',
            grade: Grades[0],
            name: 'route',
            mode: 'top-rope',
            retired: false
        };

        await StorageApi.Climbing.saveRoutes([route]);
        const routes = await StorageApi.Climbing.getRoutes({id: '1', name: '', address: '', type: 'gym'});
        expect(routes[0].name).toBe(route.name);
    })

    it('saves a session', async () => {

        const route: Route = {
            id: '1',
            gymId: '1',
            grade: Grades[0],
            name: 'route',
            mode: 'top-rope',
            retired: false
        };

        await StorageApi.Climbing.saveRoutes([route]);

        const session: Session = {
            id: '1',
            place: {id: '1', name: '', address: '', type: 'gym'},
            startTime: new Date(),
            endTime: new Date(),
            playsAlarm: false,
            routeObjective: 0,
            attempts: [
                {
                    id: '1',
                    route: route,
                    status: 'redpoint',
                    dificulty: 1
                }
            ],
            observation: '',
        }

        await StorageApi.Climbing.saveSession(session);
        const sessions = await StorageApi.Climbing.getSessions({id: '1', name: '', address: '', type: 'gym'});

        expect(sessions[0].id).toBe('1');

    })
})