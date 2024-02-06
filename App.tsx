import { Platform, UIManager } from 'react-native';
import State from './src/business-logic';
import { Palette } from './src/design-system';
import Navigator from './src/navigator';

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
    ]
  },

  Climbing: {
    getGrades: async () => {
      return [
        {
          systemId: '2',
          name: '4',
          hardness: 1,
          pallete: Palette.deepPurple
        },
        {
          systemId: '2',
          name: '4+',
          hardness: 2,
          pallete: Palette.deepPurple
        },
        {
          systemId: '2',
          name: '5',
          hardness: 3,
          pallete: Palette.orange
        },
        {
          systemId: '2',
          name: '5+',
          hardness: 4,
          pallete: Palette.orange
        },
        {
          systemId: '2',
          name: '6a',
          hardness: 5,
          pallete: Palette.green
        },
        {
          systemId: '2',
          name: '6b',
          hardness: 6,
          pallete: Palette.green
        },
        {
          systemId: '2',
          name: '6c',
          hardness: 7,
          pallete: Palette.green
        },
      ]
    }
  }
})

const App = () =>
(
  <Navigator/>
)

export default App;

