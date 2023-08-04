import { View, Text, StyleSheet } from 'react-native';
import { Palette } from './src/design-system';

const App = () =>
(
  <View style={styles.view}>
    <Text style={styles.text}>
      Boas vindas!
    </Text>
  </View>
)

export default App;

const styles = StyleSheet.create(
  {
    view: {
      flex: 1,
      padding: 24,
      backgroundColor: Palette.deepPurple.t50
    },

    text: {
      fontFamily: 'Roboto-Bold',
      color: Palette.deepPurple.t800,
      fontSize: 24,
      textAlign: 'left'
    }
  }
)