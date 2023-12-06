import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { Icon, Input, Palette, TextButton } from '../../../design-system';
import { HomeNavigationProps } from '../../../navigator/HomeStack';

const FinishClimbModal = ({display, onClose}: {display: boolean, onClose: () => void}) =>
{
    const [observations, setObservations] = useState('');
    const navigation = useNavigation<HomeNavigationProps>();
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
                            <TouchableOpacity onPress={onClose}>
                                <Icon
                                    source='back'
                                    primary={Palette.deepPurple.t900}
                                    width={16}
                                    height={16}
                                />
                            </TouchableOpacity>
                            <Text style={styles.title}>
                                Finalizar Seção?
                            </Text>
                        </View>
                        <Text style={styles.description}>
                            Já deu por hoje? Confirme as vias escaladas e inclua alguma observação de sua seção!
                        </Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.info}>
                                Vias escaladas: <Text style={styles.infoValue}>3</Text>
                            </Text>
                            <Text style={styles.info}>
                                Meta atingida!
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.info}>
                                Duração: <Text style={styles.infoValue}>08:00 - 09:00</Text>
                            </Text>
                            <Text style={styles.info}>
                                Tempo esperado!
                            </Text>
                        </View>
                        <Input
                            label='Observações:'
                            placeholder='Inclua suas observações, se quiser.'
                            value={observations}
                            setValue={setObservations}
                            accessibilityLabel='observacoes'
                            multiline
                        />
                        <View style={styles.spacer}/>
                        <TextButton
                            label='FINALIZAR'
                            onPress={() => {navigation.navigate('home/index')}}
                            accessibilityLabel='finalizar'
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default FinishClimbModal;

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

