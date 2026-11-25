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

useEffect(() => { 
    if (id) { loadNoteData(id); 

    } 
}, [id]); 

const loadNoteData = async (noteId: string) => {
     const notes = await getNotesFromStorage(); 
     const existingNote = notes.find((n) => n.id === noteId); 
     
     if (existingNote) { 
        setTitle(existingNote.title || '');
         setContent(existingNote.content || ''); 
         setCategory(existingNote.category || 'Personal'); 
        } else { 
            Alert.alert('Error', 'Note not found.'); 
            router.back(); } 
        };