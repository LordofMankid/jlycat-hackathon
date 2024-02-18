import { YStack, SizableText, Theme, ScrollView, Text, XStack, Button, Square, H2 } from 'tamagui';
import MaterialUI from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '~/context/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '~/backend/firebase';
import checkRegistration from '~/api/checkRegistration';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import RegistrationStatus from '~/components/registrationStatus';

function Icon(props: { name: React.ComponentProps<typeof MaterialUI>['name']; color: string }) {
  return <MaterialUI size={28} {...props} />;
}

export default function TabOneScreen() {
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState<boolean>(false);
  const [alreadyLoaded, setAlreadyLoaded] = useState<boolean>(false);

  // user + polling info data
  const [name, setName] = useState<string>();
  const [dob, setDob] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [wardNumber, setWardNumber] = useState<string>();
  const [precinctNumber, setPrecinctNumber] = useState<string>();
  const [facilityName, setFacilityName] = useState<string>();
  const [pollAddress, setPollAddress] = useState<string>();
  const [townClerkEmail, setTownClerkEmail] = useState<string>();
  const [townClerkFax, setTownClerkFax] = useState<string>();
  const [townClerkPhone, setTownClerkPhone] = useState<string>();
  const [townClerkWebsite, setTownClerkWebsite] = useState<string>();
  const [districtRepresentatives, setDistrictRepresentatives] = useState<any[]>([]);
  const [electedOfficials, setElectedOfficials] = useState<any[]>([]);

  // registration / voted status
  const [registered, setRegistered] = useState(false);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    if (alreadyLoaded) {
      return;
    }
    (async () => {
      setLoading(true);
      if (user != null) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setName(docSnap.data().firstName + ' ' + docSnap.data().lastName);
          setDob(docSnap.data().month + ' ' + docSnap.data().day + ', ' + docSnap.data().year);

          // check registration
          const dataResponse = await checkRegistration(
            docSnap.data().firstName,
            docSnap.data().lastName,
            docSnap.data().month,
            docSnap.data().day,
            docSnap.data().year,
            docSnap.data().zipCode
          );
          const data = dataResponse.data;

          // means user has not registered
          if (dataResponse.status !== 'Active') {
            setRegistered(false);
          } else {
            setRegistered(true);
            setAddress(data.address);
            setWardNumber(data.wardNumber);
            setPrecinctNumber(data.precinctNumber);
            setFacilityName(data.facilityName);
            setPollAddress(data.pollAddress);
            setTownClerkEmail(data.townClerkEmail);
            setTownClerkPhone(data.townClerkPhone);
            setTownClerkFax(data.townClerkFax);
            setTownClerkWebsite(data.townClerkWebsite);
            setElectedOfficials(data.electedOfficials);
            console.log(data.disrictRepresentatives);
            setDistrictRepresentatives(data.districtRepresentatives);
          }

          setLoading(false);
          setAlreadyLoaded(true);
        }
      } else {
        console.log('Error getting registration info: not logged in');
        setLoading(false);
      }
    })();
  }, [isFocused]);

  return (
    <Theme name="dark">
      <YStack backgroundColor={'$blue1'} flex={1} alignItems="center" justifyContent="center">
        {loading ? (
          <H2>Loading...</H2>
        ) : (
          <ScrollView space="$space.3">
            <SizableText size="$10" fontSize={25} paddingTop={20}>
              Welcome, {name}
            </SizableText>
            <RegistrationStatus registered={registered} voted={voted} />

            {registered ? (
              <YStack space="$space.3">
                <SizableText size="$6" fontSize={23}>
                  Voter Registration Details
                </SizableText>
                <XStack
                  flexWrap="wrap"
                  backgroundColor={'$blue2'}
                  borderRadius={10}
                  borderColor={'$blue6'}
                  borderWidth={1}
                  space="$space.2"
                  width={353}>
                  <YStack width={115} padding={16}>
                    <Text color="white" paddingBottom={16}>
                      Name
                    </Text>
                    <Text color="white" paddingBottom={16}>
                      Date of Birth
                    </Text>
                    <Text color="white">Residental Address</Text>
                  </YStack>
                  <Square
                    flex={1}
                    maxWidth={0.5}
                    backgroundColor={'$blue6'}
                    borderColor={'$blue6'}
                    borderWidth={0.5}></Square>
                  <YStack paddingLeft={24} padding={16} width={200}>
                    <Text color="white" paddingBottom={16}>
                      {name}
                    </Text>
                    <Text color="white" paddingBottom={16}>
                      {dob}
                    </Text>
                    <Text color="white">{address}</Text>
                  </YStack>
                </XStack>

                <SizableText fontSize={20} paddingTop={20}>
                  View My Ballot
                </SizableText>
                <XStack space="$space.6" flex={1} alignItems="center" justifyContent="center">
                  <Button backgroundColor={'$blue4'} color={'$blue12'} borderRadius={50} size="$3">
                    Democratic
                  </Button>
                  <Button backgroundColor={'$blue4'} color={'$blue12'} borderRadius={50} size="$3">
                    Republican
                  </Button>
                  <Button backgroundColor={'$blue4'} color={'$blue12'} borderRadius={50} size="$3">
                    Libertarian
                  </Button>
                </XStack>

                <SizableText fontSize={20} paddingTop={20}>
                  Voting Location
                </SizableText>
                <XStack
                  flexWrap="wrap"
                  backgroundColor={'$blue2'}
                  borderRadius={10}
                  borderColor={'$blue6'}
                  borderWidth={1}
                  space="$space.2"
                  width={353}>
                  <YStack width={115} padding={16}>
                    <Text color="white" paddingBottom={16}>
                      Ward No.
                    </Text>
                    <Text color="white" paddingBottom={16}>
                      Precinct
                    </Text>
                    <Text color="white" paddingBottom={16}>
                      Facility Name
                    </Text>
                    <Text color="white">Address</Text>
                  </YStack>
                  <Square
                    flex={1}
                    maxWidth={0.5}
                    backgroundColor={'$blue6'}
                    borderColor={'$blue6'}
                    borderWidth={0.5}></Square>
                  <YStack paddingLeft={24} padding={16} width={200}>
                    <Text color="white" paddingBottom={16}>
                      {wardNumber}
                    </Text>
                    <Text color="white" paddingBottom={16}>
                      {precinctNumber}
                    </Text>
                    <Text color="white" paddingBottom={16}>
                      {facilityName}
                    </Text>
                    <Text color="white">{pollAddress}</Text>
                  </YStack>
                </XStack>

                <SizableText fontSize={20} paddingTop={20}>
                  Voting City/Town Clerk
                </SizableText>
                <XStack
                  flexWrap="wrap"
                  backgroundColor={'$blue2'}
                  borderRadius={10}
                  borderColor={'$blue6'}
                  borderWidth={1}
                  space="$space.2"
                  width={353}>
                  <YStack width={100} padding={16}>
                    <Text color="white" paddingBottom={16}>
                      Phone
                    </Text>
                    <Text color="white" paddingBottom={16}>
                      Fax
                    </Text>
                    <Text color="white" paddingBottom={16}>
                      Email
                    </Text>
                    <Text color="white">Website</Text>
                  </YStack>
                  <Square
                    flex={1}
                    maxWidth={0.5}
                    backgroundColor={'$blue6'}
                    borderColor={'$blue6'}
                    borderWidth={0.5}></Square>
                  <YStack paddingLeft={24} padding={16} width={235}>
                    <Text color="white" paddingBottom={16}>
                      {townClerkPhone}
                    </Text>
                    <Text color="white" paddingBottom={16}>
                      {townClerkFax}
                    </Text>
                    <Text color="white" paddingBottom={16}>
                      {townClerkEmail}
                    </Text>
                    <Text color="white">{townClerkWebsite}</Text>
                  </YStack>
                </XStack>

                <SizableText fontSize={20} paddingTop={20}>
                  Your Elected Officials
                </SizableText>
                <YStack
                  maxWidth={353}
                  borderWidth={1}
                  backgroundColor={'$blue2'}
                  borderColor={'$blue6'}
                  borderRadius={10}>
                  {electedOfficials != null &&
                    electedOfficials.map((official) => {
                      return (
                        <XStack
                          flex={1}
                          alignItems="center"
                          justifyContent="space-between"
                          borderBottomColor={'$blue6'}
                          borderBottomWidth={1}
                          padding={16}>
                          <YStack>
                            <Text color={'$blue12'} paddingBottom={4}>
                              {official.name}
                            </Text>
                            <Text color={'$blue11'}>{official.title}</Text>
                          </YStack>
                          <Icon name="chevron-right" color="white"></Icon>
                        </XStack>
                      );
                    })}
                </YStack>

                <SizableText fontSize={20} paddingTop={20}>
                  Current District Representatives
                </SizableText>
                <XStack
                  borderWidth={1}
                  backgroundColor={'$blue2'}
                  borderColor={'$blue6'}
                  borderRadius={10}
                  maxWidth={350}>
                  <YStack width={180} borderRightColor={'$blue6'}>
                    {districtRepresentatives != null &&
                      districtRepresentatives
                        .slice(0, Math.floor(districtRepresentatives.length / 2))
                        .map((rep) => {
                          return (
                            <XStack
                              flex={1}
                              alignItems="center"
                              justifyContent="space-between"
                              borderColor={'$blue6'}
                              borderBottomWidth={1}
                              borderRightWidth={1}
                              padding={16}>
                              <YStack>
                                <Text color={'$blue12'} paddingBottom={4}>
                                  {rep.name}
                                </Text>
                                <Text color={'$blue11'}>{rep.title}</Text>
                              </YStack>
                            </XStack>
                          );
                        })}
                  </YStack>

                  {/* 2nd column */}
                  <YStack maxWidth={175}>
                    {districtRepresentatives != null &&
                      districtRepresentatives
                        .slice(Math.floor(districtRepresentatives.length / 2))
                        .map((rep) => {
                          return (
                            <XStack
                              flex={1}
                              alignItems="center"
                              justifyContent="space-between"
                              borderColor={'$blue6'}
                              borderBottomWidth={1}
                              padding={16}>
                              <YStack>
                                <Text color={'$blue12'} paddingBottom={4}>
                                  {rep.name}
                                </Text>
                                <Text color={'$blue11'}>{rep.title}</Text>
                              </YStack>
                            </XStack>
                          );
                        })}
                  </YStack>
                </XStack>

                <YStack padding={50} flex={1} alignItems="center" justifyContent="center">
                  <Text color="white">--------- IN DEVELOPMENT ---------</Text>
                </YStack>
              </YStack>
            ) : null}
          </ScrollView>
        )}
      </YStack>
    </Theme>
  );
}
