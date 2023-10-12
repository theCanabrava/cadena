import { BlurView } from '@react-native-community/blur';
import { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Checkbox, Dropdown, Palette, Slider } from '../../../design-system';

const AddClimbModal = ({display}: {display: boolean}) =>
{
    if(!display) return null;
    const [ value, setValue ] = useState(3);

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
                        <Dropdown
                            label='Via:'
                            placeholder='Via escalada'
                            option={{id: "-1", value: ""}}
                            options={[]}
                            selectedOption={(o) => {}}
                            accessibilityLabel='via-escalada'
                            description='Você pode pesquisar pela graguação ou nome da via'
                            action={{
                                title: '+ ADICIONAR VIA',
                                onPress: () => {}
                            }}
                            shift={{x: -2, y: -2}}
                        />
                        <Slider
                            value={value}
                            setValue={setValue}
                            label='Esforço'
                            accessibilityLabel='esforço'
                        />
                        <View style={styles.checkboxRow}>
                            <Checkbox
                                label='Cadena'
                                onChecked={() => {}}
                                accessibilityLabel='cadena'
                            />
                            <Checkbox
                                label='Trabalhado'
                                onChecked={() => {}}
                                accessibilityLabel='trabalhado'
                            />
                        </View>
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
        backgroundColor: Palette.deepPurple.t50,
        gap: 16
    },

    checkboxRow: {
        flexDirection: 'row',
        gap: 16
    }
})

