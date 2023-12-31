import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CircleButton, Dropdown, Input, KeyboardListener, Palette, TextButton } from '../../design-system';
import { HomeNavigationProps } from '../../navigator/HomeStack';
import Header from '../shared/Header';

const NewRoute = () =>
{
    const [ name, setName ] = useState('');
    const [ showCamera, setShowCamera ] = useState(true);
    const [ formStyle ] = useState({...styles.form});
    const navigation = useNavigation<HomeNavigationProps>();

    return (
        <View style={styles.container}>
            <KeyboardListener
                onShow={() => { setShowCamera(false) }}
                onHide={() => { setShowCamera(true) } }
            />
            <Header title='Nova via'/>
            <View style={formStyle}>
                <Text style={styles.intro}>
                    Prencha os dados das vias e clique em “Adicionar”.
                </Text>
                <View style={styles.routeNameRow}>
                    <View style={styles.gradeDropdown}>
                        <Dropdown
                            label='Graduação:'
                            placeholder='4+'
                            option={{id: '1', value: ''}}
                            selectedOption={(v) => {console.log('Selected ', v)}}
                            options={[{id: '1', value: '4+'}]}
                            accessibilityLabel='graduação'
                            obrigatory
                        />
                    </View>
                    <View style={styles.nameInput}>
                        <Input
                            label='Via:'
                            accessibilityLabel='nome'
                            placeholder='Nome da via'
                            value={name}
                            setValue={setName}
                        />
                    </View>
                </View>
                <View style={styles.spacer}/>
                <Dropdown
                    label='Modalidade:'
                    placeholder='Top rope'
                    option={{id: '1', value: ''}}
                    selectedOption={(v) => {console.log('Selected ', v)}}
                    options={[{id: '1', value: 'Top rope'}]}
                    accessibilityLabel='graduação'
                    obrigatory
                />
                <View style={styles.cameraContainer}>
                  {
                    showCamera &&
                    <CircleButton 
                      iconSource='camera'
                      onPress={() => {}}
                      accessibilityLabel='foto'
                    />
                  }
                </View>
            </View>
            <View style={{flex: 1}}/>
            <View style={{margin: 24}}>
                <TextButton
                    label='CADASTRAR'
                    accessibilityLabel='cadastrar'
                    onPress={() => navigation.goBack()}
                />
            </View>
        </View>
    )
}

export default NewRoute;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: Palette.deepPurple.t50,
            alignItems: 'stretch',
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

        routeNameRow: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 8
        },

        gradeDropdown: { width: 100 },

        nameInput: { flex: 1 },

        spacer: { height: 8 },

        cameraContainer: {
            marginTop: 16,
            justifyContent: 'center',
            alignItems: 'center'
        }

    }
)