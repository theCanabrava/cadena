import { View, Text, StyleSheet } from 'react-native';
import { Palette } from '../../../design-system';
import State from '../../../business-logic';
import { Attempt } from '../../../business-logic/api';
import { useMemo } from 'react';

const Graph = () => {

    const sessions = State.stateHooks.useClimbingStore(s => s.sessions.filter((_, i) => i<8));

    const barElements = useMemo(() => {
        const max = Math.max(...sessions.map(s => s.attempts.length));
        const bE = sessions.map(s => (
    
            <Bar
                key={s.id}
                value={s.attempts.length/max}
                label={s.attempts.length}
                color={getBarColor(s.attempts)}
                date={s.startTime}
            />
    
        ))
        
        while (bE.length < 8) {
            bE.push(<Bar key={String(bE.length)} value={0} label={0} color={Palette.deepPurple.t100}/>);
        }

        return bE;
    }, [sessions]);

    return (
        <View style={styles.container}>
            {barElements}
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

const getBarColor = (attempts: Attempt[]) => {

    let color = Palette.grey.t600;
    let hardness = -1;

    for(let attempt of attempts) {
        if(attempt.route?.grade.hardness ?? -1 > hardness) {
            hardness = attempt.route!.grade.hardness;
            color = attempt.route!.grade.palette.t600;
        }
    }

    return color;

}

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