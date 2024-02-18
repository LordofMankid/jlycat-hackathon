import { XStack, YStack, Square, H2, Text, Button } from 'tamagui';
import MaterialUI from '@expo/vector-icons/MaterialIcons';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { db } from '~/backend/firebase';
import { doc } from 'firebase/firestore';
function Icon(props: { name: React.ComponentProps<typeof MaterialUI>['name']; color: string }) {
  return <MaterialUI size={24} {...props} />;
}

function makeQuery(location: any) {
  return encodeURIComponent(location.address.line1)
    .replace(/%20/g, '+')
    .concat(encodeURIComponent(location.address.city).replace(/%20/g, '+'))
    .concat(encodeURIComponent(location.address.state).replace(/%20/g, '+'));
}

async function getLocationRef(latitude: any, longitude: any) {
  const roundedLat = Math.round(latitude * 1000) / 1000;
  const roundedLng = Math.round(longitude * 1000) / 1000;

  // Combine them to create a unique identifier
  const uniqueId = `${roundedLat}_${roundedLng}`;

  const locationRef = doc(db, 'pollingLocations', uniqueId);
  return locationRef;
}

async function reverseGeoLocation(latitude: any, longitude: any) {
  const apiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'OK' && data.results.length > 0) {
        const placeId = data.results[0].place_id;
        console.log('Place ID:', placeId);
      } else {
        console.error('Error in geocoding request:', data.status);
      }
    })
    .catch((error) => {
      console.error('Error in fetch:', error);
    });
}

export default function LocationModal(locationObject: any) {
  location = locationObject.location;

  return (
    <YStack flex={1} backgroundColor={'$blue1'} padding={20} borderRadius={25}>
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        paddingTop={3}
        paddingBottom={20}>
        <Square width="$10" height={6} backgroundColor="white" borderRadius={50}></Square>
      </YStack>
      {location && location.address && (
        <>
          <H2>{location.address.locationName}</H2>
          <XStack paddingBottom={20} space="$space.6">
            <Text color="white" fontSize={17} maxWidth={140}>
              {location.address.line1} {location.address.city}, {location.address.state},
              {location.address.zip}
            </Text>
            <Button
              color="$blue11"
              size="$3.5"
              backgroundColor={'$blue4'}
              borderRadius={50}
              onPress={() => {
                const query = makeQuery(location);
                WebBrowser.openBrowserAsync(`http://maps.google.com/?q=${query}`);
              }}>
              Open in Google Maps
              <Icon name="chevron-right" color="white"></Icon>
            </Button>
          </XStack>

          <Square height={1} backgroundColor="$gray10"></Square>

          <Text color="white" fontSize={17} paddingTop={15} paddingBottom={15}>
            Election Date: 2024-03-05
          </Text>
          <Text color="$gray10" fontSize={17}>
            Polling Hours:
          </Text>
          <Text color="$gray10" fontSize={17} paddingBottom={15}>
            {location.pollingHours}
          </Text>
          <Square height={1} backgroundColor="$gray10"></Square>
          <Text color="white" fontSize={17} paddingTop={20} paddingBottom={15}>
            Estimated Wait Time: ~10 min
          </Text>
          <Text color="white" fontSize={17} textAlign="center" paddingTop={20} paddingBottom={15}>
            See Local Data
          </Text>

          <Square width={0.5} height={353}></Square>
        </>
      )}
    </YStack>
  );
}
