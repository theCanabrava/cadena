import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Attempt, Route } from '../../../business-logic/api';
import { Checkbox, Dropdown, Slider, Palette } from '../../../design-system';
import { HomeNavigationProps } from '../../../navigator/HomeStack';
import State from '../../../business-logic';

const PAGE_WIDTH = Dimensions.get('window').width - 48 - 32 - 4 + 16;

type RoutePageProps = {
    attempt: Attempt,
    setAttempt: (a: Attempt) => void,
    last: boolean,
    onClose: () => void,
    setAllowScroll: (a: boolean) => void
}
const RoutePage = ({attempt, setAttempt, last, onClose, setAllowScroll}: RoutePageProps) => {

    const { routes } = State.stateHooks.useClimbingStore();
    const [option, setOption] = useState<Route | undefined>(attempt.route)
    const navigation = useNavigation<HomeNavigationProps>();
    const pageStyle = {
        ...styles.routePage,
        paddingRight: last ? 0 : 16,
        width: last ? PAGE_WIDTH - 16 : PAGE_WIDTH
    }

    return (
        <View style={pageStyle}>
            <Dropdown
                label='Via:'
                placeholder='Via escalada'
                option={option}
                options={routes}
                selectedOption={(o) => {
                    setOption(o);
                    setAttempt({...attempt, route: o});
                }}
                extractOption={o => ({id: o.id, value: o.id !== '-1' ? `${o.grade.name} - ${o.name}` : ''})}
                accessibilityLabel='via-escalada'
                description='Você pode pesquisar pela graguação ou nome da via (Na verdade, não, foi mal...)'
                Header={
                    <TouchableOpacity onPress={() => {
                        onClose();
                        setTimeout(() => navigation.navigate('home/new-route', { attemptId: attempt.id }), 250)
                    }}>
                        <Text style={styles.addRouteLabel}>
                            + ADICIONAR VIA
                        </Text>
                    </TouchableOpacity>
                }
            />
            <Slider
                value={attempt.dificulty}
                setValue={(v) => {
                    const dificulty = v as (1 | 2 | 3 | 4 | 5)
                    if(v < 1 || v > 5) setAttempt({...attempt, dificulty: 1});
                    else setAttempt({...attempt, dificulty});
                }}
                label='Esforço'
                accessibilityLabel='esforço'
                onTouchStart={() => setAllowScroll(false)}
                onTouchDone={() => setAllowScroll(true)}
            />
            <View style={styles.checkboxRow}>
                <Checkbox
                    label='Cadena'
                    isChecked={attempt.status === 'redpoint' || attempt.status === 'onsight'}
                    onChecked={(c) => {
                        if(c) setAttempt({...attempt, status: 'redpoint'});
                        else setAttempt({...attempt, status: 'worked'});
                    }}
                    accessibilityLabel='cadena'
                />
                <Checkbox
                    label='Finalizado'
                    isChecked={attempt.status === 'redpoint' || attempt.status === 'onsight' || attempt.status === 'worked'}
                    onChecked={(c) => {
                        if(c) setAttempt({...attempt, status: 'worked'});
                        else setAttempt({...attempt, status: 'unfinished'});
                    }}
                    accessibilityLabel='finalizado'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    checkboxRow: {
        flexDirection: 'row',
        gap: 16
    },

    routePage: {
        width: PAGE_WIDTH, 
        paddingRight: 16,
        gap: 16
    },

    addRouteLabel: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        color: Palette.deepPurple.t900,
        paddingHorizontal: 16,
        paddingVertical: 8,
    }
})

export default RoutePage;