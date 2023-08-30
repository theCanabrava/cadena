import { Platform, UIManager } from 'react-native';
import AddGym from './src/screens/add-gym'
import NewClimb from './src/screens/climbing/NewClimb';
import Home from './src/screens/home';
import Welcome from './src/screens/Welcome';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () =>
(
  <NewClimb/>
)

export default App;

