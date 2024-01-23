const mockApi = {
    Profile: {
        registerUser: async (username: string) => {}
    }
}

export type Api = typeof mockApi;

export let api: Api = mockApi;
export const setApi = (apiImplementation: Api) => { 

    api = apiImplementation; 
    
}
