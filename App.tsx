import { Platform, UIManager } from 'react-native';
import State from './src/business-logic';
import Navigator from './src/navigator';
import StorageApi from './src/storage-api';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

State.configure(StorageApi)

const App = () =>
(
  <Navigator/>
)

export default App;
