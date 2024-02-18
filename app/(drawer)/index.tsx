import { YStack, H2, Separator, Theme, Button } from 'tamagui';

import EditScreenInfo from '../../components/edit-screen-info';
import { useAuth } from '~/context/auth';

const Page = () => {

  return (
    <Theme name="dark">
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor={"$blue1"}>
        <EditScreenInfo />
      </YStack>
    </Theme >
  );
};

export default Page;
