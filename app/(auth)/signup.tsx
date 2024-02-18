import { useCallback, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  YStack,
  Theme,
  Button,
  XStack,
  Select,
  Input,
  Label,
  Sheet,
  Adapt,
  ScrollView,
  Checkbox,
  H6,
  H3,
  H4,
} from 'tamagui';

import checkRegistration from '~/api/checkRegistration';
import { auth, db } from '~/backend/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
export default function signup() {
  const [firstName, setFirstName] = useState<string>('Text');
  const [lastName, setLastName] = useState<string>('Text');
  const [month, setMonth] = useState<string>('--');
  const [day, setDay] = useState<string>('--');
  const [year, setYear] = useState<string>('--');
  const [zipCode, setZipCode] = useState<string>('Text');
  const [agreed, setAgreed] = useState<boolean>(false);

  const [voterStatus, setVoterStatus] = useState<string>('');
  const [submittedForm, setSubmittedForm] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // get sign in info for firebase sign in

  const { email, password } = useLocalSearchParams<{ email: string; password: string }>();

  const makeAPICall = useCallback(async () => {
    setSubmittedForm(true);

    // firebase create
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        console.log('Created account with:', user.email);
        await setDoc(doc(db, 'users', uid), {
          firstName: firstName,
          lastName: lastName,
          month: month,
          day: day,
          year: year,
          zipCode: zipCode,
        });
      })
      .catch((error: { code: any; message: any }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('user creation failed with: ', errorCode, errorMessage);
      });

    setSubmittedForm(false);
  }, [firstName, lastName, month, day, year, zipCode]);

  return (
    <Theme name="dark">
      <ScrollView padding="$4" backgroundColor="$blue1">
        <YStack space="$4">
          <H3 fontWeight={'$11'} paddingTop={20} paddingBottom={10}>
            Enter your registration info
          </H3>
          <XStack alignItems="center" space="$3">
            <YStack flex={1}>
              <Label htmlFor="firstName" color="$blue10">
                *First Name
              </Label>
              <CustomInput setText={setFirstName} placeholder="Your first name" />
            </YStack>
            <YStack flex={1}>
              <Label htmlFor="lastName" color="$blue10">
                *Last Name
              </Label>
              <CustomInput setText={setLastName} placeholder="Your last name" />
            </YStack>
          </XStack>
          <XStack alignItems="center" space="$3">
            <YStack flex={2.2}>
              <Label htmlFor="month" color="$blue10">
                *Month
              </Label>
              <SelectMenu selectedItem={month} setItem={setMonth} items={months} />
            </YStack>
            <YStack flex={1}>
              <Label htmlFor="day" color="$blue10">
                *Day
              </Label>
              <SelectMenu selectedItem={day} setItem={setDay} items={days} />
            </YStack>
            <YStack flex={1}>
              <Label htmlFor="year" color="$blue10">
                *Year
              </Label>
              <SelectMenu selectedItem={year} setItem={setYear} items={years} />
            </YStack>
          </XStack>
          <XStack alignItems="center" space="$2">
            <YStack flex={1} space="$2">
              <Label htmlFor="zipCode" color="$blue10">
                *Zip Code
              </Label>
              <CustomInput setText={setZipCode} placeholder="Your zip code" />
            </YStack>
          </XStack>
          <YStack paddingVertical="$3" space="$5">
            <H6 fontSize={10} textAlign="center" lineHeight={18} paddingHorizontal={4}>
              This webpage is intended for use by the individual voter to determine his or her voter
              registration status and other information related to voting. Access or attempted
              access to information that is exempt from public disclosure other than to you as the
              voter may subject you to criminal prosecution or civil liability.
            </H6>
            <XStack width={300} alignItems="center" space="$4">
              <Checkbox
                id="agreement"
                size="$4"
                onCheckedChange={(checked) => {
                  let check = checked.valueOf();
                  setAgreed(check === true);
                }}>
                <Checkbox.Indicator>
                  <H4 fontSize={18}>✓</H4>
                </Checkbox.Indicator>
              </Checkbox>
              <Label fontSize={11} lineHeight={18} htmlFor="agreement">
                I understand this statement and agree. You must check this box before you can view
                your voting information.
              </Label>
            </XStack>
          </YStack>
          <Button
            onTouchStart={makeAPICall}
            disabled={submittedForm}
            backgroundColor="$blue4"
            width="50%"
            alignSelf="center">
            Sign Up
          </Button>
        </YStack>
      </ScrollView>
    </Theme>
  );
}

type SelectProps = {
  selectedItem: string;
  setItem: (item: string) => void;
  items: string[];
};

const SelectMenu = (props: SelectProps) => {
  const { selectedItem, setItem, items } = props;

  return (
    <Select value={selectedItem} onValueChange={(value) => setItem(value)}>
      <Select.Trigger width={220} borderWidth={1} borderColor="$blue10" backgroundColor="$blue3">
        <Select.Value placeholder="--" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={true}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 40,
            mass: 1.2,
            stiffness: 250,
          }}>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        />

        <Select.Viewport minWidth={200}>
          <Select.Group>
            {items.map((item, i) => {
              return (
                <Select.Item index={i} key={item} value={item.toLowerCase()}>
                  <Select.ItemText>{item}</Select.ItemText>
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = Array.from({ length: 31 }, (_, index) => (index + 1).toString());
const years = Array.from({ length: 2009 - 1900 }, (_, index) => (2008 - index).toString());

const convertMonthToNumber = (monthName: string) => {
  switch (monthName.toLowerCase()) {
    case 'january':
      return '1';
    case 'february':
      return '2';
    case 'march':
      return '3';
    case 'april':
      return '4';
    case 'may':
      return '5';
    case 'june':
      return '6';
    case 'july':
      return '7';
    case 'august':
      return '8';
    case 'september':
      return '9';
    case 'october':
      return '10';
    case 'november':
      return '11';
    case 'december':
      return '12';
    default:
      return '0';
  }
};

type CustomInputProps = {
  setText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
};

const CustomInput = (props: CustomInputProps) => {
  const { setText, placeholder, secureTextEntry } = props;
  return (
    <Input
      borderWidth={1}
      borderColor="$blue10"
      backgroundColor="$blue3"
      placeholderTextColor="$blue10"
      placeholder={placeholder}
      onChangeText={(text) => setText(text)}
      secureTextEntry={secureTextEntry}
    />
  );
};
