import { Text, View, StyleSheet } from 'react-native';
import { Dropdown, Palette } from '../../design-system';
import Header from '../shared/Header';

const NewClimb = () =>
{
    return (
        <View style={styles.container}>
            <Header title='Nova escalada'/>
            <View style={styles.form}>
                <Text style={styles.intro}>
                    Para começar uma nova escalada, preencha os campos obrigatórios e Clique em “Iniciar”.
                </Text>
                <Dropdown
                    label='Local:'
                    placeholder='Aonde você vai escalar?'
                    option={{id: '1', value: 'Rokaz - Savassi'}}
                    selectedOption={(v) => {console.log('Selected ', v)}}
                    options={[{id: '1', value: 'Rokaz - Savassi'}]}
                    accessibilityLabel='local'
                    obrigatory
                />
            </View>
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
        },

        form: {
            alignItems: 'stretch',
            margin: 24
        },

        intro: {
            fontFamily: 'Roboto-Regular',
            fontSize: 12,
            lineHeight: 18,
            marginBottom: 16,
            color: Palette.grey.t900
        }
    }
)