import { View, Text, StyleSheet } from 'react-native';
import { Palette } from '../../../design-system';
import State from '../../../business-logic';
import { Attempt, Session } from '../../../business-logic/api';
import { useMemo } from 'react';

const Graph = ({mode}: {mode: 'ammount' | 'duration' | 'effort'}) => {

    const sessions = State.stateHooks.useClimbingStore(s => s.sessions.filter((_, i) => i<8));

    const barElements = useMemo(() => {
        const max = extractGraphData[mode].max(sessions);
        const bE = sessions.map(s => (
    
            <Bar
                key={s.id}
                value={extractGraphData[mode].value(s, max)}
                label={extractGraphData[mode].label(s)}
                color={extractGraphData[mode].barColor(s.attempts)}
                date={s.startTime}
            />
    
        ))
        
        while (bE.length < 8) {
            bE.push(<Bar key={String(bE.length)} value={0} label={'0'} color={Palette.deepPurple.t100}/>);
        }

        return bE;
    }, [sessions, mode]);

    return (
        <View style={styles.container}>
            {barElements}
            <View style={styles.underline}/>
        </View>
    )

}

const Bar = ({value, label, color, date}: {value: number, label: string, color: string, date?: Date}) => {

    const labelStyle = { ...styles.barLabel };
    if(label === '0') labelStyle.color === Palette.grey.t500;

    const barStyle = { 
        ...styles.bar, 
        backgroundColor: color,
        height: value > 0 ? value * 140 : 9
    };

    const dateString = date ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth()+1).padStart(2, '0')}` : '';
    
    return (
        <View>
            <Text style={styles.barLabel}>
                {label === '0' ? '-' : label}
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

const getAverageEffort = (attempts: Attempt[]) => {

    let average = 0;

    for(let attempt of attempts) average += attempt.dificulty;
    if(attempts.length > 0) average /= attempts.length;

    return average;

}

const extractGraphData = {

    ammount: {
        max: (sessions: Session[]) =>  Math.max(...sessions.map(s => s.attempts.length)),
        value: (session: Session, max: number ) => session.attempts.length/max,
        label: (session: Session) => String(session.attempts.length),
        barColor: getBarColor
    },

    duration: {
        max: (sessions: Session[]) =>  Math.max(...sessions.map(s => s.endTime.getTime() - s.startTime.getTime())),
        value: (session: Session, max: number ) => (session.endTime.getTime() - session.startTime.getTime())/max,
        label: (session: Session) => {
            const duration = session.endTime.getTime() - session.startTime.getTime();
            const hours = Math.floor(duration / (1000 * 60 * 60)); 
            const hourDecimal = Math.floor(duration/ (1000 * 60 * 6)) % 10;

            return `${hours}.${hourDecimal}`;
        },
        barColor: getBarColor
    },

    effort: {
        max: (sessions: Session[]) =>  Math.max(...sessions.map(s => getAverageEffort(s.attempts))),
        value: (session: Session, max: number ) => getAverageEffort(session.attempts)/max,
        label: (session: Session) => String(Math.round(getAverageEffort(session.attempts)*10)/10),
        barColor: getBarColor
    }

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