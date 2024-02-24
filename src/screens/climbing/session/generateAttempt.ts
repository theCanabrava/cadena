import uuid from 'react-native-uuid';
import { Attempt } from '../../../business-logic/api';

const generateAttempt: () => Attempt = () => ({
    id: String(uuid.v4()),
    route: undefined,
    dificulty: 3,
    status: 'unfinished'
})

export default generateAttempt;