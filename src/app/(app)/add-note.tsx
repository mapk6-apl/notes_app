import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView, } from 'react-native'; 
import { useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; 
import { saveNoteToStorage } from '../../../utils/notesStorage';
