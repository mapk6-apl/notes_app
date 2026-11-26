import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView} from 'react-native'; 
import { useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; 
import { getUserFromStorage, updateUserInStorage, logoutUser } from '../../../utils/authStorage';

