import { Api, setApi } from "./api";
import { useClimbingStore } from "./climbing";
import { useProfileStore, profileActions } from "./profile";

const State = {
    stateHooks: {
        useProfileStore,
        useClimbingStore
    },

    dispatch: {
        profileActions
    },

    configure: (apiImplementation: Api) => {
        setApi(apiImplementation);
        profileActions.loadState();
    }
}

export default State;