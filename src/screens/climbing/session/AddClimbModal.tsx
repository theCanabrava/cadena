import { BlurView } from '@react-native-community/blur';
import { useState } from 'react';
import { View, StyleSheet, Modal, FlatList, Dimensions } from 'react-native';
import { Checkbox, Dropdown, IconButton, Pagination, Palette, Slider, TextButton } from '../../../design-system';

type Route = {id: string, name: string, value: number, status: 'unfinished' | 'worked' | 'redpoint' | 'onsight'};
const PAGE_WIDTH = Dimensions.get('window').width - 48 - 32 - 4 + 16;
const AddClimbModal = ({display}: {display: boolean}) =>
{
    if(!display) return null;
    const [routes, setRoutes] = useState<Route[]>([
        {
            id: '1',
            name: '',
            value: 3,
            status: 'unfinished'
        },
        {
            id: '2',
            name: '',
            value: 3,
            status: 'unfinished'
        },
        {
            id: '3',
            name: '',
            value: 3,
            status: 'unfinished'
        },
        {
            id: '4',
            name: '',
            value: 3,
            status: 'unfinished'
        },
        {
            id: '5',
            name: '',
            value: 3,
            status: 'unfinished'
        },

    ]);

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
                            data={routes}
                            keyExtractor={(r) => r.id}
                            renderItem={({item}) => 
                                <RoutePage
                                    value={item.value}
                                    setValue={(v) => {
                                        item.value = v;
                                        setRoutes( [...routes]);
                                    }} 
                                    last={item.id === routes[routes.length-1].id}                           
                                />
                            }
                            horizontal
                            snapToInterval={PAGE_WIDTH}
                            showsHorizontalScrollIndicator={false}
                        />
                        <Pagination
                            page={0}
                            length={3}
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
                                accessibilityLabel='excluir-academia'
                            />
                        </View>
                        <TextButton
                            label='CONFIRMAR'
                            onPress={() => {}}
                            accessibilityLabel='incluir-mais-via'
                            status='outlined'
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}

const RoutePage = ({value, setValue, last}: {value: number, setValue: (v: number) => void, last: boolean}) => {

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
    }
})

