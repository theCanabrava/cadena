import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, LayoutAnimation } from 'react-native';
import State from '../../business-logic';
import { Checkbox, DatePicker, Dropdown, Input, KeyboardListener, Palette, TextButton } from '../../design-system';
import { HomeNavigationProps } from '../../navigator/HomeStack';
import Header from '../shared/Header';

const INPUT_POSITION = 485;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
const BOTTOM_PADDING = 16
const NewClimb = () =>
{
    const { selectedGym, climbingGyms } = State.stateHooks.useProfileStore();
    const { currentSession } = State.stateHooks.useClimbingStore();
    const navigation = useNavigation<HomeNavigationProps>();
    const [ top, setTop ] = useState(0);
    const [ formStyle, setFormStyle ] = useState({...styles.form})

    useEffect(() => {
        State.dispatch.climbingActions.startSession(selectedGym);
    }, [selectedGym])

    useEffect(() =>
    {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setFormStyle(f => ({...f, top}))
    }, [top, setFormStyle])

    return (
        <View style={styles.container}>
            <KeyboardListener
                onShow={(e) => {
                    const keyboardHeight = e.endCoordinates.height;
                    const topOffset = Math.floor((INPUT_POSITION + keyboardHeight) - DEVICE_HEIGHT + BOTTOM_PADDING);
                    setTop(-topOffset)
                }}

                onHide={() => { setTop(0)} }
            />
            <Header title='Nova escalada'/>
            <View style={formStyle}>
                <Text style={styles.intro}>
                    Para começar uma nova escalada, preencha os campos obrigatórios e Clique em “Iniciar”.
                </Text>
                <Dropdown
                    label='Local:'
                    placeholder='Aonde você vai escalar?'
                    option={currentSession.place}
                    selectedOption={(place) => {
                        State.dispatch.climbingActions.editCurrentSession({...currentSession, place})
                    }}
                    options={climbingGyms}
                    extractOption={o => ({id: o.id, value: o.name})}
                    accessibilityLabel='local'
                    obrigatory
                />
                <View style={styles.spacer}/>
                <DatePicker
                    label='Data:'
                    accessibilityLabel='data'
                    date={currentSession.startTime}
                    onSelected={startTime => {
                        const startHour = getStartingHour();
                        startTime.setHours(startHour.getHours());
                        startTime.setMinutes(startHour.getMinutes());
                        State.dispatch.climbingActions.editCurrentSession(
                            {...currentSession, startTime, expectedEndTime: undefined}
                        )
                    }}
                    obrigatory
                />
                <View style={styles.timeContainer}>
                    <View style={styles.timePicker}>
                        <DatePicker
                            date={currentSession.startTime}
                            label='Inicio:'
                            accessibilityLabel='inicio'
                            onSelected={startTime => {
                                State.dispatch.climbingActions.editCurrentSession(
                                    {...currentSession, startTime, expectedEndTime: undefined}
                                )
                            }}
                            obrigatory
                            mode='time'
                        />
                    </View>
                    <View style={styles.widthSpacer}/>
                    <View style={styles.timePicker}>
                        <DatePicker
                            date={currentSession.expectedEndTime}
                            label='Fim:'
                            accessibilityLabel='fim'
                            onSelected={expectedEndTime => {
                                expectedEndTime.setDate(currentSession.startTime.getDate());
                                expectedEndTime.setMonth(currentSession.startTime.getMonth());
                                expectedEndTime.setFullYear(currentSession.startTime.getFullYear());

                                if(expectedEndTime.getTime() < currentSession.startTime.getTime()) {
                                    State.dispatch.climbingActions.editCurrentSession(
                                        {...currentSession, expectedEndTime: undefined}
                                    )
                                } else {
                                    State.dispatch.climbingActions.editCurrentSession(
                                        {...currentSession, expectedEndTime }
                                    )
                                }
                            }}
                            mode='time'
                        />
                    </View>
                </View>
                <View style={{height: 4}}/>
                <Checkbox
                    label='Tocar alarme quando seção terminar'
                    onChecked={(playsAlarm) => {
                        State.dispatch.climbingActions.editCurrentSession({...currentSession, playsAlarm})
                    }}
                    accessibilityLabel='alarme'
                    disabled={currentSession.expectedEndTime === undefined}
                />
                <View style={{height: 8}}/>
                <Input
                    label='Objetivo de vias'
                    accessibilityLabel='objetivo'
                    placeholder='00'
                    value={currentSession.routeObjective === 0 ? '' : String(currentSession.routeObjective)}
                    setValue={(v) => {
                        State.dispatch.climbingActions.editCurrentSession({...currentSession, routeObjective: Number(v)})
                    }}
                    keyboardType='numeric'
                />
            </View>
            <View style={{flex: 1}}/>
            <View style={{margin: 24}}>
                <TextButton
                    label='INICIAR'
                    accessibilityLabel='iniciar'
                    onPress={() => navigation.navigate('home/session', { command: 'start' })}
                />
            </View>
        </View>
    )
}

const getStartingHour = () =>
{
    const date = new Date();
    const quarter = Math.floor(date.getMinutes() / 15)
    date.setMinutes(quarter*15)
    return date;
}

export default NewClimb;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: Palette.deepPurple.t50,
            alignItems: 'stretch'
        },

        form: {
            alignItems: 'stretch',
            margin: 24,
            top: 0,
            zIndex: 0
        },

        intro: {
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            lineHeight: 21,
            marginBottom: 16,
            color: Palette.grey.t900
        },

        spacer: {height: 8},

        timeContainer: {
            marginTop: 8,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },

        timePicker: { flex: 1 },
        widthSpacer: { width: 16 },

    }
)