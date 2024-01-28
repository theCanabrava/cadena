import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';
import State from '../business-logic/intex';
import Welcome from '../screens/Welcome';
import LoginStack from './LoginStack';

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
    </NavigationContainer>
  );
}

export default Navigator;