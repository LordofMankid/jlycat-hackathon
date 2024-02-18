import { useCallback, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { YStack, H2, Separator, Theme, ScrollView } from 'tamagui';

const CivicAPI = () => {
  const [civicData, setCivicData] = useState(null);
  const getInfoForLocation = useCallback(async () => {
    try {
      const apiKey = 'AIzaSyCzeDRQnBILR2KYB3e9VUrmcSTprGo0O8E';
      const requestBody = {
        address: encodeURIComponent('5200 Woodward Ave, Detroit, MI'),
      };

      console.log(
        `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${apiKey}&address=${requestBody.address}&electionId=8115`
      );

      const response = await fetch(
        `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${apiKey}&address=${requestBody.address}&electionId=8115`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setCivicData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const clearData = () => {
    setCivicData(null);
  };

  return (
    <Theme name="light">
      <ScrollView>
        <YStack flex={1} alignItems="center" justifyContent="center">
          <H2>Google Civic API</H2>
          <Separator />
          <Button title="Fetch Civic Data" onPress={getInfoForLocation} />
          <Button title="Clear Search" onPress={clearData} />
          {civicData && (
            <View margin={5}>
              <Text>Election Information:</Text>
              <Text>{JSON.stringify(civicData.earlyVoteSites)}</Text>

              <Text>Date: {civicData.election.electionDay} </Text>
              <Text></Text>

              <Text>
                Location:
                {civicData.state[0].electionAdministrationBody.physicalAddress.locationName ||
                  'N/A'}
              </Text>
              <Text>
                {civicData.state[0].electionAdministrationBody.physicalAddress.line1 || 'N/A'}
              </Text>
              <Text>
                {civicData.state[0].electionAdministrationBody.physicalAddress.city || 'N/A'},
                {civicData.state[0].electionAdministrationBody.physicalAddress.state || 'N/A'},
                {civicData.state[0].electionAdministrationBody.physicalAddress.zip || 'N/A'}
              </Text>
              <Text></Text>

              <Text>Hours of Operations:</Text>
              <Text>{civicData.state[0].electionAdministrationBody.hoursOfOperation || 'N/A'}</Text>
              <Text></Text>

              <Text>Additional Links:</Text>
              <Text>{civicData.state[0].electionAdministrationBody.electionInfoUrl || 'N/A'}</Text>
              <Text>
                {civicData.state[0].electionAdministrationBody.absenteeVotingInfoUrl || 'N/A'}
              </Text>
              <Text>
                {civicData.state[0].electionAdministrationBody.votingLocationFinderUrl || 'N/A'}
              </Text>
              <Text>{civicData.state[0].electionAdministrationBody.ballotInfoUrl || 'N/A'}</Text>
            </View>
          )}
          {/* <EditScreenInfo path="app/(drawer)/(tabs)/index.tsx" /> */}
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default CivicAPI;
