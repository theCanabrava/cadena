import { View, Text, StyleSheet } from 'react-native';
import { Palette, TextButton } from '../../design-system';
import Label from './shared/Label';
import State from '../../business-logic';
import { useMemo } from 'react';
import FormatDate from '../climbing/session/FormatDate';
import { Attempt, Session } from '../../business-logic/api';

const Latest = () =>
{
    const { sessions } = State.stateHooks.useClimbingStore();
    if(sessions.length <= 0) return null;

    const summary = useMemo(() => {
        const session = sessions[sessions.length-1];
        

        return {
            session,
            duration: getSessionDuration(session),
            maxGrade: getMaxGrade(session.attempts),
            effort: getAverageEffort(session.attempts)
        }
    }, [sessions]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Mais recente:
            </Text>
            <Text style={styles.text}>
                Veja os dados da sua última escalada
            </Text>
            <Label title='Local' value={summary.session.place.name}/>
            <Label title='Data' value={FormatDate.toDay(summary.session.startTime)}/>
            <Label title='Duração' value={summary.duration}/>
            <Label title='Vias escaladas' value={String(summary.session.attempts.length)}/>
            <Label title='Graduação' value={summary.maxGrade.grade} color={summary.maxGrade.color}/>
            <Label title='Esforço' value={summary.effort} color={Palette.green.t900}/>
            <View style={styles.buttonContainer}>
                <TextButton
                    label="VER DETALHES"
                    onPress={() => {}}
                    accessibilityLabel='ver-detalhes'
                    size='small'
                    sourceLeft='mountain-details'
                    disabled
                />
            </View>
        </View>
    )
}

export default Latest;

const getSessionDuration = (session: Session) => {

    const durationMs = session.endTime.getTime() - session.startTime.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60)); 
    const minutes = Math.floor(durationMs/ (1000 * 60 * 60)) % 60;

    return `${hours}:${String(minutes).padStart(2, '0')}`;
}

const getAverageEffort = (attempts: Attempt[]) => {

    let average = 0;

    for(let attempt of attempts) average += attempt.dificulty;
    if(attempts.length > 0) average /= attempts.length;

    return String(Math.round(average*10)/10);

}

const getMaxGrade = (attempts: Attempt[]) => {

    let color = Palette.grey.t900;
    let grade = '';
    let hardness = -1;

    for(let attempt of attempts) {
        if(attempt.route?.grade.hardness ?? -1 > hardness) {
            hardness = attempt.route!.grade.hardness;
            color = attempt.route!.grade.palette.t900;
            grade = attempt.route!.grade.name;
        }
    }

    return { color, grade };
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
            fontSize: 14,
            lineHeight: 20,
            color: Palette.grey.t900,
            marginBottom: 16
        },

        buttonContainer: {
            alignSelf: 'flex-end',
            marginTop: 8
        }
    }
)