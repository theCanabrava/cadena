import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';
import State from '../business-logic';
import LoginStack from './LoginStack';
import ModalManager from '../modal-manager';

const Navigator = () => {
  const { loggedIn } = State.stateHooks.useProfileStore();

  if ( loggedIn === false) {
    return (
      <NavigationContainer>
        <LoginStack/>
      </NavigationContainer>
    );
  }
  
  return (
    <NavigationContainer>
      <HomeStack/>
      <ModalManager/>
    </NavigationContainer>
  );
}

export default Navigator;