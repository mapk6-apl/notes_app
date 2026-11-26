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
    if (id) {
      loadNoteData(id);

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
      router.back();
    }
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

    if (success) {
      router.back(); // Return to Notes list screen 
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

      {/* Category Picker */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryRow}>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={category}
            onPress={() => setCategory(cat)}
            style={[
              styles.categoryChip,
              category === cat && styles.categoryChipActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                category === cat && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Title Input */}
      <Text style={styles.label}>Title (Optional)</Text>
      <TextInput
        placeholder="Enter title..."
        placeholderTextColor="#7A6F6F"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      {/* Content Input */}
      <Text style={styles.label}>Content</Text>
      <TextInput
        placeholder="Write your note content here..."
        placeholderTextColor="#7A6F6F"
        value={content}
        onChangeText={setContent}
        style={[styles.input, styles.textArea]}
        multiline
        textAlignVertical="top"
      />

      {/* Save Changes Button */}
      <Pressable style={styles.saveButton} onPress={handleUpdate}>
        <Ionicons name="checkmark-outline" size={22} color="#FAF7F4" style={styles.saveIcon} />
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </Pressable>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAF7F4', 
  },
  content: { 
    padding: 20, 
    paddingBottom: 40
   },header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
     marginBottom: 20, 
     marginTop: 10
     }, 
     backButton: {
       padding: 4
       }, 
       headerTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#2D2727'
       },
       
})