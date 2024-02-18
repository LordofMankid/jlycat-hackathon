import { XStack, YStack, Square, H2, Text, Button } from 'tamagui';
import MaterialUI from '@expo/vector-icons/MaterialIcons';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { db } from '~/backend/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ModalForm from './ModalForm';
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
  // Combine them to create a unique identifier
  const uniqueId = await reverseGeoLocation(latitude, longitude);

  const locationRef = doc(db, 'pollingLocations', uniqueId);

  return locationRef;
}

async function reverseGeoLocation(lat: any, long: any) {
  const apiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`;
  let placeId = '';
  await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'OK' && data.results.length > 0) {
        placeId = data.results[0].place_id;
      } else {
        console.error('Error in geocoding request:', data.status);
      }
    })
    .catch((error) => {
      console.error('Error in fetch:', error);
    });
  return placeId;
}

async function getWaitTime(documentRef: any) {
  let waitTime = 0;
  getDoc(documentRef)
    .then(async (docSnapshot: { exists: () => any; data: () => any }) => {
      if (docSnapshot.exists()) {
        // Document exists, you can access its data with docSnapshot.data()

        waitTime = docSnapshot.data().waitTime;
        console.log(waitTime);
        return waitTime;
      } else {
        const data = {
          waitTime: 0,
          waitTimes: [],
        };

        await setDoc(documentRef, data);
      }
    })
    .catch((error) => {
      console.error('Error getting document:', error);
    });
  return waitTime;
}

export default function LocationModal(locationObject: any) {
  location = locationObject.location;
  const [waitTime, setWaitTime] = useState(0);
  const [ref, setRef] = useState<any | null>(null);

  const [isLoading, setLoading] = useState(true);

  async function getWaitTime(documentRef: any) {
    let waitTime = 0;
    getDoc(documentRef)
      .then(async (docSnapshot: { exists: () => any; data: () => any }) => {
        if (docSnapshot.exists()) {
          // Document exists, you can access its data with docSnapshot.data()

          waitTime = docSnapshot.data().waitTime;
          setWaitTime(waitTime);
          return waitTime;
        } else {
          const data = {
            waitTime: 0,
            waitTimes: [],
          };

          await setDoc(documentRef, data);
        }
      })
      .catch((error) => {
        console.error('Error getting document:', error);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const locationRef = await getLocationRef(location.latitude, location.longitude);
      const waitDuration = await getWaitTime(locationRef);
      console.log(waitDuration);
      setWaitTime(waitDuration);
      setRef(locationRef);
      setLoading(false);
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    console.log(waitTime);
  }, [waitTime]);
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
          <XStack justifyContent="space-between">
            <Text color={'$blue10'} fontSize={17} paddingTop={20} paddingBottom={15}>
              Have you voted?
            </Text>
            <Text color="white" fontSize={17} paddingTop={20} paddingBottom={15}>
              Wait Time: ~{waitTime} min.
            </Text>
          </XStack>

          {ref && <ModalForm docRef={ref} />}
          <Square width={0.5} height={353}></Square>
        </>
      )}
    </YStack>
  );
}
