import { View, TextInput, StyleSheet, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import LoginButton from '~/components/login/LoginButton';
import { Link } from 'expo-router';
import LoginInput from '~/components/login/LoginInput';
import { Image, Text, Button, Form, H1, Input, Spinner, Theme, YStack, XStack } from 'tamagui';
import { useAuth } from '~/context/auth';
import { YGroup } from 'tamagui';

const login = () => {
  const { signIn } = useAuth();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleEmail = (text: string) => {
    setEmail(text);
  };
  const handlePassword = (text: string) => {
    setPassword(text);
  };

  // form styling
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');

  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  return (
    <Theme name="dark">
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor={'$blue1'}
        space={'$space.3'}>
        <Image
          source={require('~/assets/logo.png')}
          width={500}
          height={100}
          scale={0.55}
        />
        <Form
          space={'$space.5'}
          onSubmit={() => {
            setStatus('submitting');
            signIn(email, password);
          }}>
          <YStack space={'$space.1'} marginTop={-20}>
            <Text color={'$blue10'} paddingBottom={5}>*Email</Text>
            <Input
              minWidth={'83%'}
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={(text) => {
                handleEmail(text);
              }}
              borderColor={'$blue10'}
              placeholder="Enter your email"
              placeholderTextColor={'$blue10'}
              backgroundColor={"$blue3"}
              color={'$blue12'}
            />
          </YStack>
          <YStack space={'$space.1'}>
            <Text color={'$blue10'} paddingBottom={5}>*Password</Text>
            <Input
              borderColor={'$blue10'}
              minWidth={'$10'}
              secureTextEntry
              autoComplete={Platform.OS === 'ios' ? 'password-new' : 'new-password'}
              onChangeText={(text) => {
                handlePassword(text);
              }}
              placeholder="Enter your password"
              placeholderTextColor={'$blue10'}
              backgroundColor={"$blue3"}
              color={'$blue12'}
            />
            <Text color="white" paddingTop={10}>Forgot your Password? </Text>
          </YStack>
          <XStack space={'$3'}>
            <Link
              href={{ pathname: '/signup', params: { email: email, password: password } }}
              asChild>
              <Button backgroundColor={'transparent'} borderColor={'$blue6'} color={'$blue12'} flex={2}>
                Create Account
              </Button>
            </Link>
            <Form.Trigger asChild disabled={status !== 'off'}>
              <Button
                backgroundColor={'$blue4'}
                icon={status === 'submitting' ? () => <Spinner /> : undefined}
                flex={2}>
                Sign in
              </Button>
            </Form.Trigger>
          </XStack>
        </Form>
      </YStack>
    </Theme>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default login;
