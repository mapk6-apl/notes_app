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

        const success = await updateUserInStorage({ 
            username: username.trim(), 
            email: email.trim(), 
            password: password.trim() ? password.trim() : undefined, }); 
            
            if (success) { 
                setPassword(''); 
                Alert.alert('Success', 'Your profile credentials have been updated!'); 
            } else { 
                Alert.alert('Error', 'Failed to update credentials.'); 
            } 
        };

        const handleLogout = async () => { 
            await logoutUser(); 
            router.replace('/'); 
        };

        return(
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#8B5E5E" />
        </Pressable>
        <Text style={styles.headerTitle}>Profile Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Avatar Icon */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={50} color="#8B5E5E" />
        </View>
        <Text style={styles.avatarText}>{username || 'User'}</Text>
      </View>
        )