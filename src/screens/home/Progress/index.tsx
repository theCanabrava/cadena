import { View, Text, StyleSheet } from 'react-native';
import { Palette, TextButton } from '../../../design-system';

const Progress = () =>
{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Seu progresso:
            </Text>
            <Text style={styles.text}>
                Acompanhe a sua evolução a cada nova escalada
            </Text>
            <View style={styles.buttonContainer}>
                <TextButton
                    label="NOVA SEÇÃO"
                    onPress={() => {}}
                    accessibilityLabel='nova-seção'
                    size='small'
                    sourceLeft='logo'
                />
            </View>
        </View>
    )
}

export default Progress;

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