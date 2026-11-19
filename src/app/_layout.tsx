import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{headerShown: false}}/>; //removed text 'index' at the top of the screen
}
