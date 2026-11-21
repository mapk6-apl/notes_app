import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = '@user_notes'

//this interface defines the notes data structure
export interface Note{
    id: string;
    title: string;
    content: string;
    category: string; //ex. work, study, personal
    createdAt: string; //iso timestamp when created
    updatedAt?: string //iso timestamp when edited
}

//fetch all existing notes from AsyncStorage
export const getNotesFromStorage = async(): Promise<Note[]> =>{
    try {
        const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Error reading notes from storage:', error);
        return [];
    }
}

//save a new note to AsyncStorage
export const saveNoteToStorage = async (newNote: Omit<Note, 'id' | 'createdAt'>): Promise<boolean> => {
    try {
        const currentNotes = await getNotesFromStorage();

        const noteToSave: Note = {
            ...newNote,
            // generates a unique id using timestamp
            id: Date.now().toString(),  
            createdAt: new Date().toISOString(),                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        };

        const updatedNotes = [noteToSave, ...currentNotes];
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
        return true;
    } catch (error) {
        console.error('Error saving note:', error);
        return false;
    }
};

// here we edit an existing note in AsyncStorage
export const updateNoteInStorage = async (
    id: string,
    updatedData: {title: string; content: string; category: string}
): Promise<boolean> => {
    try {
        const currentNotes = await getNotesFromStorage();

        const updatedNotes = currentNotes.map((note) => {
            if(note.id === id){
                return{
                    ...note,
                    ...updatedData,
                    updatedAt: new Date().toISOString(), //timestamp for edit
                };
            }
            return note;
        });
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    return true;
    } catch (error) {
        console.error('Error updating note:', error);
        return false;
    }
};

//remove note by id 
export const deleteNoteFromStorage = async (id: string): Promise<boolean> => {
    try {
        const currentNotes = await getNotesFromStorage();
        const filteredNotes = currentNotes.filter((note) => note.id != id)
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filteredNotes))
        return true;
    } catch (error) {
        console.error('Error deleting note:', error)
        return false;
    }
}


