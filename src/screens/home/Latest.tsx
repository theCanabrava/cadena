import { View, Text, StyleSheet } from 'react-native';
import { Palette, TextButton } from '../../design-system';

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
            <Label title='Graduação' value='5' color={Palette.red.t900}/>
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

const Label = ({title, value, color = Palette.grey.t900}: {title: string, value: string, color?: string}) => 
{
    const valueStyle = { ...styles.labelValue, color };

    return (
        <View style={styles.labelContainer}>
            <Text style={styles.labelTitle}>
                {title}:
            </Text>
            <Text style={valueStyle}>
                {value}
            </Text>
        </View>
    )
}



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
        },

        labelContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 8
        },

        labelTitle: {
            fontFamily: 'Roboto-Regular',
            fontSize: 12,
            color: Palette.grey.t900
        },

        labelValue: {

            fontFamily: 'Roboto-Bold',
            fontSize: 16,
            color: Palette.grey.t900
        }
    }
)