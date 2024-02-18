import { YStack, H4, Paragraph, Button } from 'tamagui';
import { useAuth } from '~/context/auth';

export default function EditScreenInfo({ path }: { path: string }) {
  const { signOut } = useAuth();
  return (
    <YStack>
      <YStack alignItems="center" marginHorizontal="$6">
        <H4>Open up the code for this screen:</H4>
        <Button backgroundColor="black" onPress={() => signOut()}>
          Sign Out
        </Button>
        <YStack borderRadius="$3" marginVertical="$1">
          <Paragraph>{path}</Paragraph>
        </YStack>
        <Paragraph>
          Change any of the text, save the file, and your app will automatically update.
        </Paragraph>
      </YStack>
    </YStack>
  );
}
