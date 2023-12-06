import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { Palette, TextButton } from '../../design-system';
import { HomeNavigationProps } from '../../navigator/HomeStack';

const LetsStart = () =>
{
    const navigation = useNavigation<HomeNavigationProps>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Vamos começar!
            </Text>
            <Text style={styles.text}>
                Você ainda não possui nenhuma escalada registrada. Clique em “Continuar” para cadastrar suas vias favoritas e registrar sua rotina de escalada!
            </Text>
            <View style={styles.imagePlaceholder}/>
            <View style={styles.buttonContainer}>
                <TextButton
                    label="CONTINUAR"
                    onPress={() => navigation.navigate('home/new-climb')}
                    accessibilityLabel='continuar'
                    size='small'
                    sourceLeft='logo'
                />
            </View>
        </View>
    )
}

export default LetsStart;

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
            marginBottom: 8
        },

        imagePlaceholder: {
            alignSelf: 'center',
            height: 154,
            width: 154,
            backgroundColor: Palette.green.t300,
            borderRadius: 77,
            marginBottom: 8
        },

        buttonContainer: {
            alignSelf: 'flex-end'
        }
    }
)