import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Palette, TextButton } from '../../design-system';
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
        <View style={styles.horizontalButtons}>
          <View style={styles.moreContainer}>
            <TextButton
              label='CADASTRAR MAIS'
              onPress={() => {}}
              accessibilityLabel='cadastrar-mais'
            />
          </View>
          <IconButton 
            source='trash'
            onPress={() => {}}
            accessibilityLabel='excluir-academia'
          />
        </View>
        <TextButton
          label='CONTINUAR'
          onPress={() => {console.log('TODO - Inclusão de tamanho de formulários')}}
          accessibilityLabel='continuar'
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
      alignItems: 'stretch',
      overflow: 'visible'
    },

    horizontalButtons: {
      flexDirection: 'row',
      marginBottom: 16
    },

    moreContainer: {
      flex: 1,
      marginRight: 16,
      flexDirection:'column',
      alignContent: 'stretch'
    }
  }
)