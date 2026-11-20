import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import {registerUserInStorage} from '../../utils/authStorage'; 

export default function RegisterScreen() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        //basic check that ensures no field is left blank
        if (!username || !email || !password) {
            alert('Please fill in all required fields')
            return;
        }

        const userData = {username, email, password};

        //saving credentials to AsyncStorage
        const success = await registerUserInStorage(userData);

        if(success){
            alert('Account created successfully!')
            router.replace('/notes')
        }else{
            alert('Failed to register user. Please try again.')
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            {/* username input field */}
            <TextInput placeholder='Username' placeholderTextColor='#7a6f6f' value={username} onChangeText={setUsername} style={styles.input} autoCapitalize='none' />
            {/* email address input field */}
            <TextInput placeholder='Email Address' placeholderTextColor='#7a6f6f' value={email} onChangeText={setEmail} style={styles.input} keyboardType='email-address' autoCapitalize='none' />
            {/* password input field */}
            <TextInput placeholder='Password' placeholderTextColor='#7a6f6f' value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

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
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#faf7f4'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2d2727',
        marginBottom: 24,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#e8e2dc',
        backgroundColor: '#ffffff',
        color: '#2d2727',
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
        fontSize: 16
    },
    button: {
        backgroundColor: '#8b5e5e',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#8B5E5E',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 3
    },
    buttonText: {
        color: '#faf7f4',
        fontWeight: 'bold',
        fontSize: 16
    },
    linkText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#8b5e5e',
        fontSize: 14,
        textDecorationLine: 'underline'
    }
});