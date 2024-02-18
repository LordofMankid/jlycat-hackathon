import { YStack, H2, Paragraph, Button, Text, ScrollView } from 'tamagui';
import { useAuth } from '~/context/auth';
import { colorTokens } from '@tamagui/themes';

export default function EditScreenInfo({ path }: { path: string }) {
  const { signOut } = useAuth();
  return (
    <YStack>
      <Button backgroundColor="$blue3" borderColor="$blue6" onPress={() => signOut()}>
        <Text color="white">Sign Out</Text>
      </Button>
      <YStack borderRadius="$3" marginVertical="$1">
        <Paragraph>{path}</Paragraph>
      </YStack>
      <Paragraph textAlign='center'>
        Additional Features: TDB
      </Paragraph>
    </YStack >
  );
}
