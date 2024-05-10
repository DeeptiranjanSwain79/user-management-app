/* eslint-disable prettier/prettier */
import {ActivityIndicator, Alert, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserData from '../components/UserData';
import BackendAPI from '../utils/axiosClient';

const AllUserData = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const {data, status} = await BackendAPI.get('/users');
        if (data && status === 200) {
          setUsers(data.users);
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        Alert.alert(error?.data?.message || error.message);
      }
    };
    getUsers();
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {users.length === 0 ? (
            <View>
              <Text>No User data exist</Text>
            </View>
          ) : (
            <View>
              {users.map((item, index) => (
                <UserData key={index} user={item} />
              ))}
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default AllUserData;
