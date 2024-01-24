const mockApi = {
    Profile: {
        registerUser: async (username: string, system: GradeSystem) => {},
        getGradingSystemOptions: async () => {
            const options: GradeSystem[] = [];
            return options;
        }
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