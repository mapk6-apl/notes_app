import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        //basic check that ensures no field is left blank
        if (!username || !email || !password) {
            console.log('Please fill in all fields')
            return;
        }

        console.log('Registering user:', { username, email, password })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            {/* username input field */}
            <TextInput placeholder='Username' value={username} onChangeText={setUsername} style={styles.input} autoCapitalize='none' />
            {/* email address input field */}
            <TextInput placeholder='Email Address' value={email} onChangeText={setEmail} style={styles.input} keyboardType='email-address' autoCapitalize='none' />
            {/* password input field */}
            <TextInput placeholder='Password' value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

            {/* Registration submit button */}
            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>

            {/* navigation Link to return back to Login screen */}
            <Link href='/' style={styles.linkText}>Already have an account? Sign In</Link>

        </View>
    )
}