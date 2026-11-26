import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView, } from 'react-native'; 
import { useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; 
import { saveNoteToStorage } from '../../../utils/notesStorage';

export default function AddNoteScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Work'); // Default category

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert(
        'Validation Error',
        'Please enter both a title and content for your note.'
      );
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category: category.trim() || 'General',
      createdAt: new Date().toISOString(),
    };

    const success = await saveNoteToStorage(newNote);
    if (success) {
      router.back(); // Returns to Notes list
    } else {
      Alert.alert('Error', 'Failed to save the note. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Add your JSX UI here */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F4',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D2727',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D2727',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E2DC',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#2D2727',
  },
  contentInput: {
    height: 180,
  },
  saveButton: {
    backgroundColor: '#8B5E5E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    marginTop: 24,
  },
  saveButtonText: {
    color: '#FAF7F4',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
