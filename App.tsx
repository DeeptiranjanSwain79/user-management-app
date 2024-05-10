import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CompanyProfile from './screens/CompanyProfile';
import {StyleSheet} from 'react-native';
import AllUserData from './screens/AllUserData';
import EditUserScreen from './screens/EditUserScreen';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="User Profile"
          component={HomeScreen}
          options={{
            headerStyle: styles.headerStyle,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Company Profile"
          component={CompanyProfile}
          options={{
            headerStyle: styles.headerStyle,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="All Users"
          component={AllUserData}
          options={{
            headerStyle: styles.headerStyle,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Modify User"
          component={EditUserScreen}
          options={{
            headerStyle: styles.headerStyle,
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#bd9a1c',
  },
});

export default App;
