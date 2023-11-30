import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';

const Navigator = () => {
  return (
    <NavigationContainer>
      <HomeStack/>
    </NavigationContainer>
  );
}

export default Navigator;