import MaterialUI from '@expo/vector-icons/MaterialIcons';

import { colorTokens, tokens } from '@tamagui/themes';
import { Tabs } from 'expo-router';
import { StyleSheet, ViewStyle } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialUI>['name'];
  color: string;
}) {
  return <MaterialUI size={36} style={styles.tabBarIcon} {...props} />;
}

const TabBarStyle: ViewStyle = {
  position: 'absolute',
  display: 'flex',
  bottom: 40,
  paddingBottom: 12.5,
  paddingTop: 7,
  backgroundColor: colorTokens.dark.blue.blue3,
  borderRadius: 50,
  width: '92.5%',
  left: 14,
  borderWidth: 0,
  borderTopWidth: 0,
  right: 25,
  height: 70,
};

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
          tabBarStyle: TabBarStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="library-books" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Ballot Boxes',
          tabBarStyle: TabBarStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="location-on" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Resources',
          tabBarStyle: TabBarStyle,
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
