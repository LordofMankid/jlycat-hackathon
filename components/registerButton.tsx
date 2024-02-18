import { YStack, Text, XStack, Button } from 'tamagui';
import MaterialUI from '@expo/vector-icons/MaterialIcons';
import * as Linking from 'expo-linking';
function Icon(props: { name: React.ComponentProps<typeof MaterialUI>['name']; color: string }) {
  return <MaterialUI size={28} {...props} />;
}
export default function RegisterButton() {
  return (
    <Button
      maxWidth={'96%'}
      borderColor={'$blue6'}
      backgroundColor={'$blue2'}
      pressStyle={{ backgroundColor: '$blue8' }}
      onPress={() => Linking.openURL('https://www.sec.state.ma.us/OVR/')}>
      <Text color="white" fontSize={14}>
        Please submit a <Text color={'$red10'}>voter registration form</Text> online
      </Text>
      <Icon name="chevron-right" color="white"></Icon>
    </Button>
  );
}

{
  /* <XStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      borderBottomColor={'$blue6'}
      borderBottomWidth={1}
      padding={16}>
      <YStack paddingRight={250}>
        <Text color={'$blue12'} paddingBottom={4}>
          Name
        </Text>
        <Text color={'$blue11'}>Title</Text>
      </YStack>
      <Icon name="chevron-right" color="white"></Icon>
    </XStack> */
}
