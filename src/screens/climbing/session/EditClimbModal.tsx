import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import State from '../../../business-logic';
import { Icon, Input, Palette, TextButton } from '../../../design-system';
import { HomeNavigationProps } from '../../../navigator/HomeStack';
import RoutePage from './RoutePage';

const EditClimbModal = () =>
{
    const navigation = useNavigation<HomeNavigationProps>();
    const { currentSession } = State.stateHooks.useClimbingStore(s => s);
    const edittingAttempt = currentSession.edittingAttempt;
    const display = edittingAttempt !== undefined;

    if(!display) return null;

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
                        <View style={styles.titleRow}>
                            <TouchableOpacity onPress={() => {
                                State.dispatch.climbingActions.editCurrentSession({...currentSession, edittingAttempt: undefined})
                            }}>
                                <Icon
                                    source='back'
                                    primary={Palette.deepPurple.t900}
                                    width={16}
                                    height={16}
                                />
                            </TouchableOpacity>
                            <Text style={styles.title}>
                                Ajustar tentativa
                            </Text>
                        </View>
                        <View style={styles.spacer}/>
                        <RoutePage
                            attempt={edittingAttempt}
                            setAttempt={(a) => {
                                State.dispatch.climbingActions.editCurrentSession({...currentSession, edittingAttempt: a});
                            }}
                            last={false}
                            onClose={() => {
                                State.dispatch.climbingActions.editCurrentSession({...currentSession, edittingAttempt: undefined});
                            }}
                            setAllowScroll={() => {}}
                        />
                        <View style={styles.spacer}/>
                        <TextButton
                            label='EDITAR'
                            onPress={() => {
                                State.dispatch.climbingActions.commitAttempt();
                            }}
                            accessibilityLabel='editar'
                            status='outlined'
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default EditClimbModal;

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

    titleRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 4,
        alignItems: 'center'
    },

    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: Palette.deepPurple.t800
    },

    description: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 16,
        color: Palette.grey.t900
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },

    info: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: Palette.deepPurple.t800
    },

    infoValue: { fontFamily: 'Roboto-Regular' },

    spacer: { height: 16 }
 
})

