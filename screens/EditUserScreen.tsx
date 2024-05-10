/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import countries from '../utils/countries';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackendAPI from '../utils/axiosClient';

const EditUserScreen = () => {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [poBox, setPoBox] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('Country');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('Profile');
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigation: any = useNavigation();

  const getAsyncUserData = async () => {
    setLoading(true);
    const data: any = await AsyncStorage.getItem('editUserData');
    if (!data) {
      Alert.alert('No data found');
      navigation.navigate('All Users');
    } else {
      const jsonData = JSON.parse(data);
      setId(jsonData._id);
      setFirstName(jsonData.firstName);
      setLastName(jsonData.lastName);
      setStreetName(jsonData.streetName);
      setStreetNumber(jsonData.streetNumber);
      setPoBox(jsonData.poBox);
      setCity(jsonData.city);
      setState(jsonData.state);
      setZipCode(jsonData.zipCode);
      setCountry(jsonData.country);
      setEmail(jsonData.email);
      setProfile(jsonData.profile);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAsyncUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HandleUpdateUser = async () => {
    if (firstName.trim() === '' || lastName.trim() === '') {
      Alert.alert('First name, Last name cannot be empty');
    } else {
      try {
        setUpdateLoading(true);
        const {data, status} = await BackendAPI.put(`/users/${id}`, {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          streetName: streetName.trim(),
          streetNumber: streetNumber.trim(),
          poBox: poBox.trim(),
          city: city.trim(),
          state: state.trim(),
          zipCode: zipCode.trim(),
          country: country.trim(),
          email,
          profile: profile.trim(),
        });
        if (data && status === 200) {
          await AsyncStorage.removeItem('editUserData');
          Alert.alert('User modified successfully');
          navigation.navigate('User Profile');
        }
        setUpdateLoading(false);
      } catch (error: any) {
        setUpdateLoading(false);
        Alert.alert(error?.data?.message || error?.message);
      }
    }
  };

  const handleDeleteUser = async () => {
    try {
      setDeleteLoading(true);
      const {data, status} = await BackendAPI.delete(`/users/${id}`);
      if (data && status === 200) {
        await AsyncStorage.removeItem('editUserData');
        Alert.alert('User deleted successfully');
        navigation.navigate('User Profile');
      }
      setDeleteLoading(false);
    } catch (error: any) {
      setDeleteLoading(false);
      Alert.alert(error?.data?.message || error?.message);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="First Name"
              style={styles.input}
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              value={lastName}
              onChangeText={text => setLastName(text)}
            />

            <View style={styles.row}>
              <TextInput
                placeholder="Street Name"
                style={{...styles.input, width: '49%'}}
                value={streetName}
                onChangeText={text => setStreetName(text)}
              />
              <TextInput
                placeholder="Street Number"
                style={{...styles.input, width: '49%'}}
                value={streetNumber}
                onChangeText={text => setStreetNumber(text)}
              />
            </View>

            <View style={styles.row}>
              <TextInput
                placeholder="PoBox"
                style={{...styles.input, width: '49%'}}
                value={poBox}
                onChangeText={text => setPoBox(text)}
              />
              <TextInput
                placeholder="City"
                style={{...styles.input, width: '49%'}}
                value={city}
                onChangeText={text => setCity(text)}
              />
            </View>

            <View style={styles.row}>
              <TextInput
                placeholder="State"
                style={{...styles.input, width: '49%'}}
                value={state}
                onChangeText={text => setState(text)}
              />
              <TextInput
                placeholder="Zipcode"
                style={{...styles.input, width: '49%'}}
                value={zipCode}
                onChangeText={text => setZipCode(text)}
              />
            </View>

            <View style={styles.container}>
              <Picker
                selectedValue={country}
                onValueChange={itemValue => setCountry(itemValue)}>
                <Picker.Item label={'Country'} value="Country" />
                {countries.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Picker>
            </View>

            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              editable={false}
            />
            <View style={styles.container}>
              <Picker
                selectedValue={profile}
                onValueChange={itemValue => setProfile(itemValue)}>
                <Picker.Item label="Profile" value="Profile" />
                <Picker.Item label="User" value="User" />
                <Picker.Item label="Admin" value="Admin" />
              </Picker>
            </View>
          </View>

          <View
            style={{
              width: '98%',
              margin: 'auto',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!updateLoading) {
                  HandleUpdateUser();
                }
              }}>
              <Text style={styles.buttonText}>
                {updateLoading ? 'Loading...' : 'Update'}
              </Text>
            </TouchableOpacity>
          </View>

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
                backgroundColor: '#b63b36',
              }}
              onPress={() => {
                if (!deleteLoading) {
                  handleDeleteUser();
                }
              }}>
              <Text style={styles.buttonText}>
                {deleteLoading ? 'Loading...' : 'Delete'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default EditUserScreen;

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    gap: 10,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  row: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cccccc',
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    width: '100%',
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
