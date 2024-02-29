import { Platform, UIManager } from 'react-native';
import State from './src/business-logic';
import { Palette } from './src/design-system';
import Navigator from './src/navigator';
import { Attempt, ClimbingGym, Route } from './src/business-logic/api';
import uuid from 'react-native-uuid';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

State.configure({
  Profile: {
    registerUser: async (u, g) => {
    },

    registerGyms: async () => {},

    getGradingSystemOptions: async () =>  [
      {
        id: '1',
        name: 'Graduação Francesa'
      },
      {
        id: '2',
        name: 'Graduação Brasileira'
      }
    ],

    getUser: async () => 'Victor Canabrava',

    getGyms: async () => [
      {
        id: '1',
        name: 'Rokaz - Savassi',
        address: 'Rua Antônio de Albuquerque, 189',
        type: 'gym'
      }
    ]

  },

  Climbing: {
    getGrades: async () => {
      return [
        {
          systemId: '2',
          name: '4',
          hardness: 1,
          palette: Palette.deepPurple
        },
        {
          systemId: '2',
          name: '4+',
          hardness: 2,
          palette: Palette.deepPurple
        },
        {
          systemId: '2',
          name: '5',
          hardness: 3,
          palette: Palette.orange
        },
        {
          systemId: '2',
          name: '5+',
          hardness: 4,
          palette: Palette.orange
        },
        {
          systemId: '2',
          name: '6a',
          hardness: 5,
          palette: Palette.green
        },
        {
          systemId: '2',
          name: '6b',
          hardness: 6,
          palette: Palette.green
        },
        {
          systemId: '2',
          name: '6c',
          hardness: 7,
          palette: Palette.green
        },
      ]
    },

    getRoutes: async () => [],
    saveRoutes: async () => {},
    saveSession: async () => {},

    getSessions: async (gym) => [
      {
        id: String(uuid.v4()),
        place: gym,
        startTime: new Date('2024-01-23T12:00:00'),
        endTime: new Date('2024-01-23T13:10:00'),
        playsAlarm: false,
        routeObjective: 0,
        observation: '',
        attempts: [makeAttempt(gym, 1, 'redpoint'), makeAttempt(gym, 2, 'redpoint'), makeAttempt(gym, 3, 'worked'), makeAttempt(gym, 4, 'worked'), makeAttempt(gym, 5, 'unfinished')]
      },
      {
        id: String(uuid.v4()),
        place: gym,
        startTime: new Date('2024-01-24T12:00:00'),
        endTime: new Date('2024-01-24T13:30:00'),
        playsAlarm: false,
        routeObjective: 0,
        observation: '',
        attempts: [makeAttempt(gym, 1, 'redpoint'), makeAttempt(gym, 2, 'redpoint'), makeAttempt(gym, 3, 'worked'), makeAttempt(gym, 4, 'worked'), makeAttempt(gym, 5, 'unfinished'), makeAttempt(gym, 5, 'unfinished')]
      },
      {
        id: String(uuid.v4()),
        place: gym,
        startTime: new Date('2024-01-25T12:00:00'),
        endTime: new Date('2024-01-25T13:20:00'),
        playsAlarm: false,
        routeObjective: 0,
        observation: '',
        attempts: [makeAttempt(gym, 1, 'redpoint'), makeAttempt(gym, 2, 'redpoint'), makeAttempt(gym, 3, 'worked'), makeAttempt(gym, 4, 'worked'), makeAttempt(gym, 5, 'worked')]
      },
      {
        id: String(uuid.v4()),
        place: gym,
        startTime: new Date('2024-01-26T12:00:00'),
        endTime: new Date('2024-01-26T13:00:00'),
        playsAlarm: false,
        routeObjective: 0,
        observation: '',
        attempts: [makeAttempt(gym, 1, 'redpoint'), makeAttempt(gym, 2, 'redpoint'), makeAttempt(gym, 2, 'redpoint'), makeAttempt(gym, 3, 'worked')]
      },
      {
        id: String(uuid.v4()),
        place: gym,
        startTime: new Date('2024-01-27T12:00:00'),
        endTime: new Date('2024-01-27T13:26:00'),
        playsAlarm: false,
        routeObjective: 0,
        observation: '',
        attempts: [makeAttempt(gym, 1, 'redpoint'), makeAttempt(gym, 1, 'redpoint'), makeAttempt(gym, 2, 'redpoint'), makeAttempt(gym, 2, 'redpoint'), makeAttempt(gym, 3, 'redpoint'), makeAttempt(gym, 3, 'redpoint'), makeAttempt(gym, 4, 'redpoint'), makeAttempt(gym, 4, 'worked')]
      },
    ]
  }
})

const App = () =>
(
  <Navigator/>
)

export default App;


const makeRoute: (gym: ClimbingGym) => Route = (gym) => ({
  id: gym.id,
  gymId: '1',
  name: 'Default route',
  mode: 'top-rope',
  retired: false,
  grade: {
    systemId: '1',
    hardness: 4,
    palette: Palette.deepPurple,
    name: '4'
  }
})

const makeAttempt: (gym: ClimbingGym, dificulty: 1 | 2 | 3 | 4 | 5, status: 'redpoint' | 'worked' | 'unfinished') => Attempt = (g, d, s) => ({
  id: String(uuid.v4()),
  route: makeRoute(g),
  dificulty: d,
  status: s
})
