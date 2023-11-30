import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { Palette, TextButton, UnderlineButton } from '../../../design-system';
import { HomeNavigationProps } from '../../navigator/HomeStack';
import Graph from './Graph';

const Progress = () =>
{
    const navigation = useNavigation<HomeNavigationProps>();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Seu progresso:
            </Text>
            <Text style={styles.text}>
                Acompanhe a sua evolução a cada nova escalada
            </Text>
            <View style={styles.dashboard}>
                <UnderlineButton
                    label='Vias'
                    accessibilityLabel='vias'
                    onPress={() => {}}
                    status='selected'
                />
                <UnderlineButton
                    label='Pontos'
                    accessibilityLabel='pontos'
                    onPress={() => {}}
                    status='unselected'
                />
                <UnderlineButton
                    label='Esforço'
                    accessibilityLabel='esforço'
                    onPress={() => {}}
                    status='unselected'
                />
            </View>
            <Graph/>
            <View style={styles.buttonContainer}>
                <TextButton
                    label="NOVA SEÇÃO"
                    onPress={() => navigation.navigate('home/new-climb')}
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
            fontSize: 14,
            lineHeight: 20,
            color: Palette.grey.t900,
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
        },

        dashboard: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 16
        }
    }
)