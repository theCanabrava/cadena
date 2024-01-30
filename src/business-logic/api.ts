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

export type GradeSystem = {
    id: string,
    name: string
}

export type ClimbingGym = {
    id: string,
    name: string,
    address: string,
    type: 'gym' | 'craig'
}