import { useProfileStore, profileActions } from "./profile";

const State = {
    stateHooks: {
        useProfileStore
    },

    dispatch: {
        profileActions
    }
}

export default State;