import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView} from 'react-native'; 
import { useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; 
import { getUserFromStorage, updateUserInStorage, logoutUser } from '../../../utils/authStorage';

export default function ProfileScreen() { 
    const router = useRouter(); 
    const [username, setUsername] = useState('');
     const [email, setEmail] = useState(''); 
     const [password, setPassword] = useState('');
     
     useEffect(() => { 
        loadUserData(); 
    }, []);

    const loadUserData = async () => { 
        const user = await getUserFromStorage(); 
        if (user) { 
            setUsername(user.username || ''); 
            setEmail(user.email || ''); 
        } 


    const handleUpdateProfile = async () => { 
        if (!username.trim() || !email.trim()) { 
            Alert.alert('Validation Error', 'Username and email cannot be empty.'); 
            return; 
        }

            };