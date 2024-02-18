const url = ' https://www.googleapis.com/civicinfo/v2';
const apiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

const getPollingLocations = async () => {
  try {
    const apiKey = 'AIzaSyCzeDRQnBILR2KYB3e9VUrmcSTprGo0O8E';
    const requestBody = {
      address: encodeURIComponent('5200 Woodward Ave, Detroit, MI 48202'),
    };

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

    const votingLocations = [
      data.pollingLocations,
      data.earlyVoteSites,
      data.dropOffLocations,
    ];

    return votingLocations;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
export default getPollingLocations;
