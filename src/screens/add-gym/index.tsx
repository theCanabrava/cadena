import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Palette, TextButton } from '../../design-system';
import Form from './Form';

const AddGym = () =>
{
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
          Aonde você escala?
      </Text>
      <Text style={styles.info}>
          Cadastre os ginásios e trilhas aonde você escala.
      </Text>
      <Form/>
      <View style={styles.dashboard}>
        <TextButton
          label='CONTINUAR'
          onPress={() => {console.log('TODO - Inclusão de tamanho de formulários')}}
          accessibilityLabel='continuar'
          status={'active' }
        />
      </View>
    </View>
  )
  
}

export default AddGym;

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

    dashboard: {
      height: 56.8,
      justifyContent: 'flex-end', 
      alignItems: 'stretch'
    }
  }
)