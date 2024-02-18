import { XStack, YStack, Square, H2, Text, Button } from 'tamagui';
import MaterialUI from '@expo/vector-icons/MaterialIcons';

function Icon(props: { name: React.ComponentProps<typeof MaterialUI>['name']; color: string }) {
  return <MaterialUI size={24} {...props} />;
}

export default function LocationModal() {
  return (
    <YStack backgroundColor={'$blue1'} padding={20} borderRadius={25}>
      <YStack
        flex={1}
        justifyContent='center'
        alignItems='center'
        paddingTop={3}
        paddingBottom={20}
      >
        <Square width="$10" height={6} backgroundColor="white" borderRadius={50}></Square>
      </YStack>
      <H2 paddingBottom={20}>Texas Secretary of State Elections Division</H2>
      <XStack paddingBottom={20} space="$space.6">
        <Text color="white" fontSize={17} maxWidth={140} paddingTop={2}>1019 Braxos Street Austin TX, 78701</Text>
        <Button color="$blue11" size="$3.5" backgroundColor={"$blue4"} borderRadius={50}>
          Open in Google Maps
          <Icon name="chevron-right" color="white"></Icon>
        </Button>
      </XStack>

      <Square height={1} backgroundColor="$gray10"></Square>

      <Text color="white" fontSize={17} paddingTop={15} paddingBottom={15}>Election Date: 2024-03-05</Text>
      <Text color="$gray10" fontSize={17}>Polling Hours:</Text>
      <Text color="$gray10" fontSize={17} paddingBottom={15}>8:00 a.m. to 5:00 p.m. Central Time, Monday - Friday</Text>
      <Square height={1} backgroundColor="$gray10"></Square>
      <Text color="white" fontSize={17} paddingTop={20} paddingBottom={15}>Estimated Wait Time: ~10 min</Text>
      <Text color="white" fontSize={17} textAlign="center" paddingTop={20} paddingBottom={15}>See Local Data</Text>

      <Square width={0.5} height={353}></Square>
    </YStack>
  );
}
