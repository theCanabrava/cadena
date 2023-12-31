import { Platform, UIManager } from 'react-native';
import Navigator from './src/navigator';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () =>
(
  <Navigator/>
)

export default App;

