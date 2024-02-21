import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, StyleSheet, Modal, FlatList, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Attempt, Route } from '../../../business-logic/api';
import { Checkbox, Dropdown, IconButton, Pagination, Palette, Slider, TextButton } from '../../../design-system';
import { HomeNavigationProps } from '../../../navigator/HomeStack';
import uuid from 'react-native-uuid';
import State from '../../../business-logic';

const PAGE_WIDTH = Dimensions.get('window').width - 48 - 32 - 4 + 16;
const AddClimbModal = ({display, onClose}: {display: boolean, onClose: () => void}) =>
{
    if(!display) return null;
    const [attempts, setAttempts] = useState<Attempt[]>([
        {
            id: String(uuid.v4()),
            route: undefined,
            dificulty: 3,
            status: 'unfinished'
        }
    ]);
    const [page, setPage] = useState(0);

    return (
        <>
            <BlurView 
                style={styles.cover}
                blurAmount={5}
                blurType='dark'
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={display}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalCard}>
                        <FlatList
                            data={attempts}
                            keyExtractor={(r) => r.id}
                            renderItem={({item, index}) => 
                                <RoutePage
                                    attempt={item}
                                    setAttempt={(v) => {
                                        attempts[index] = v;
                                        setAttempts( [...attempts]);
                                    }} 
                                    last={item.id === attempts[attempts.length-1].id}         
                                    onClose={onClose}                  
                                />
                            }
                            horizontal
                            snapToInterval={PAGE_WIDTH}
                            showsHorizontalScrollIndicator={false}
                            onScroll={(e) => {
                                const x = e.nativeEvent.contentOffset.x;
                                const page = Math.round(x/PAGE_WIDTH);
                                setPage(page)
                            }}
                            getItemLayout={(_, index) => ({
                                length: PAGE_WIDTH,
                                offset: PAGE_WIDTH * (index), 
                                index,
                            })}
                        />
                        <Pagination
                            page={page}
                            length={attempts.length}
                        />
                        <View style={styles.routeRow}>
                            <View style={styles.dashboardButton}>
                                <TextButton
                                    label='INCLUIR MAIS VIAS'
                                    onPress={() => {}}
                                    accessibilityLabel='incluir-mais-via'
                                    status='outlined'
                                />
                            </View>
                            <IconButton 
                                source='trash'
                                onPress={() => {}}
                                accessibilityLabel='excluir-rota'
                            />
                        </View>
                        <TextButton
                            label='CONFIRMAR'
                            onPress={() => {
                                State.dispatch.climbingActions.addAttemptsToSession(attempts);
                                onClose();
                            }}
                            accessibilityLabel='incluir-mais-via'
                            status='outlined'
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}

type RoutePageProps = {
    attempt: Attempt,
    setAttempt: (a: Attempt) => void,
    last: boolean,
    onClose: () => void,
}
const RoutePage = ({attempt, setAttempt, last, onClose}: RoutePageProps) => {

    const { routes } = State.stateHooks.useClimbingStore();
    const [option, setOption] = useState<Route | undefined>(undefined)
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
                        setTimeout(() => navigation.navigate('home/new-route'), 250)
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

export default AddClimbModal;

const styles = StyleSheet.create({

    cover: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },

    modalCard: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        margin: 24,
        padding: 16,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: Palette.deepPurple.t600,
        backgroundColor: Palette.deepPurple.t50
    },

    checkboxRow: {
        flexDirection: 'row',
        gap: 16
    },

    routePage: {
        width: PAGE_WIDTH, 
        paddingRight: 16,
        gap: 16
    },

    routeRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16
    },

    dashboardButton: {
        flex: 1
    },

    addRouteLabel: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        color: Palette.deepPurple.t900,
        paddingHorizontal: 16,
        paddingVertical: 8,
    }
})

