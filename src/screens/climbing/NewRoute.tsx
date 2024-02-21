import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import State from '../../business-logic';
import { Grade } from '../../business-logic/api';
import { CircleButton, Dropdown, Input, KeyboardListener, Palette, TextButton } from '../../design-system';
import { HomeNavigationProps } from '../../navigator/HomeStack';
import Header from '../shared/Header';
import uuid from 'react-native-uuid';

type Modality = {id: 'top-rope' | 'lead', value: string}
const modalities: Modality[] = [
    {
        id: 'top-rope',
        value: 'Top Rope',
    },
    {
        id: 'lead',
        value: 'Guiada'
    }
];

const NewRoute = () =>
{
    const [ name, setName ] = useState('');
    const [ selectedGrade, setSelectedGrade ] = useState<Grade | undefined>();
    const [ modality, setModality ] = useState<Modality | undefined>();
    const [ showCamera, setShowCamera ] = useState(true);
    const [ formStyle ] = useState({...styles.form});
    const navigation = useNavigation<HomeNavigationProps>();
    const { grades, currentSession } = State.stateHooks.useClimbingStore();

    useEffect(() => {
        State.dispatch.climbingActions.loadGrades();
    }, []);

    const saveRoute = async () => {
        await State.dispatch.climbingActions.saveRoute(
            {
                gymId: currentSession.place.id,
                grade: selectedGrade!,
                name,
                id: String(uuid.v4()),
                mode: modality!.id,
                retired: false
            }
        )

        navigation.goBack();
    }

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
                            placeholder={grades[0]?.name ?? '4+'}
                            option={selectedGrade}
                            selectedOption={setSelectedGrade}
                            extractOption={o => ({id: o.name, value: o.name})}
                            options={grades}
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
                    option={modality}
                    selectedOption={(v) => {setModality(v)}}
                    extractOption={o => ({...o})}
                    options={modalities}
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
                    onPress={saveRoute}
                    status={selectedGrade !== undefined && name !== '' && modality !== undefined ? 'active' : 'disabled'}
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