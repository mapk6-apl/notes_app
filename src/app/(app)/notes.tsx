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
};

//search matching: matches keywprds against title and content
const searchFilteredNotes = notes.filter((note) => {
    if(!searchQuery.trim())
        return true;
    const words = searchQuery.toLowerCase().trim().split(/\s+/);
    const titleText = note.title.toLowerCase();
    const contentText = note.content.toLowerCase()

    //ensures every search word appears in either title or content
    return words.every((word => titleText.includes(word) || contentText.includes(word));
});

//category filtering
const categoryFilteredNotes = searchFilteredNotes.filter((note) => {
    if(selectedCategory === 'All')
    return true;
return note.category.toLowerCase()=== selectedCategory.toLowerCase();
});

//date sorting: ascending vs descending
const sortedNotes = [...categoryFilteredNotes].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
});
