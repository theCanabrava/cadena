import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, LayoutAnimation } from 'react-native';
import { Checkbox, DatePicker, Dropdown, Input, KeyboardListener, Palette, TextButton } from '../../design-system';
import Header from '../shared/Header';

const INPUT_POSITION = 485;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
const BOTTOM_PADDING = 16
const NewClimb = () =>
{
    const [ routes, setRoutes ] = useState('');
    const [ top, setTop ] = useState(0);
    const [ formStyle, setFormStyle ] = useState({...styles.form})

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
                    option={{id: '1', value: 'Rokaz - Savassi'}}
                    selectedOption={(v) => {console.log('Selected ', v)}}
                    options={[{id: '1', value: 'Rokaz - Savassi'}]}
                    accessibilityLabel='local'
                    obrigatory
                />
                <View style={styles.spacer}/>
                <DatePicker
                    label='Data:'
                    accessibilityLabel='data'
                    starting={new Date()}
                    onSelected={d => console.log('Selected', d)}
                    obrigatory
                />
                <View style={styles.timeContainer}>
                    <View style={styles.timePicker}>
                        <DatePicker
                            label='Inicio:'
                            accessibilityLabel='inicio'
                            starting={getStartingHour()}
                            onSelected={d => console.log('Selected', d)}
                            obrigatory
                            mode='time'
                        />
                    </View>
                    <View style={styles.widthSpacer}/>
                    <View style={styles.timePicker}>
                        <DatePicker
                            label='Fim:'
                            accessibilityLabel='fim'
                            onSelected={d => console.log('Selected', d)}
                            mode='time'
                        />
                    </View>
                </View>
                <View style={{height: 4}}/>
                <Checkbox
                    label='Tocar alarme quando seção terminar'
                    onChecked={(c) => console.log('Checked', c)}
                    accessibilityLabel='alarme'
                />
                <View style={{height: 8}}/>
                <Input
                    label='Objetivo de vias'
                    accessibilityLabel='objetivo'
                    placeholder='00'
                    value={routes}
                    setValue={setRoutes}
                    keyboardType='numeric'
                />
            </View>
            <View style={{flex: 1}}/>
            <View style={{margin: 24}}>
                <TextButton
                    label='INICIAR'
                    accessibilityLabel='iniciar'
                    onPress={() => {}}
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