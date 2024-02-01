import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import State from '../../business-logic/intex';
import { CircleButton, Dropdown, Input } from '../../design-system';

const Form = ({id}: {id: string}) =>
{

  const { climbingGyms } = State.stateHooks.useProfileStore();

  const gym = climbingGyms.find(g => g.id === id)!;
  const gymTypes: {id: 'gym' | 'craig', value: string}[] = [
    { id: 'gym', value: 'Ginásio'},
    { id: 'craig', value: 'Rochedo'}
  ]

  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ showLocationButton, setShowLocationButton ] = useState(true)

  useEffect(() =>
  {
    if(dropdownOpen) Keyboard.dismiss() 
  }, [dropdownOpen]);

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Input
            label='Academia:'
            placeholder='Nome da academia'
            accessibilityLabel='nome-da-academia'
            value={gym.name}
            setValue={(v) => {
              State.dispatch.profileActions.editGym({...gym, name: v});
            }}
            onStart={() =>
            {
              setShowLocationButton(false);
            }}
            onDone={() =>
            {
              setShowLocationButton(true);
              setDropdownOpen(true);
            }}
        />
        <View style={styles.spacer}/>
        <Dropdown
            label='Local:'
            placeholder='Tipo de local'
            accessibilityLabel='tipo-de-local'
            option={gymTypes.find(t => t.id === gym.type)!}
            selectedOption={(v) => {
              State.dispatch.profileActions.editGym({...gym, type: v.id});
            }}
            extractOption={o => ({...o})}
            options={gymTypes}
            openHandlers={[dropdownOpen, setDropdownOpen]}
        />
      </View>
      <View style={styles.locationContainer}>
        {
          showLocationButton &&
          <CircleButton 
            iconSource='location'
            onPress={() => {}}
            accessibilityLabel='endereço'
          />
        }
      </View>
      <View style={{flex: 1}}/>
    </View>
  )
  
}

export default Form;

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      alignItems: 'stretch',
      paddingHorizontal: 24
    },

    spacer: { height: 16 },

    locationContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
)