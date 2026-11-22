import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, Pressable , FlatList, StyleSheet, Alert} from 'react-native';
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
    };

//search matching: matches keywprds against title and content
const searchFilteredNotes = notes.filter((note) => {
    if(!searchQuery.trim())
        return true;
    const words = searchQuery.toLowerCase().trim().split(/\s+/);
    const titleText = note.title.toLowerCase();
    const contentText = note.content.toLowerCase()

    //ensures every search word appears in either title or content
    return words.every((word => titleText.includes(word) || contentText.includes(word)));
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
})

return(
    <View style={styles.container}>
        {/* search input bar */}
        <View style={styles.searchContainer}>
            <TextInput placeholder='Search notes...' placeholderTextColor='7a6f6f' value={searchQuery} onChangeText={setSearchQuery} style={styles.searchInput}/>
        </View>

        {/* category selection tabs and sort toggle */}
        <View style={styles.controlsRow}>
            <View style={styles.categoryContainer}>
                {CATEGORIES.map((category) => (
                    <Pressable key={category} onPress={() => setSelectedCategory(category)} style={[styles.categoryChip, selectedCategory === category && styles.categoryChipActive]}>
                        <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>
                            {category}
                        </Text>
                    </Pressable>
                ))}
            </View>
            {/* sort button toggle */}
            <Pressable style={styles.sortButton} onPress={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}>
                <Text style={styles.sortButtonText}>
                    Date: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
                </Text>
            </Pressable>
        </View>

        {/* Notes List */}
        <FlatList data={sortedNotes} keyExtractor={(item) => item.id} contentContainerStyle={styles.listContent}
        ListEmptyComponent={
            <View styles={styles.emptyContainer}>
                <Text style={styles.emptyText}>No notes found.</Text>
            </View>
        }
        renderItem={({item}) => {
            <View style={styles.noteCard}>
                {/* header: category badge and actions */}
                <View style={styles.cardHeader}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.category}</Text>
                    </View>
                    <View style={styles.actionRow}>
                        {/* edit button */}
                        <Pressable onPress={() => router.push({
                            pathname: '/(app)/edit-note',
                            params: {id: item.id}
                        })} style={styles.actionButton}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                        {/* delete button */}
                        <Pressable onPress={() => handleDelete(item.id, item.title)} style={styles.actionButton}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </Pressable>
                    </View>
                </View>
                {/* note title */}
                {item.title ? <Text style={styles.noteTitle}>{item.title}</Text> : null}
            
                {/* note content */}
                <Text style={styles.noteContent} numberOfLines={3}>{item.content}</Text>

                {/* dates added and edited timestamps */}
                <View style={styles.cardFooter}>
                    <Text style={styles.dateText}>
                        Added: {new Date(item.createdAt).toLocaleDateString()}
                    </Text>
                    {item.updatedAt ? (
                        <Text style={styles.dateText}>
                            Edited: {new Date(item.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                        </Text>
                    ) : null}
                </View>
            </View>
        }} /> 

        {/* floating action button (FAB) to add a note */}
        <Link href="/(app)/add-note" asChild>
            <Pressable style={styles.fab}>
                <Text style={styles.fabIcon}>+</Text>
            </Pressable>
        </Link>
        </View>
)
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#faf7f4',
        paddingHorizontal: 16,
        paddingTop: 16
    },
    searchContainer: {marginBottom: 12},
    searchInput:{
        backgroundColor: '#ffffff',
        color: '#2d2727',
        borderWidth: 1.5,
        borderColor: '#e8e2dc',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: 15
    }
})

