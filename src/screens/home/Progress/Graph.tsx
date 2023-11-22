import { View, Text, StyleSheet } from 'react-native';
import { Palette } from '../../../design-system';

const Graph = () => {

    return (
        <View style={styles.container}>
            <Bar value={4/7} label={4} color={Palette.deepPurple.t600} date={new Date()}/>
            <Bar value={6/7} label={6} color={Palette.orange.t600} date={new Date()}/>
            <Bar value={2/7} label={2} color={Palette.green.t600} date={new Date()}/>
            <Bar value={7/7} label={7} color={Palette.deepPurple.t600} date={new Date()}/>
            <Bar value={0} label={0} color={Palette.deepPurple.t100}/>
            <Bar value={0} label={0} color={Palette.deepPurple.t100}/>
            <Bar value={0} label={0} color={Palette.deepPurple.t100}/>
            <Bar value={0} label={0} color={Palette.deepPurple.t100}/>
            <View style={styles.underline}/>
        </View>
    )

}

const Bar = ({value, label, color, date}: {value: number, label: number, color: string, date?: Date}) => {

    const labelStyle = { ...styles.barLabel };
    if(label === 0) labelStyle.color === Palette.grey.t500;

    const barStyle = { 
        ...styles.bar, 
        backgroundColor: color,
        height: value > 0 ? value * 140 : 9
    };

    const dateString = date ? `${date.getDate()}/${date.getMonth()+1}` : '';
    

    return (
        <View>
            <Text style={styles.barLabel}>
                {label === 0 ? '-' : label}
            </Text>
            <View style={barStyle}/>
            <Text style={styles.dateLabel}>
                {dateString}
            </Text>
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
            marginBottom: 24
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
        },

        dateLabel: {
            fontSize: 10,
            lineHeight: 18,
            fontFamily: 'Roboto-Regular',
            color: Palette.grey.t900,
            transform: [{rotate: '-45deg'}],
            height: 18,
            width: 27,
            position: 'relative',
            right: 12,
            marginTop: 5
        },

        underline: {
            position: 'absolute',
            bottom: 22,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: Palette.deepPurple.t300
        }

    }
)