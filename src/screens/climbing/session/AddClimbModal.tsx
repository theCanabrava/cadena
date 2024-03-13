import { BlurView } from '@react-native-community/blur';
import { createRef, useEffect, useState } from 'react';
import { View, StyleSheet, Modal, FlatList, Dimensions } from 'react-native';
import { IconButton, Pagination, Palette, TextButton } from '../../../design-system';
import State from '../../../business-logic';
import wait from '../../../design-system/wait';
import RoutePage from './RoutePage';
import generateAttempt from './generateAttempt';
import { useRoute } from '@react-navigation/native';
import { SessionRouteProps } from '../../../navigator/HomeStack';

const PAGE_WIDTH = Dimensions.get('window').width - 48 - 32 - 4 + 16;
const AddClimbModal = ({display, onClose}: {display: boolean, onClose: () => void}) =>
{
    if(!display) return null;
    const { workingAttempts } = State.stateHooks.useClimbingStore();
    const [shouldScrollTo, setShouldScrollTo] = useState(0);
    const [page, setPage] = useState(0);
    const scrollRef = createRef<FlatList>();
    const { params } = useRoute<SessionRouteProps>();
    const [allowScroll, setAllowScroll] = useState(true);

    const scrollTo = (i: number) => scrollRef.current?.scrollToIndex({index: i, animated: true});

    useEffect(() => {
        if(shouldScrollTo > 0) {
            scrollRef.current?.scrollToIndex({index: shouldScrollTo, animated: true});
        }
    }, [shouldScrollTo])

    useEffect(() => {
        if(params.command === 'add-route') {
            setTimeout(() => {setShouldScrollTo(workingAttempts.length - 1)}, 200);
        }
    }, [params])

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
                            ref={scrollRef}
                            data={workingAttempts}
                            renderItem={({item, index}) => 
                                <RoutePage
                                    attempt={item}
                                    setAttempt={(v) => {
                                        workingAttempts[index] = v;
                                        State.dispatch.climbingActions.setWorkingAttempts([...workingAttempts]);
                                    }} 
                                    last={item.id === workingAttempts[workingAttempts.length-1].id}         
                                    onClose={onClose}      
                                    setAllowScroll={setAllowScroll}            
                                />
                            }
                            horizontal
                            scrollEnabled={allowScroll}
                            snapToInterval={PAGE_WIDTH}
                            keyExtractor={(r) => r.id}
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
                            showsHorizontalScrollIndicator={false}
                        />
                        <Pagination
                            page={page}
                            length={workingAttempts.length}
                        />
                        <View style={styles.routeRow}>
                            <View style={styles.dashboardButton}>
                                <TextButton
                                    label='INCLUIR MAIS VIAS'
                                    onPress={async () => {
                                        State.dispatch.climbingActions.setWorkingAttempts([...workingAttempts, generateAttempt()]);
                                        await wait(100);
                                        setShouldScrollTo(workingAttempts.length);
                                    }}
                                    accessibilityLabel='incluir-mais-via'
                                    status='outlined'
                                />
                            </View>
                            <IconButton 
                                source='trash'
                                onPress={async () => {

                                    if( page === workingAttempts.length -1 ) {
                                        scrollTo(page-1);
                                        await wait(200);
                                    } 

                                    const preservedAttempts = workingAttempts.filter((_, i) => i !== page);
                                    State.dispatch.climbingActions.setWorkingAttempts(preservedAttempts);
                                    setShouldScrollTo(0);

                                }}
                                accessibilityLabel='excluir-rota'
                                status={workingAttempts.length > 1 ? 'active' : 'disabled'}
                            />
                        </View>
                        <TextButton
                            label='CONFIRMAR'
                            onPress={() => {
                                State.dispatch.climbingActions.addAttemptsToSession(workingAttempts);
                                onClose();
                            }}
                            accessibilityLabel='incluir-mais-via'
                            status={workingAttempts.find(a => a.route === undefined) ? 'outline-disabled' : 'outlined'}
                        />
                    </View>
                </View>
            </Modal>
        </>
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

    dashboardButton: {
        flex: 1
    },

    routeRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16
    },

})

