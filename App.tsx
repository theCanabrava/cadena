import { Platform, UIManager } from 'react-native';
import State from './src/business-logic';
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
  }
})

const App = () =>
(
  <Navigator/>
)

export default App;

