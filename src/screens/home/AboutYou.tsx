import { View, Text, StyleSheet } from 'react-native';
import { Palette, TextButton } from '../../design-system';
import Label from './shared/Label';

const AboutYou = () =>
{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Sobre Você:
            </Text>
            <Text style={styles.text}>
                Continue se esforçando!
            </Text>
            <Label title='Já foi escalar' value='3 vezes'/>
            <Label title='Escala' value='5 vias por seção'/>
            <Label title='Modalidade favorita' value='Top Rope'/>
            <Label title='Graduação média' value='5' color={Palette.red.t900}/>
            <Label title='Consegue escalar' value='6B' color={Palette.green.t900}/>
            <View style={styles.buttonContainer}>
                <TextButton
                    label="VER PERFIL"
                    onPress={() => {}}
                    accessibilityLabel='ver-perfil'
                    size='small'
                    sourceLeft='profile'
                    status='secondary'
                />
            </View>
        </View>
    )
}

export default AboutYou;

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
            fontSize: 12,
            lineHeight: 18,
            color: Palette.grey.t900,
            marginBottom: 16
        },

        buttonContainer: {
            alignSelf: 'flex-end',
            marginTop: 8
        }
    }
)