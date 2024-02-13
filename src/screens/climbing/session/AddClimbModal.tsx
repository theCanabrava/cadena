import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, StyleSheet, Modal, FlatList, Dimensions } from 'react-native';
import { Attempt, Route } from '../../../business-logic/api';
import { Checkbox, Dropdown, IconButton, Pagination, Palette, Slider, TextButton } from '../../../design-system';
import { HomeNavigationProps } from '../../../navigator/HomeStack';
import uuid from 'react-native-uuid';
import State from '../../../business-logic';

const PAGE_WIDTH = Dimensions.get('window').width - 48 - 32 - 4 + 16;
const AddClimbModal = ({display, onClose}: {display: boolean, onClose: () => void}) =>
{
    if(!display) return null;
    const [routes, setRoutes] = useState<Attempt[]>([
        {
            id: String(uuid.v4()),
            route: undefined,
            dificulty: 3,
            status: 'unfinished'
        }

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
                                    value={item.dificulty}
                                    setValue={(v) => {
                                        item.dificulty = v;
                                        setRoutes( [...routes]);
                                    }} 
                                    last={item.id === routes[routes.length-1].id}         
                                    onClose={onClose}                  
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
                                accessibilityLabel='excluir-rota'
                            />
                        </View>
                        <TextButton
                            label='CONFIRMAR'
                            onPress={() => onClose()}
                            accessibilityLabel='incluir-mais-via'
                            status='outlined'
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}

const RoutePage = ({value, setValue, last, onClose}: {value: number, setValue: (v: 1 | 2 | 3 | 4 | 5) => void, last: boolean, onClose: () => void}) => {

    const { routes } = State.stateHooks.useClimbingStore();
    const [option, setOption] = useState<Route>({
        id: '-1', 
        gymId: '-1', 
        grade: {
            systemId: '-1', 
            hardness: 0, 
            name: '',
            pallete: Palette.deepPurple
        },
        name: '',
        mode: 'boulder',
        retired: false
    })
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
                selectedOption={setOption}
                extractOption={o => ({id: o.id, value: o.id !== '-1' ? `${o.grade.name} - ${o.name}` : ''})}
                accessibilityLabel='via-escalada'
                description='Você pode pesquisar pela graguação ou nome da via (Na verdade, não, foi mal...)'
                action={{
                    title: '+ ADICIONAR VIA',
                    onPress: () => {
                        onClose();
                        setTimeout(() => navigation.navigate('home/new-route'), 250)
                    }
                }}
                shift={{x: -2, y: -2}}
            />
            <Slider
                value={value}
                setValue={(v) => {
                    if(v < 1 || v > 5) setValue(1);
                    else setValue(v as (1 | 2 | 3 | 4 | 5));
                }}
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

