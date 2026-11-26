import AsyncStorage from '@react-native-async-storage/async-storage'; //using AsyncStorage as my database

const USER_KEY = '@user_credentials';


// this will save newly registered user credentials
export const registerUserInStorage = async (userData: { username: string, email: string, password: string }) => {
    try {
        //we convert the JavaScript user object into a JSON string (AsyncStorage can only store raw string data)
        const jsonValue = JSON.stringify(userData);

        await AsyncStorage.setItem(USER_KEY, jsonValue);//save the stringified data under our storage key asynchronously

        return true;//indicates successful registration
    } catch (error) {
        console.error('Error saving user data:', error);
        return false;
    }
};

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

export const updateUserInStorage = async (updatedUser: {
    username: string;
    email: string;
    password?: string;
}): Promise<boolean> => {
    try {
        const existingData = await AsyncStorage.getItem(USER_KEY);
        if (!existingData)
            return false;

        const currentUser = JSON.parse(existingData);
        const newUserData = {
            ...currentUser,
            username: updatedUser.username,
            email: updatedUser.email,
            // Only update password if a new one is provided 
            password: updatedUser.password ? updatedUser.password : currentUser.password
        };

        await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUserData));
        return true;
    } catch (error) {
        console.error('Error updating user credentials:', error);
        return false;
    }
};

//Removes the stored user credentials/session from AsyncStorage on logout
export const logoutUser = async (): Promise<boolean> => {
    try { 
        await AsyncStorage.removeItem(USER_KEY); 
        return true;
     } catch (error) { 
        console.error('Error logging out user:', error); 
        return false; }
};