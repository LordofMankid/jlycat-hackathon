import { YStack, H2, Theme, Paragraph, Text, Button } from 'tamagui';

export default function enableNotifications() {
  return (
    <Theme name="dark">
      <YStack backgroundColor={'$blue1'} flex={1} alignItems="center" justifyContent="center">
        <H2 color="white">Get Important Updates</H2>
        <Paragraph textAlign="center" maxWidth={313} paddingTop={40} paddingBottom={60}>
          Stay connected and never miss an update! Turn on notifications to receive important alerts
          about voter registration deadlines, polling location changes, wait times, and more. Keep
          informed and engaged with MyVoterInfo!"
        </Paragraph>

        <Button borderRadius={5} backgroundColor={'$blue4'}>
          Turn Notifications On
        </Button>
        <Button width={160} chromeless>
          Maybe Later
        </Button>
      </YStack>
    </Theme>
  );
}
