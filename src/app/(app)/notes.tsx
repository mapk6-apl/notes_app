import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, Pressable FlatList, StyleSheet, Alert} from 'react-native';
import {useRouter, useFocusEffect, Link} from 'expo-router';
import {getNotesFromStorage, deleteNoteFromStorage, Note} from '../../../utils/notesStorage';

//categories supported by my app
const CATEGORIES = ['All', 'Work', 'Study', 'Personal'];

export default function NotesScreen(){
    const router = useRouter();

    //here we manage the state
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All'); //default state; liek on a dropdown
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

}