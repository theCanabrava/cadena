import { View, Text, StyleSheet, LayoutAnimation, Animated, Easing, Platform } from 'react-native';
import { Palette } from '../../../design-system';
import State from '../../../business-logic';
import { Attempt, Session } from '../../../business-logic/api';
import { useEffect, useMemo, useRef, useState } from 'react';

const Graph = ({mode}: {mode: 'ammount' | 'duration' | 'effort'}) => {

    const sessions = State.stateHooks.useClimbingStore(s => s.sessions.filter((_, i) => i > s.sessions.length - 9));

    const barElements = useMemo(() => {
        const max = extractGraphData[mode].max(sessions);
        const bE = sessions.map((s, i) => (
    
            <Bar
                key={s.id}
                value={extractGraphData[mode].value(s, max)}
                label={extractGraphData[mode].label(s)}
                color={extractGraphData[mode].barColor(s.attempts)}
                date={s.startTime}
                delay={100*i}
            />
    
        ))
        
        while (bE.length < 8) {
            bE.push(<Bar key={String(bE.length)} value={0} label={'0'} color={Palette.deepPurple.t100} delay={0}/>);
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

const BarAndroid = ({value, label, color, date, delay}: {value: number, label: string, color: string, date?: Date, delay: number}) => {

    const [height, setHeight] = useState(9);
    const labelStyle = { ...styles.barLabel };
    if(label === '0') labelStyle.color === Palette.grey.t500;

    useEffect(() =>
    {
        setTimeout(() =>
        {
            setHeight(value > 0 ? value * 140 : 9);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }, delay)
    }, [value]);

    const barStyle = { 
        ...styles.bar, 
        backgroundColor: color,
        height
    };

    const dateString = date ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth()+1).padStart(2, '0')}` : '';

    return (
        <View style={styles.barContainer}>
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

const BarIos = ({value, label, color, date, delay}: {value: number, label: string, color: string, date?: Date, delay: number}) => {

    const labelStyle = { ...styles.barLabel };
    if(label === '0') labelStyle.color === Palette.grey.t500;
    const height = useRef(new Animated.Value(9)).current;

    useEffect(() => {
        setTimeout(() => {
            Animated.timing(height, {
                toValue: value > 0 ? value * 140 : 9,
                duration: 300,
                useNativeDriver: false
            }).start()
        }, delay)
    }, [value])

    const barStyle = { 
        ...styles.bar, 
        backgroundColor: color,
        height
    };

    const dateString = date ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth()+1).padStart(2, '0')}` : '';

    return (
        <View style={styles.barContainer}>
            <Text style={styles.barLabel}>
                {label === '0' ? '-' : label}
            </Text>
            <Animated.View style={barStyle}/>
            <Text style={styles.dateLabel}>
                {dateString}
            </Text>
        </View>
    )
}

const Bar = Platform.OS === 'ios' ? BarIos : BarAndroid;

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
            const minutes = Math.floor(duration/ (1000 * 60)) % 60;

            return `${hours}:${String(minutes).padStart(2, '0')}`;
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
            marginBottom: 24,
            height:181
        },

        barContainer: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center'
        },

        barLabel: {
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