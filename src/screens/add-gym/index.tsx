import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import State from '../../business-logic/intex';
import { IconButton, Palette, TextButton } from '../../design-system';
import Icon from '../../design-system/icons';
import Form from './Form';
import uuid from 'react-native-uuid';

const AddGym = () =>
{
  const { climbingGyms } = State.stateHooks.useProfileStore();

  useEffect(() => {
    if(climbingGyms.length === 0) {
      State.dispatch.profileActions.editGym({
        id: String(uuid.v4()),
        name: '',
        address: '',
        type: 'gym'
      })
    }
  }, [climbingGyms]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>
            Aonde você escala?
        </Text>
        <Text style={styles.info}>
            Cadastre os ginásios e trilhas aonde você escala.
        </Text>

        <FlatList
          data={climbingGyms}
          renderItem={
            ({item}) =>
            (
              <View style={styles.gymItem}>
                <Form id={item.id}/>
              </View>
            )
          }
          horizontal
          pagingEnabled={true}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.dashboard}>
          <View style={styles.horizontalButtons}>
            <View style={styles.moreContainer}>
              <TextButton
                label='CADASTRAR MAIS'
                onPress={() => {
                  State.dispatch.profileActions.editGym({
                    id: String(uuid.v4()),
                    name: '',
                    address: '',
                    type: 'gym'
                  })
                }}
                accessibilityLabel='cadastrar-mais'
              />
            </View>
            <IconButton 
              source='trash'
              onPress={() => {
                State.dispatch.profileActions.removeGym(climbingGyms[climbingGyms.length-1])
              }}
              accessibilityLabel='excluir-academia'
              status={climbingGyms.length <= 1 ? 'disabled' : 'active'}
            />
          </View>
          <TextButton
            label='CONTINUAR'
            onPress={() => {console.log('TODO - Home')}}
            accessibilityLabel='continuar'
          />
        </View>
      </View>
      <TouchableOpacity style={styles.previousGym}>
        <Icon 
          source='previous'
          height={36}
          width={36}
          primary={Palette.deepPurple.t600}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextGym}>
        <Icon 
          source='previous'
          height={36}
          width={36}
          rotation={180}
          primary={Palette.deepPurple.t600}
        />
      </TouchableOpacity>
    </>
  )
  
}

export default AddGym;

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      paddingVertical: 24,
      backgroundColor: Palette.deepPurple.t50,
      alignItems: 'stretch'
    },

    title: {
      fontFamily: 'Roboto-Bold',
      color: Palette.deepPurple.t800,
      fontSize: 24,
      textAlign: 'left',
      paddingHorizontal: 24
    },

    info: {
        fontFamily: 'Roboto-Regular',
        color: Palette.deepPurple.t800,
        fontSize: 12,
        textAlign: 'left',
        marginBottom: 8,
        paddingHorizontal: 24
    },

    dashboard: {
      height: 56.8,
      justifyContent: 'flex-end', 
      alignItems: 'stretch',
      overflow: 'visible',
      paddingHorizontal: 24
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
    },

    gymItem: {
      flex: 1, 
      width: Dimensions.get('window').width
    },

    previousGym: {
      position: 'absolute',
      width: 36,
      height: 36,
      top: Dimensions.get('window').height / 2 - 18,
      left: 24
    },

    nextGym: {
      position: 'absolute',
      width: 36,
      height: 36,
      top: Dimensions.get('window').height / 2 - 18,
      right: 24
    }
  }
)