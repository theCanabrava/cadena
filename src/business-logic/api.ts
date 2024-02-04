const mockApi = {
    Profile: {
        registerUser: async (username: string, system: GradeSystem) => {},
        getGradingSystemOptions: async () => {
            const options: GradeSystem[] = [];
            return options;
        },
        registerGyms: async (gyms: ClimbingGym[]) => {},
    }
}

export type Api = typeof mockApi;

export let api: Api = mockApi;
export const setApi = (apiImplementation: Api) => { 

    api = apiImplementation; 
    
}


// TYPE DEFINITIONS

export type ClimbingGym = {
    id: string,
    name: string,
    address: string,
    type: 'gym' | 'craig'
}

export type GradeSystem = {
    id: string,
    name: string
}

type Pallete = {
    t50: string,
    t100: string,
    t200: string,
    t300: string,
    t400: string,
    t500: string,
    t600: string,
    t700: string,
    t800: string,
    t900: string,
}
export type Grade = {
    systemId: GradeSystem["id"],
    hardness: number,
    name: string,
    pallete: Pallete
}

export type Session = {
    place: ClimbingGym,
    startTime: Date,
    expectedEndTime?: Date,
    endTime: Date,
    playsAlarm: boolean,
    routeObjective: number,
}