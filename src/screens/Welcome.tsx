import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import State from '../business-logic';
import { GradeSystem } from '../business-logic/api';
import { CircleButton, Dropdown, Input, KeyboardListener, Palette, TextButton } from '../design-system';
import { LoginNavigationProps } from '../navigator/LoginStack';

const Welcome = () =>
{
  const [ username, setUsername ] = useState('');
  const [ grade, setGrade ] = useState<GradeSystem | undefined>();
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ showCameraButton, setShowCameraButton ] = useState(true)
  const { gradingSystemOptions } = State.stateHooks.useProfileStore();
  const navigation = useNavigation<LoginNavigationProps>();

  useEffect(() =>
  {
    if(dropdownOpen) Keyboard.dismiss() 
  }, [dropdownOpen]);

  return (
    <View style={styles.container}>
      <KeyboardListener
        onHide={() => {
          //Keyboard.dismiss();
          setShowCameraButton(true);
        }}
      />
      <View style={{flex: 1}}>
        <Text style={styles.title}>
          Boas vindas!
        </Text>
        <Text style={styles.info}>
            Cadastre as informações de seu usuário.
        </Text>
        <Input
            label='Nome:'
            placeholder='Nome de Usuário'
            accessibilityLabel='nome-de-usuário'
            value={username}
            setValue={setUsername}
            onStart={() => { setShowCameraButton(false) }}
            onDone={() => { if(grade !== undefined) setDropdownOpen(true); }}
        />
        <View style={styles.spacer}/>
        <Dropdown
            label='Graduação:'
            placeholder='Graduação de vias'
            accessibilityLabel='graduação-de-vias'
            option={grade}
            selectedOption={(v) => {setGrade(v)}}
            options={gradingSystemOptions}
            openHandlers={[dropdownOpen, setDropdownOpen]}
            extractOption={o => ({id: o.id, value: o.name})}
        />
      </View>
      <View style={styles.pictureContainer}>
        {
          showCameraButton &&
          <CircleButton 
            iconSource='camera'
            onPress={() => {}}
            accessibilityLabel='foto-perfil'
          />
        }
      </View>
      <View style={styles.dashboard}>
        <TextButton
          label='REGISTRAR'
          onPress={async () => {
            await State.dispatch.profileActions.registerUser(username, grade!);
            navigation.navigate('login/add-gym');
          }}
          accessibilityLabel='registrar'
          disabled={!(username.length > 0 && grade !== undefined)}
        />
      </View>
    </View>
  )
  
}

export default Welcome;

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: Palette.deepPurple.t50,
      alignItems: 'stretch'
    },

    title: {
      fontFamily: 'Roboto-Bold',
      color: Palette.deepPurple.t800,
      fontSize: 24,
      textAlign: 'left'
    },

    info: {
        fontFamily: 'Roboto-Regular',
        color: Palette.deepPurple.t800,
        fontSize: 12,
        textAlign: 'left',
        marginBottom: 8
    },

    spacer: { height: 16 },

    pictureContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },

    dashboard: {
      flex: 1, 
      justifyContent: 'flex-end', 
      alignItems: 'stretch'
    }
  }
)