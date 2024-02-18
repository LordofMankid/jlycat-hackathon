import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet, Pressable, TouchableOpacity, Touchable, Text } from 'react-native';
import { useAuth } from '~/context/auth';

const { signOut } = useAuth();

const DrawerLayout = () => (
  <Drawer
    screenOptions={{
      drawerStyle: {
        backgroundColor: colorTokens.dark.blue.blue1,
      },
      headerStyle: {
        backgroundColor: colorTokens.dark.blue.blue3,
        borderBottomWidth: 0,
        shadowColor: "transparent",
      },
    }}>

    <Drawer.Screen
      name="(tabs)"
      options={{
        headerTitle: '',
        drawerLabel: 'Main',
        drawerLabelStyle: {
          color: "white"
        },
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="ballot" size={size} color="white" />
        ),
        drawerType: 'slide',
      }}
    />

    <Drawer.Screen
      name="index"
      options={{
        headerTitle: '',
        drawerLabel: 'Settings',
        drawerLabelStyle: {
          color: "white"
        },
        drawerIcon: () => (
          <Ionicons
            name="settings-outline"
            size={24}
            color="white"
            align="right"
            style={{ marginRight: 'auto' }}
          />
        ),
      }}
    />
  </Drawer>
);

export default DrawerLayout;
