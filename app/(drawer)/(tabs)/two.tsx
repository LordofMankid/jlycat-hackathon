import { YStack, SizableText, Theme, ScrollView, Text, XStack, Button, Square } from 'tamagui';
import MaterialUI from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '~/context/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '~/backend/firebase';
import checkRegistration from '~/api/checkRegistration';
import { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// import LocationModal from '../components/map';

function Icon(props: { name: React.ComponentProps<typeof MaterialUI>['name']; color: string }) {
  return <MaterialUI size={28} {...props} />;
}

export default function TabTwoScreen() {
  return (
    <Theme name="dark">
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 42.40711,
          longitude: -71.11355,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}></MapView>
    </Theme>
    // <LocationModal></LocationModal>
  );
}
