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

    configure: (apiImplementation: Api) => {
        setApi(apiImplementation);
        profileActions.loadState();
    }
}

export default State;