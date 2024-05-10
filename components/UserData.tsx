/* eslint-disable prettier/prettier */
import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

type Props = {
  user: any;
};

const UserData = ({user}: Props) => {
  const navigation: any = useNavigation();
  const handleClick = async () => {
    await AsyncStorage.setItem('editUserData', JSON.stringify(user));
    navigation.navigate('Modify User');
  };
  return (
    <TouchableOpacity onPress={handleClick} style={styles.container}>
      <Text style={styles.name}>
        {user.firstName} {user.lastName}
      </Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.country}>{user.country}</Text>
    </TouchableOpacity>
  );
};

export default UserData;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 3,
  },
  country: {
    fontSize: 16,
    color: '#555',
  },
});
