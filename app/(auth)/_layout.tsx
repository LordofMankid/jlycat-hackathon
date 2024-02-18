import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet } from 'react-native';

const AuthLayout = () => (
    <>
    <StatusBar />
    <Stack screenOptions={{headerShown: false}}/>
  </>
);


export default AuthLayout;
