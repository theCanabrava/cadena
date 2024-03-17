import { Platform, SafeAreaView, StatusBar, UIManager } from 'react-native';
import State from './src/business-logic';
import Navigator from './src/navigator';
import StorageApi from './src/storage-api';
import { Palette } from './src/design-system';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

State.configure(StorageApi)

const App = () =>
(
  <SafeAreaProvider>
    <StatusBar backgroundColor={Palette.deepPurple.t900}/>
    <SafeAreaView style={{flex: 1, backgroundColor: Palette.deepPurple.t900}}>
      <Navigator/>
    </SafeAreaView>
  </SafeAreaProvider>
)

export default App;
