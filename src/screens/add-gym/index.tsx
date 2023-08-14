import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleButton, Dropdown, Input, Palette, TextButton } from '../../design-system';

const AddGym = () =>
{
  const [ placeName, setPlaceName ] = useState('');
  const [ type, setType ] = useState({id: '-1', value: ''});
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ showLocationButton, setShowLocationButton ] = useState(true)
  const grades = [
    { id: '0', value: 'Ginásio'},
    { id: '1', value: 'Rochedo'}
  ]

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>
            Aonde você escala?
        </Text>
        <Text style={styles.info}>
            Cadastre os ginásios e trilhas aonde você escala.
        </Text>
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
      <View style={styles.pictureContainer}>
        {
          showLocationButton &&
          <CircleButton 
            iconSource='location'
            onPress={() => {}}
            accessibilityLabel='endereço'
          />
        }
      </View>
      <View style={styles.dashboard}>
        <TextButton
          label='CONTINUAR'
          onPress={() => {console.log('TODO - Paginação de página de local')}}
          accessibilityLabel='continuar'
          status={placeName.length > 0 && type.id !== '-1' ? 'active' : 'disabled'}
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