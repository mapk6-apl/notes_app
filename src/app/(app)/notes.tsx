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

    //we ensure that we load the notes eveytime the screen comes into focus (ex. after adding or editing a note)
    useFocusEffect(
        useCallback(
          () => {
            loadNotes();
          },
          [],
        )
        
    );

    const loadNotes = async () => {
        const storedNotes = await getNotesFromStorage();
        setNotes(storedNotes);
    };

    //delet note handler/function
    const handleDelete = (id: string, title: string) => {
        Alert.alert('Delete Note', `Are you sure you want to delete "${title || 'this note'}"?`,
            [{text: 'Cancel', style: 'cancel'},
                {text: 'Delete', style: 'destructive', onPress: async () => {
                    const success = await deleteNoteFromStorage(id);
                    if(success){
                        loadNotes();
                    }else{
                        Alert.alert('Error', 'Could not delete the note.')
                    }
                }}
            ]
        )
    }
}