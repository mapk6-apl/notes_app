import AsyncStorage from '@react-native-async-storage/async-storage'; //using AsyncStorage as my database

const USER_KEY = '@user_credentials';

// this will retrieve saved user credentials from AsyncStorage
export const getUserFromStorage = async () => {
    try {
        //we fetch the raw string from storage
        const jsonValue = await AsyncStorage.getItem(USER_KEY);

        //here we parse the string back into a JavaScript object if it exists
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error reading user data:', error);
        return null;
    }
};