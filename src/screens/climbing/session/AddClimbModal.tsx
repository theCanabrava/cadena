import { BlurView } from '@react-native-community/blur';
import { createRef, useEffect, useState } from 'react';
import { View, StyleSheet, Modal, FlatList, Dimensions } from 'react-native';
import { Attempt } from '../../../business-logic/api';
import { IconButton, Pagination, Palette, TextButton } from '../../../design-system';
import uuid from 'react-native-uuid';
import State from '../../../business-logic';
import wait from '../../../design-system/wait';
import RoutePage from './RoutePage';

const PAGE_WIDTH = Dimensions.get('window').width - 48 - 32 - 4 + 16;
const AddClimbModal = ({display, onClose}: {display: boolean, onClose: () => void}) =>
{
    if(!display) return null;
    const [attempts, setAttempts] = useState<Attempt[]>([generateAttempt()]);
    const [shouldScrollTo, setShouldScrollTo] = useState(0);
    const [page, setPage] = useState(0);
    const scrollRef = createRef<FlatList>();

    const scrollTo = (i: number) => scrollRef.current?.scrollToIndex({index: i, animated: true});

    useEffect(() => {
        if(shouldScrollTo > 0) {
            scrollRef.current?.scrollToIndex({index: shouldScrollTo, animated: true});
        }
    }, [shouldScrollTo])

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
                            data={attempts}
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
                            pagingEnabled={true}
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
                            length={attempts.length}
                        />
                        <View style={styles.routeRow}>
                            <View style={styles.dashboardButton}>
                                <TextButton
                                    label='INCLUIR MAIS VIAS'
                                    onPress={() => {
                                        setAttempts([...attempts, generateAttempt()]);
                                        setShouldScrollTo(attempts.length);
                                    }}
                                    accessibilityLabel='incluir-mais-via'
                                    status='outlined'
                                />
                            </View>
                            <IconButton 
                                source='trash'
                                onPress={async () => {

                                    if( page === attempts.length -1 ) {
                                        scrollTo(page-1);
                                        await wait(200);
                                    } 

                                    const preservedAttempts = attempts.filter((_, i) => i !== page);
                                    setAttempts(preservedAttempts);
                                    setShouldScrollTo(0);

                                }}
                                accessibilityLabel='excluir-rota'
                                status={attempts.length > 1 ? 'active' : 'disabled'}
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

const generateAttempt: () => Attempt = () => ({
    id: String(uuid.v4()),
    route: undefined,
    dificulty: 3,
    status: 'unfinished'
})

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

