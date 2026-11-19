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
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#010709'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 24,
        textAlign: 'center'
    },
    input:{
        borderWidth: 1,
        borderColor: '#306a68',
        backgroundColor: '#121e24',
        color: '#ffffff',
        padding: 14,
        borderRadius: 8,
        marginBottom: 16
    },
    button: {
        backgroundColor: '#306a68',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8
    },
    buttonText:{
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16
    },
    linkText:{
        marginTop: 20,
        textAlign: 'center',
        color: '#4caf50',
        fontSize: 14
    }
});