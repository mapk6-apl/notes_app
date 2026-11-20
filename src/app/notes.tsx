import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native';

export default function NotesScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>My Notes</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#faf7f4'
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2d2727'
    }
})