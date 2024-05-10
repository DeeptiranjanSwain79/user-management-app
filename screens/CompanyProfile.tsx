/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackendAPI from '../utils/axiosClient';

const CompanyProfile = () => {
  const navigation: any = useNavigation();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const getAsyncUserData = async () => {
    setLoading(true);
    const data = await AsyncStorage.getItem('userData');
    if (!data) {
      navigation.navigate('User Profile');
    }
    setUserData(JSON.parse(data as string));
    setLoading(false);
  };
  useEffect(() => {
    getAsyncUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveData = async () => {
    try {
      setSaveLoading(true);
      const {data, status} = await BackendAPI.post('/users/create', userData);
      if (data && status === 201) {
        await AsyncStorage.removeItem('userData');
        Alert.alert('User created successfully');
        navigation.navigate('User Profile');
      }
      setSaveLoading(false);
    } catch (error: any) {
      setSaveLoading(false);
      Alert.alert(error?.data?.message || error?.message);
    }
  };

  const handleModifyClick = async () => {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    navigation.navigate('User Profile');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <Text style={styles.heading}>Please review and confirm</Text>
          <View style={styles.dataContainer}>
            <View style={styles.row}>
              <Text style={styles.labelText}>Name</Text>
              <Text style={styles.dataText}>
                {userData.firstName} {userData.lastName}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.labelText}>Street Name</Text>
              <Text style={styles.dataText}>{userData.streetName || '-'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.labelText}>Street Number</Text>
              <Text style={styles.dataText}>
                {userData.streetNumber || '-'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.labelText}>PoBox</Text>
              <Text style={styles.dataText}>{userData.poBox || '-'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.labelText}>City</Text>
              <Text style={styles.dataText}>{userData.city || '-'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.labelText}>Country</Text>
              <Text style={styles.dataText}>{userData.country || '-'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.labelText}>Email</Text>
              <Text style={styles.dataText}>{userData.email}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.labelText}>Profile</Text>
              <Text style={styles.dataText}>{userData.profile}</Text>
            </View>
          </View>

          <View style={{height: 150}} />

          <View
            style={{
              width: '98%',
              margin: 'auto',
            }}>
            <TouchableOpacity
              style={{
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                marginVertical: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#3d3d3d',
              }}
              onPress={handleModifyClick}>
              <Text style={styles.buttonText}>Modify</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '98%',
              margin: 'auto',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!saveLoading) {
                  saveData();
                }
              }}>
              <Text style={styles.buttonText}>
                {saveLoading ? 'Loading...' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CompanyProfile;

const styles = StyleSheet.create({
  heading: {
    marginTop: 5,
    fontSize: 21,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dataContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    gap: 10,
  },
  row: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
  labelText: {
    fontSize: 16,
  },
  dataText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#bd751c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
