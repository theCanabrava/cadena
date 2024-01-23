import { Platform, UIManager } from 'react-native';
import State from './src/business-logic/intex';
import Navigator from './src/navigator';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

State.configure({
  Profile: {
    registerUser: async u => {
      console.log('Mock register of', u)
    },

    getGradingSystems: async () =>  [
      {
        id: 1,
        name: 'Escala Font'
      },
      {
        id: 2,
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

