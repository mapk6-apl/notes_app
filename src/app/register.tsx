import React, { useState } from 'react'; 
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'; 
import { Link } from 'expo-router';

export default function RegisterScreen(){
    const [username, setusername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister=()=>{
        //basic check that ensures no field is left blank
        if(!username || !email || !password){
            console.log('Please fill in all fields')
            return;
        }
    }
}