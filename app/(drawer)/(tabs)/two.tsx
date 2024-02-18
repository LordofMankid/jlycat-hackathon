import {
  YStack,
  SizableText,
  Theme,
  ScrollView,
  Text,
  XStack,
  Button,
  Square,
  Input,
  Image,
} from 'tamagui';
import MaterialUI from '@expo/vector-icons/MaterialIcons';
import * as Location from 'expo-location';
import { Key, useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import getPollingLocations from '~/api/getPollingLocations';
import LocationModal from '~/components/map';
import type { SheetProps } from '@tamagui/sheet';
import { Sheet, useSheet } from '@tamagui/sheet';
// import LocationModal from '../components/map';

function Icon(props: { name: React.ComponentProps<typeof MaterialUI>['name']; color: string }) {
  return <MaterialUI size={28} {...props} />;
}

const spModes = ['percent', 'constant', 'fit', 'mixed'] as const;

const placeHolderLocation = {
  address: {
    locationName: 'BETHEL AME CH HALL',
    line1: '5050 ST. ANTOINE',
    city: 'DETROIT',
    state: 'MI',
    zip: '48202',
  },
  pollingHours: 'Tue, Feb 27: 7 am - 8 pm',
  latitude: 42.3605679,
  longitude: -83.0568187,
  startDate: '2024-02-27',
  endDate: '2024-02-27',
  sources: [
    {
      name: 'Voting Information Project',
      official: true,
    },
  ],
};
export default function TabTwoScreen() {
  // ACTUAL STUFF
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [polls, setPolls] = useState<any[] | undefined>([]);
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log(location);
  };

  const getPolls = async () => {
    const pollLocations = await getPollingLocations();
    setPolls(pollLocations);
  };
  useEffect(() => {
    // getUserLocation();
    getPolls();
  }, []);

  // ANIMATION STUFF

  const [position, setPosition] = useState(0);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(true);
  const [snapPointsMode, setSnapPointsMode] = useState<(typeof spModes)[number]>('percent');
  const [mixedFitDemo, setMixedFitDemo] = useState(false);

  const isPercent = snapPointsMode === 'percent';
  const isConstant = snapPointsMode === 'constant';
  const isFit = snapPointsMode === 'fit';
  const isMixed = snapPointsMode === 'mixed';
  const snapPoints = isPercent
    ? [85, 50, 25]
    : isConstant
      ? [256, 190]
      : isFit
        ? undefined
        : mixedFitDemo
          ? ['fit', 110]
          : ['80%', 256, 190];
  const [selectedLocation, setSelectedLocation] = useState<any>(placeHolderLocation);
  const renderMarkers = () => {
    // nested for loop cuz it's stored sep by location vote type
    if (polls) {
      return polls.map((item: any, index2: number) => {
        return item.map((item2: any, index: Key | null | undefined) => (
          <Marker
            key={index}
            coordinate={{
              latitude: item2.latitude,
              longitude: item2.longitude,
            }}
            onPress={() => {
              setSelectedLocation(item2);
              setOpen(true);
            }}></Marker>
        ));
      });
    }
    return null; // Return null if polls is undefined
  };
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
        }}
        showsUserLocation={true}>
        <Marker
          coordinate={{
            latitude: location != null ? location.coords.latitude : 42.40711,
            longitude: location != null ? location.coords.longitude : -71.11355,
          }}
          onPress={() => {
            console.log("what's up");
          }}
        />

        {renderMarkers()}
      </MapView>

      <Sheet
        forceRemoveScrollEnabled={open}
        modal={modal}
        open={open}
        onOpenChange={setOpen}
        snapPoints={snapPoints}
        snapPointsMode={snapPointsMode}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation={'bouncy'}>
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" justifyContent="center" alignItems="center">
          <LocationModal location={selectedLocation} />
        </Sheet.Frame>
      </Sheet>
    </Theme>
    // <LocationModal></LocationModal>
  );
}
