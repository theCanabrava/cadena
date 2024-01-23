const mockApi = {
    Profile: {
        registerUser: async (username: string) => {},
        getGradingSystems: async () => {
            const systems: GradeSystem[] = [];
            return systems;
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
    id: number,
    name: string
}