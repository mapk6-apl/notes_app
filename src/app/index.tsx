import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from 'react'
import { Link } from 'expo-router'; //Link allows declarative navigation between file routes in Expo Route

export default function LoginScreen() {
  //we declare component state to track user inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //this function is triggered when a user taps 'Sign In'
  const handleLogin = () => {
    console.log('')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>

      {/* email address input field */}
      <TextInput placeholder='Email Address' value={email} onChangeText={setEmail} style={styles.input} keyboardType='email-address' autoCapitalize='none' />
      {/* password input field */}
      <TextInput placeholder='Password' value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#996666'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#ffffff'
  },
  input: {
    borderWidth: 2, //thickness of the input textbox border
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#faf7f4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  linkText:{
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#ffffff'
  }
});
