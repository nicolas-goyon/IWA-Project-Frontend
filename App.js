import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Counter from './src/components/Counter';

export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

/*
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './screens/LoginPage.js';
import RegisterPage from './screens/RegisterPage.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack  = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginPage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Register" component={RegisterPage}  options={{ headerShown: false }}  />
        <Stack.Screen name="Profil" component={ProfilePage}  options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

*/