/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const HomeScreen = () => {
  const navigation: any = useNavigation();

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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleNext = () => {
    if (password.trim() !== confirmPassword.trim()) {
      Alert.alert('Passwords do not match');
    } else if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      streetName.trim() === '' ||
      city.trim() === '' ||
      country.trim() === 'Country' ||
      email.trim() === '' ||
      profile.trim() === 'Profile' ||
      password.trim() === ''
    ) {
      Alert.alert('Please fill all fields');
    } else {
      const userData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        streetName: streetName.trim(),
        streetNumber: streetNumber.trim(),
        poBox: poBox.trim(),
        city: city.trim(),
        state: state.trim(),
        zipCode: zipCode.trim(),
        country: country.trim(),
        email: email.trim(),
        profile: profile.trim(),
        password: password.trim(),
      };
      const jsonValue = JSON.stringify(userData);
      const storeData = async () => {
        await AsyncStorage.setItem('userData', jsonValue);
        navigation.navigate('Company Profile');
      };
      storeData();
    }
  };

  const getAsyncUserData = async () => {
    const data: any = await AsyncStorage.getItem('userData');
    if (!data) {
      return;
    } else {
      const jsonData = JSON.parse(data);
      setFirstName(jsonData.firstName || '');
      setLastName(jsonData.lastName || '');
      setStreetName(jsonData.streetName || '');
      setStreetNumber(jsonData.streetNumber || '');
      setPoBox(jsonData.poBox || '');
      setCity(jsonData.city || '');
      setState(jsonData.state || '');
      setZipCode(jsonData.zipCode || '');
      setCountry(jsonData.country || '');
      setEmail(jsonData.email || '');
      setProfile(jsonData.profile || '');
      setPassword(jsonData.password || '');
      setConfirmPassword(jsonData.password || '');
    }
  };

  useEffect(() => {
    getAsyncUserData();
  }, []);

  const handleAddClick = async () => {
    await AsyncStorage.removeItem('userData');
    setFirstName('');
    setLastName('');
    setStreetName('');
    setStreetNumber('');
    setPoBox('');
    setCity('');
    setState('');
    setZipCode('');
    setCountry('');
    setEmail('');
    setProfile('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
            onChangeText={text => setEmail(text)}
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

          <View style={styles.row}>
            <TextInput
              placeholder="Password"
              style={{...styles.input, width: '49%'}}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={!showPassword}
            />
            <TextInput
              placeholder="Confirm Password"
              style={{...styles.input, width: '49%'}}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry={!showPassword}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              value={showPassword}
              onValueChange={() => setShowPassword(!showPassword)}
            />
            <Text>Show Password</Text>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '98%',
            margin: 'auto',
          }}>
          <TouchableOpacity
            style={{...styles.button, width: '32%'}}
            onPress={handleAddClick}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.button, width: '32%'}}
            onPress={() => navigation.navigate('All Users')}>
            <Text style={styles.buttonText}>Modify</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.button, width: '32%'}}
            onPress={() => navigation.navigate('All Users')}>
            <Text style={styles.buttonText}>Delete</Text>
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
              backgroundColor: '#3d3d3d',
            }}>
            <Text style={styles.buttonText}>Query</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '98%',
            margin: 'auto',
          }}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next &#8594;</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
