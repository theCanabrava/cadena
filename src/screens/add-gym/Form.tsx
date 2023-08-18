import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { CircleButton, Dropdown, Input } from '../../design-system';

const Form = () =>
{
  const [ placeName, setPlaceName ] = useState('');
  const [ type, setType ] = useState({id: '-1', value: ''});
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ showLocationButton, setShowLocationButton ] = useState(true)
  const grades = [
    { id: '0', value: 'Ginásio'},
    { id: '1', value: 'Rochedo'}
  ]

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
            value={placeName}
            setValue={setPlaceName}
            onStart={() =>
            {
              setShowLocationButton(false);
            }}
            onDone={() =>
            {
              setShowLocationButton(true);
              if(type.id === '-1') setDropdownOpen(true);
            }}
        />
        <View style={styles.spacer}/>
        <Dropdown
            label='Local:'
            placeholder='Tipo de local'
            accessibilityLabel='tipo-de-local'
            option={type}
            selectedOption={(v) => {setType(v)}}
            options={grades}
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
      alignItems: 'stretch'
    },

    spacer: { height: 16 },

    locationContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
)