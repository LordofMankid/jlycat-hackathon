import { Bold } from '@tamagui/lucide-icons';
import {
  YStack,
  SizableText,
  Theme,
  ScrollView,
  Text,
  XStack,
  Button,
  Square,
  H2,
  Circle,
} from 'tamagui';
import RegisterButton from './registerButton';
import { LinearGradient } from 'tamagui/linear-gradient';

interface RegistrationStatusProps {
  registered: boolean;
  voted: boolean;
}

const RegistrationStatus: React.FC<RegistrationStatusProps> = ({ registered, voted }) => {
  return (
    <YStack space={'$6'}>
      <LinearGradient
        height={136}
        width={353}
        colors={['$blue3', '$blue8']}
        start={[0.3, 1.1]}
        end={[0, -0.18]}
        borderRadius={10}>
        <Square
          flex={1}
          alignItems="center"
          justifyContent="center"
          backgroundColor="$colorTransparent"
          borderRadius={10}>
          <XStack>
            <Circle
              borderWidth={1}
              borderColor={registered ? '$green9' : '$red9'}
              width={100}
              height={100}>
              <YStack>
                <Text color={registered ? '$green9' : '$red9'} fontWeight="bold" textAlign="center">
                  {registered ? 'Active' : 'Inactive'}
                </Text>
                <Text color={registered ? 'white' : '$gray9'}>Registered</Text>
              </YStack>
            </Circle>
            <Square
              width="$10"
              height={3}
              marginTop={50}
              backgroundColor={voted ? '$green9' : '$gray9'}></Square>
            <Circle
              borderWidth={1}
              borderColor={voted ? '$green9' : '$gray9'}
              width={100}
              height={100}>
              <YStack>
                <Text color={voted ? '$green9' : '$gray9'}>Voted</Text>
              </YStack>
            </Circle>
          </XStack>
        </Square>
      </LinearGradient>
      {registered ? <></> : <RegisterButton />}
    </YStack>
  );
};

export default RegistrationStatus;
