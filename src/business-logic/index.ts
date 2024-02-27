import { Api, setApi } from "./api";
import { climbingActions, useClimbingStore } from "./climbing";
import { useProfileStore, profileActions } from "./profile";

const State = {
    stateHooks: {
        useProfileStore,
        useClimbingStore
    },

    dispatch: {
        profileActions,
        climbingActions
    },

    configure: async (apiImplementation: Api) => {
        setApi(apiImplementation);
        const result = await profileActions.loadState();
        if(result.success) {
            await climbingActions.loadSessions(result.climbingGyms[0]);
        }
    }
}

export default State;