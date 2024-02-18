import { XStack, YStack, Square, H2, Text, Button } from 'tamagui';
import MaterialUI from '@expo/vector-icons/MaterialIcons';

function Icon(props: { name: React.ComponentProps<typeof MaterialUI>['name']; color: string }) {
  return <MaterialUI size={28} {...props} />;
}

export default function LocationModal() {
  return (
    <YStack backgroundColor={'$blue1'} padding={20}>
      <H2>Location Name</H2>
      <YStack space="$space.5"></YStack>
      <XStack flex={1} justify-contents="center" align-items="center">
        <Text color="white">Address</Text>
        <Button color="white">
          Open in Google Maps
          <Icon name="minus" color="white"></Icon>
          <Icon name="plus" color="white"></Icon>
        </Button>
      </XStack>
      <Square width={0.5} height={353}></Square>
      <Text color="white">Election Date:</Text>
      <Text color="white">Polling Hours:</Text>
      <Square width={0.5} height={353}></Square>
    </YStack>
  );
}
