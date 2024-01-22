import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';
import State from '../business-logic/intex';
import Welcome from '../screens/Welcome';

const Navigator = () => {
  const { username } = State.stateHooks.useProfileStore();

  if ( username === undefined) {
    return (<Welcome/>);
  }
  
  return (
    <NavigationContainer>
      <HomeStack/>
    </NavigationContainer>
  );
}

export default Navigator;