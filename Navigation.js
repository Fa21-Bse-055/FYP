import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import About from './Screens/About';
import Pricing from './Screens/Pricing';
import ContactUs from './Screens/ContactUs';
import Login from './Screens/Login';
import TryForFree from './Screens/TryForFree';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Pricing" component={Pricing} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TryForFree" component={TryForFree} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
