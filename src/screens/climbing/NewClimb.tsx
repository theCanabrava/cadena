import { View, StyleSheet } from 'react-native';
import { Palette } from '../../design-system';
import Header from '../shared/Header';

const NewClimb = () =>
{
    return (
        <View style={styles.container}>
            <Header title='Nova escalada'/>
        </View>
    )
}

export default NewClimb;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: Palette.deepPurple.t50,
            alignItems: 'stretch'
        }
    }
)