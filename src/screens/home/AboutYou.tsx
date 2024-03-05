import { View, Text, StyleSheet } from 'react-native';
import { Icon, Palette, TextButton } from '../../design-system';
import Label from './shared/Label';
import State from '../../business-logic';
import { useMemo } from 'react';
import { Session } from '../../business-logic/api';

const AboutYou = () =>
{
    const { sessions } = State.stateHooks.useClimbingStore();

    const summary = useMemo(() => {
        
        return {
            averageLength: getAverageLength(sessions),
            favorite: getFavoriteMode(sessions),
            averageGrade: getAverageDificulty(sessions),
            maxGrade: getMaxGrade(sessions)
        }

    }, [sessions]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Sobre você:
            </Text>
            <Text style={styles.text}>
                Continue se esforçando!
            </Text>
            <View style={styles.content}>
                <ProfileBadge />
                <Label title='Já foi escalar' value={`${sessions.length} vezes`}/>
                <Label title='Escala' value={`${summary.averageLength} vias por seção`}/>
                <Label title='Modalidade favorita' value={`${summary.favorite}`}/>
                <Label title='Graduação média' value={summary.averageGrade.name} color={summary.averageGrade.palette.t900}/>
            </View>
            <ClimbUpTo grade={summary.maxGrade.name} palette={summary.maxGrade.palette}/>
            <View style={styles.buttonContainer}>
                <TextButton
                    label="VER PERFIL"
                    onPress={() => {}}
                    accessibilityLabel='ver-perfil'
                    size='small'
                    sourceLeft='profile'
                    status='disabled'
                />
            </View>
        </View>
    )
}

export default AboutYou;

const ProfileBadge = () => {

    const { username } = State.stateHooks.useProfileStore();
    const { sessions } = State.stateHooks.useClimbingStore();

    const timeString = useMemo(() => {
        if(sessions.length === 0) return 'Ainda não escalou';

        const today = new Date();
        const years = today.getFullYear() - sessions[0].startTime.getFullYear();
        const months = today.getMonth() - sessions[0].startTime.getMonth();

        if(years > 0) return `Escala há ${years} ano${years>1 ? 's' : ''}.`;
        else if(months > 0) return `Escala há ${months} ${months>1 ? 'meses' : 'mês'}.`;
    }, [sessions])

    return (
        <View style={profileStyles.container}>
            <View style={profileStyles.picture}>
                <Icon
                    source='camera'
                    primary={Palette.orange.t600}
                    height={40}
                    width={40}
                />
            </View>
            <View>
                <Text style={profileStyles.username}>
                    {username}
                </Text>
                <Text style={profileStyles.climbs}>
                    {timeString}
                </Text>
            </View>
        </View>
    )
}


const ClimbUpTo = ({grade, palette}: {grade: string, palette: { t50: string, t900: string}}) => {


    const containerStyle = {
        ...climbUpToStyles.container,
        backgroundColor: palette.t50
    };

    const gradeStyle = {
        ...climbUpToStyles.grade,
        color: palette.t900
    };

    return (
        <View style={containerStyle}>
            <Text style={climbUpToStyles.label}>
                Consegue escalar:
            </Text>
            <Text style={gradeStyle}>
                {grade}
            </Text>
        </View>
    )
}

const getAverageLength = (sessions: Session[]) => {

    let totalAttempts = 0;
    for(let session of sessions) totalAttempts += session.attempts.length;
    return Math.floor(totalAttempts / sessions.length);

}

const getFavoriteMode = (sessions: Session[]) => {

    const account = {
        mode: 'top-rope',
        diference: 0
    }

    for(let session of sessions) {
        for(let attempt of session.attempts) {
            if(account.mode === attempt.route!.mode) account.diference += 1;
            else account.diference -= 1;

            if(account.diference <= 0) {
                account.diference = 0;
                account.mode = attempt.route!.mode;
            }
        }
    }

    const dictionary = {
        'top-rope': 'Top Rope',
        'lead': 'Guiada',
        'boulder': 'Boulder'
    }

    return dictionary[account.mode as 'top-rope' | 'lead' | 'boulder']

}

const getAverageDificulty = (sessions: Session[]) => {

    const account = {
        grade: sessions[0].attempts[0].route!.grade,
        diference: 0
    }

    for(let session of sessions) {
        for(let attempt of session.attempts) {
            if(account.grade.hardness === attempt.route!.grade.hardness) account.diference += 1;
            else account.diference -= 1;

            if(account.diference <= 0) {
                account.diference = 0;
                account.grade = attempt.route!.grade;
            }
        }
    }

    return account.grade;

}

const getMaxGrade = (sessions: Session[]) => {

    let grade = { ...sessions[0].attempts[0].route!.grade, hardness: -1 };

    for(let session of sessions) for(let attempt of session.attempts) {
        if(attempt.status === 'redpoint' && attempt.route!.grade.hardness > grade.hardness) {
            grade = attempt.route!.grade;
        }
    }

    return grade;

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
            paddingVertical: 16,
            paddingHorizontal: 8,
        },

        content: {
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            paddingHorizontal: 8
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
            marginBottom: 8
        },

        buttonContainer: {
            alignSelf: 'flex-end',
            marginTop: 16,
            paddingHorizontal: 8
        }
    }
)

const profileStyles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            gap: 12,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 8
        },

        picture: {
            height: 64,
            width: 64,
            borderRadius: 32,
            backgroundColor: Palette.orange.t300,
            justifyContent: 'center',
            alignItems: 'center'
        },

        username: {
            fontFamily: 'Roboto-Bold',
            fontSize: 16,
            color: Palette.grey.t900,
        },

        climbs: {
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            color: Palette.grey.t900,
        }


    }
)

const climbUpToStyles = StyleSheet.create({

    container: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: Palette.green.t50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    label: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: Palette.grey.t900,
        marginBottom: 2
    },

    grade: {
        fontFamily: 'Roboto-Bold',
        fontSize: 24,
        color: Palette.green.t900
    }

})