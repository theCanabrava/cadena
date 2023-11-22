import { View, Text, StyleSheet } from 'react-native';
import { Palette, TextButton } from '../../design-system';
import Label from './shared/Label';

const Latest = () =>
{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Mais recente:
            </Text>
            <Text style={styles.text}>
                Veja os dados da sua última escalada
            </Text>
            <Label title='Local' value='Rokaz - Savassi'/>
            <Label title='Data' value='11/09/2023'/>
            <Label title='Duração' value='1:35'/>
            <Label title='Vias escaladas' value='10'/>
            <Label title='Graduação' value='5' color={Palette.orange.t900}/>
            <Label title='Esforço' value='3.5' color={Palette.green.t900}/>
            <View style={styles.buttonContainer}>
                <TextButton
                    label="VER DETALHES"
                    onPress={() => {}}
                    accessibilityLabel='ver-detalhes'
                    size='small'
                    sourceLeft='mountain-details'
                    status='secondary'
                />
            </View>
        </View>
    )
}

export default Latest;

const styles = StyleSheet.create(
    {
        container: {
            borderRadius: 16,
            backgroundColor: Palette.mono.t50,
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            marginTop: 24,
            marginHorizontal: 24,
            padding: 16
        },

        title: {
            fontFamily: 'Roboto-Bold',
            fontSize: 16,
            color: Palette.grey.t900
        },

        text: {
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            lineHeight: 20,
            color: Palette.grey.t900,
            marginBottom: 16
        },

        buttonContainer: {
            alignSelf: 'flex-end',
            marginTop: 8
        }
    }
)