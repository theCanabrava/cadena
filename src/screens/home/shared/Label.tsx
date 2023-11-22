import { View, Text, StyleSheet } from 'react-native';
import { Palette } from '../../../design-system';

const Label = ({title, value, color = Palette.grey.t900}: {title: string, value: string, color?: string}) => 
{
    const valueStyle = { ...styles.value, color };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}:
            </Text>
            <Text style={valueStyle}>
                {value}
            </Text>
        </View>
    )
}

export default Label;


const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 8
        },

        title: {
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            color: Palette.grey.t900
        },

        value: {

            fontFamily: 'Roboto-Bold',
            fontSize: 16,
            color: Palette.grey.t900
        }
    }
)