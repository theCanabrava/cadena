import { Platform, SafeAreaView, UIManager } from 'react-native';
import State from './src/business-logic';
import Navigator from './src/navigator';
import StorageApi from './src/storage-api';
import { Palette } from './src/design-system';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

State.configure(StorageApi)

const App = () =>
(
  <SafeAreaView style={{flex: 1, backgroundColor: Palette.deepPurple.t900}}>
    <Navigator/>
  </SafeAreaView>
)

export default App;
