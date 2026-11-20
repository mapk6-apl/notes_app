import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from 'react'
import { Link } from 'expo-router'; //Link allows declarative navigation between file routes in Expo Route
import {getUserFromStorage} from '../../utils/authStorage'
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  //we declare component state to track user inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  //this function is triggered when a user taps 'Sign In'
  const handleLogin = async() => {
    alert('Please enter your email and password');
    return;

    //we retrieve saved user from AsyncStorage
    const savedUser = await getUserFromStorage();

    if(!savedUser){
      alert('User account not found! Please sign up first.')
      return;
    }

    //here we validate the credentials against the saved data
    if(savedUser.email === email && savedUser.password === password){
      console.log('Login successful for:', savedUser.username);
    }else{
      alert('Invalid email or password')
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>

      {/* email address input field */}
      <TextInput placeholder='Email Address' placeholderTextColor='#7a6f6f' value={email} onChangeText={setEmail} style={styles.input} keyboardType='email-address' autoCapitalize='none' />
      {/* password input field */}
      <TextInput placeholder='Password' placeholderTextColor='#7a6f6f' value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

      {/* Sign In button */}
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>

      {/* navigation Link: pushes /register screen onto navigation stack */}
      <Link href='/register' style={styles.linkText}>Don't have an account? Sign Up</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: '#faf7f4'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2d2727'
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#2d2727',
    borderWidth: 1.5, //thickness of the input textbox border
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    borderColor: '#c8bcb4'
  },
  button: {
    backgroundColor: '#8b5e5e',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#8b5e5e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#faf7f4',

  },
  linkText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#8b5e5e',
    fontWeight: '600',
    textDecorationLine: 'underline'
  }
});
