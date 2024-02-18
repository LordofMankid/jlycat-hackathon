import { arrayUnion, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { XStack, YStack, Square, H2, Text, Button, Circle } from 'tamagui';

export default function ModalForm(docRef: any) {
  const [firstSection, setFirstSection] = useState(true);

  const uploadDataa = async (doccRef: any, newValue: number) => {
    docRef = doccRef.docRef;

    getDoc(docRef).then(async (docSnapshot: { exists: () => any; data: () => any }) => {
      console.log('hi');
      if (docSnapshot.exists()) {
        // Document exists, retrieve existing data
        await updateDoc(docRef, {
          waitTimes: arrayUnion(newValue),
        });

        let existingData: any[] = docSnapshot.data().waitTimes;
        existingData = [...existingData, newValue];
        let newWaitTime = 0;
        // Perform your calculations or operations (e.g., averaging)
        if (existingData.length == 0) {
          newWaitTime = 0;
        }
        const sum = existingData.reduce((acc, value) => acc + value, 0);
        const average = sum / existingData.length;

        const newData = {
          waitTime: average,
          waitTimes: existingData,
        };
        // Update the document with the new data
        await setDoc(docRef, newData);
        console.log(newData);
      } else {
        const newData = {
          waitTimes: [],
          waitTime: 0,
        };

        // Document doesn't exist, create it with the new data
        await setDoc(docRef, newData);
      }
    });
    setFirstSection(true);
  };
  return firstSection ? (
    <XStack justifyContent="space-evenly" alignItems="center">
      <Circle
        size="$8"
        backgroundColor="$red9"
        pressStyle={{ backgroundColor: '$red10', opacity: 0.8 }}></Circle>
      <Circle
        size="$8"
        backgroundColor="$green9"
        pressStyle={{ backgroundColor: '$green10', opacity: 0.8 }}
        onPress={() => {
          setFirstSection(false);
        }}></Circle>
    </XStack>
  ) : (
    <XStack height={'$11'} justifyContent="space-evenly" alignItems="center">
      <Circle
        size="$7"
        backgroundColor="$green10"
        borderColor="$green10"
        pressStyle={{ backgroundColor: '$green10', opacity: 0.8 }}
        onPress={() => {
          uploadDataa(docRef, 5);
        }}>
        <Text color="white"> {'<'}10 min</Text>
      </Circle>
      <Circle
        size="$7"
        backgroundColor="rgba(255, 239, 92, 0.80)"
        opacity={0.8}
        pressStyle={{ backgroundColor: 'rgba(255, 239, 92, 0.7)', opacity: 0.8 }}
        onPress={() => {
          uploadDataa(docRef, 20);
        }}>
        <Text color="white" textAlign="center">
          {'<'}10-30 min
        </Text>
      </Circle>
      <Circle
        size="$7"
        backgroundColor="rgba(255, 128, 43, 0.50)"
        borderColor="rgba(255, 128, 43)"
        pressStyle={{ backgroundColor: 'rgba(255, 128, 43, 0.50)', opacity: 0.8 }}
        onPress={async () => {
          uploadDataa(docRef, 45);
        }}>
        <Text color="white" textAlign="center">
          0.5 - 1 hr
        </Text>
      </Circle>
      <Circle
        size="$7"
        backgroundColor="rgba(242, 85, 90, 0.50)"
        pressStyle={{ backgroundColor: 'rgba(242, 85, 90, 0.50)', opacity: 0.8 }}
        onPress={() => {
          uploadDataa(docRef, 60);
        }}>
        <Text color="white" textAlign="center" fontSize={20}>
          {' '}
          1 hr+{' '}
        </Text>
      </Circle>
    </XStack>
  );
}
