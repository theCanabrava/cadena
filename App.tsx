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
    }
  }
})

const App = () =>
(
  <Navigator/>
)

export default App;

