import { Api, setApi } from "./api";
import { useProfileStore, profileActions } from "./profile";

const State = {
    stateHooks: {
        useProfileStore
    },

    dispatch: {
        profileActions
    },

    configure: (apiImplementation: Api) => {
        setApi(apiImplementation);
    }
}

export default State;