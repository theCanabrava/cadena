import { View, Text, StyleSheet } from 'react-native';
import { Palette } from '../../../design-system';

const Graph = () => {

    return (
        <View style={styles.container}>
            <Bar value={4/7} label={4} color={Palette.deepPurple.t600}/>
            <Bar value={6/7} label={6} color={Palette.red.t600}/>
            <Bar value={2/7} label={2} color={Palette.green.t600}/>
            <Bar value={7/7} label={7} color={Palette.deepPurple.t600}/>
            <Bar value={0} label={0} color={Palette.deepPurple.t100}/>
            <Bar value={0} label={0} color={Palette.deepPurple.t100}/>
            <Bar value={0} label={0} color={Palette.deepPurple.t100}/>
            <Bar value={0} label={0} color={Palette.deepPurple.t100}/>
        </View>
    )

}

const Bar = ({value, label, color}: {value: number, label: number, color: string}) => {

    const labelStyle = { ...styles.barLabel };
    if(label === 0) labelStyle.color === Palette.grey.t500;

    const barStyle = { 
        ...styles.bar, 
        backgroundColor: color,
        height: value > 0 ? value * 140 : 9
    };
    

    return (
        <View>
            <Text style={styles.barLabel}>
                {label === 0 ? '-' : label}
            </Text>
            <View style={barStyle}/>
        </View>
    )
}

export default Graph;

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            marginBottom: 24,
            borderBottomWidth: 2,
            borderBottomColor: Palette.deepPurple.t300
        },

        barLabel: {
            width: 18,
            height: 18,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 10,
            lineHeight: 18,
            fontFamily: 'Roboto-Regular',
            color: Palette.grey.t900
        },

        bar: {
            width: 18,
            height: 140,
            backgroundColor: Palette.deepPurple.t600,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4
        }


    }
)