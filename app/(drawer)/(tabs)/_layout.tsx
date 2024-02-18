import MaterialUI from '@expo/vector-icons/MaterialIcons';

import { colorTokens } from '@tamagui/themes';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialUI>['name'];
  color: string;
}) {
  return <MaterialUI size={28} style={styles.tabBarIcon} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colorTokens.dark.blue.blue10,
        tabBarStyle: {
          backgroundColor: colorTokens.dark.blue.blue3,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Registration',
          tabBarIcon: ({ color }) => <TabBarIcon name="library-books" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Ballot Boxes',
          tabBarIcon: ({ color }) => <TabBarIcon name="location-on" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Resources',
          tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
