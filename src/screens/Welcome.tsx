import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown, Input, Palette } from '../design-system';

const Welcome = () =>
{
  const [ username, setUsername ] = useState('');
  const [ grade, setGrade ] = useState({id: '-1', value: ''});
  const grades = [
    { id: '0', value: 'Escala Font'},
    { id: '1', value: 'Escala V'},
    { id: '2', value: 'TODO - Ícone de dropdown!!'},
  ]

  return (
    <View style={styles.container}>
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
      />
      <View style={styles.spacer}/>
      <Dropdown
          label='Graduação:'
          placeholder='Graduação de vias'
          accessibilityLabel='graduação-de-vias'
          option={grade}
          selectedOption={(v) => {setGrade(v)}}
          options={grades}
      />
    </View>
  )
  
}

export default Welcome;

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: Palette.deepPurple.t50
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

    spacer: { height: 16 }
  }
)