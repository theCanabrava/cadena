import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Palette } from '../design-system';

const Welcome = () =>
(
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
        value=''
        setValue={(v) => {}}
    />
  </View>
)

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
    }
  }
)