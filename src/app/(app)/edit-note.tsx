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

        const handleUpdate = async () => { 
            if (!content.trim()) { 
                Alert.alert('Missing Content', 'Please enter some text content for your note.'); 
                return; 
            } 
            
            if (!id) return; 
            
            const success = await updateNoteInStorage(id, { 
                title: title.trim(), 
                content: content.trim(), 
                category
            }); 
            
            if (success) { router.back(); // Return to Notes list screen 
            } else { 
                Alert.alert('Error', 'Failed to update note.'); 
            } 
        };

        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#8B5E5E" />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Note</Text>
        <View style={{ width: 24 }} />
      </View>