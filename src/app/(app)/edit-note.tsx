import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView, } from 'react-native'; 
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; 
import { getNotesFromStorage, updateNoteInStorage } from '../../../utils/notesStorage';

const CATEGORIES = ['Work', 'Study', 'Personal']; 

export default function EditNoteScreen() { 
    const router = useRouter(); 
    const { id } = useLocalSearchParams<{ id: string }>(); 
    const [title, setTitle] = useState(''); 
    const [content, setContent] = useState(''); 
    const [category, setCategory] = useState('Personal');