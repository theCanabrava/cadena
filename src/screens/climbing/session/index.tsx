import { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Modal, Alert } from 'react-native';
import State from '../../../business-logic';
import { Palette, TextButton } from '../../../design-system';
import Header from '../../shared/Header';
import AddClimbModal from './AddClimbModal';
import EditClimbModal from './EditClimbModal';
import FinishClimbModal from './FinishClimbModal';
import FormatDate from './FormatDate';
import RouteCell from './RouteCell';

const Session = () =>
{

    const [ modals, setModals ] = useState({add: false, finish: false});
    const { currentSession } = State.stateHooks.useClimbingStore();

    useEffect(() => {
        State.dispatch.climbingActions.loadRoutes(currentSession.place);
    }, []);

    const attemptCells = currentSession.attempts.map(a => <RouteCell key={a.id} id={a.id}/>);

    return (
        <>
            <View style={styles.container}>
                <Header title='Rokaz - Savassi'/>
                <ScrollView style={styles.formContainer}>
                    <SessionDetails/>
                    <View style={styles.addContainer}>
                        <TextButton
                            label='ADICIONAR VIA'
                            onPress={() => setModals({add: true, finish: false})}
                            accessibilityLabel='adicionar-via'
                            status='outlined'
                        />
                    </View>
                    { attemptCells.length === 0 ? <LetsStart/> : attemptCells }
                </ScrollView>
                    <View style={styles.endContainer}>
                        <TextButton
                            label='FINALIZAR SEÇÃO'
                            onPress={() => setModals({add: false, finish: true})}
                            accessibilityLabel='finalizar'
                            status='carefull'
                        />
                    </View>
            </View>
            <AddClimbModal display={modals.add} onClose={() => setModals({add: false, finish: false})}/>
            <EditClimbModal />
            <FinishClimbModal display={modals.finish} onClose={() => setModals({add: false, finish: false})}/>
        </>
    )
}

const SessionDetails = () =>
{

    const { currentSession } = State.stateHooks.useClimbingStore();
    const [ remainingTime, setRemainintTime ] = useState('00:00');
    const [ expired, setExpired ] = useState(false);

    const filledStyle = { ...styles.filled };
    const unfilledStyle = { ...styles.unfilled };

    if(currentSession.routeObjective > 0) {
        unfilledStyle.flex = currentSession.routeObjective - currentSession.attempts.length;
        filledStyle.flex = currentSession.attempts.length;

        if(unfilledStyle.flex < 0) unfilledStyle.flex = 0;
    }

    useEffect(() => {

        if(currentSession.expectedEndTime !== undefined) {
            let interval = setInterval(() => {
                const now = new Date();
                const remainingMs = currentSession.expectedEndTime!.getTime() - now.getTime();
                const remainingMinutes = (Math.floor(remainingMs / ( 1000 * 60 )) % 60) + 1;
                const remainingHours = Math.floor(remainingMs / ( 1000 * 60 * 60 ));

                setRemainintTime(`${remainingHours}:${String(remainingMinutes).padStart(2, '0')}`);
                if(remainingMs < 0) {
                    setExpired(true);
                    setRemainintTime('00:00');
                    clearInterval(interval);
                    if(currentSession.playsAlarm) Alert.alert("Tempo expirado", "Hora de mandar sua via e se mandar.");
                }

            }, 1000);

            return () => clearInterval(interval);
        }

    }, [])

    return (
        <View style={styles.details}>
            <Text style={styles.detailTitle}>
                Data: <Text style={styles.detailValue}>{FormatDate.toDay(currentSession.startTime)}</Text>
            </Text>
            <View style={styles.timeRow}>
                <Text style={styles.detailTitle}>
                    Início: <Text style={styles.detailValue}>{FormatDate.toHour(currentSession.startTime)}</Text>
                </Text>
                {
                    currentSession.expectedEndTime !== undefined &&
                    <>
                        <Text style={[styles.detailTitle, styles.end]}>
                            Fim: <Text style={styles.detailValue}>{FormatDate.toHour(currentSession.expectedEndTime)}</Text>
                        </Text>
                        <Text style={[styles.detailTitle, styles.detailPurple, styles.remaining]}>
                            Restante: <Text style={styles.detailValue}>{remainingTime}</Text>
                        </Text>
                    </>
                }
            </View>
            <Text style={styles.detailTitle}>
                Vias escaladas: <Text style={styles.detailValue}>{currentSession.attempts.length}</Text>
            </Text>
            {
                currentSession.routeObjective > 0 &&
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={filledStyle}/>
                        <View style={unfilledStyle}/>
                    </View>
                    <Text style={styles.ammount}>
                        {currentSession.routeObjective}
                    </Text>
                </View>
            }
        </View>
    );
}

const LetsStart = () => {

    return (
        <View style={styles.textContainer}>
            <Text style={styles.title}>
                Vamos escalar!
            </Text>
            <Text style={styles.text}>
                Registre as vias que você escalar aqui clicando no botão “Adicionar via”.
            </Text>
            <View style={styles.imagePlaceholder}/>
        </View>
    )
}

export default Session;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flex: 1,
        backgroundColor: Palette.mono.t50
    },

    formContainer: { flex: 1 },

    details: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        margin: 16,
        borderBottomWidth: 2,
        borderBottomColor: Palette.deepPurple.t800
    },

    detailTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: Palette.grey.t900,
        marginBottom: 8
    },

    detailValue: {
        fontFamily: 'Roboto-Regular',
    },

    detailPurple: {
        color: Palette.deepPurple.t900
    },

    timeRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    end: {
        marginLeft: 14
    },

    remaining: {
        flex: 1,
        textAlign: 'right'
    },

    progressContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    progressBar: {
        flex: 1,
        marginRight: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Palette.green.t200,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        overflow: 'hidden'
    },

    filled: {
        flex: 0.3,
        backgroundColor: Palette.green.t600,
        borderRadius: 4
    },

    unfilled: { flex: 0.7 },

    ammount: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: Palette.green.t600
    },

    addContainer: {
        marginHorizontal: 16,
        marginBottom: 24
    },

    textContainer: {
        marginHorizontal: 16
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
        marginBottom: 8
    },

    imagePlaceholder: {
        alignSelf: 'center',
        height: 154,
        width: 154,
        backgroundColor: Palette.green.t300,
        borderRadius: 77,
        marginBottom: 8
    },

    endContainer: {
        margin: 24,
        justifyContent: 'center',
        alignItems: 'stretch'
    },

    cover: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})

