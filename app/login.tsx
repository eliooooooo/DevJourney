import React, { useState } from 'react';
import { Button, TextInput, Image, useColorScheme } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '@/context/ctx';

export default function SignIn() {
  const colorScheme = useColorScheme() ?? 'light';
  const logo = colorScheme === 'dark' ? require('../assets/images/icon-light.png') : require('../assets/images/icon.png');

  const { signIn } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ThemedView style={{ flex: 1, flexDirection: 'column', gap: 20, justifyContent: 'center', alignItems: 'stretch', padding: 20 }}>
      <ThemedView>
        <Image source={logo} style={{ width: 100, height: 100, alignSelf: 'center' }} />
        <ThemedText style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>Welcome back ! Log In</ThemedText>
      </ThemedView>
      <TextInput
        placeholder="Email"
        placeholderTextColor={'gray'}
        value={email}
        onChangeText={setEmail}
        style={{ padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button
        onPress={() => {
          const user = { email, password };
          signIn(user);
        }}
        title="Log In"
      />
      <Link href="/register">
        <ThemedText style={{ textAlign: 'center' }}>No account ? <ThemedText style={{ textDecorationLine: 'underline', color: 'blue' }}>Register</ThemedText></ThemedText>
      </Link>
    </ThemedView>
  );
}
