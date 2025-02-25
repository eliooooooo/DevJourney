import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '@/context/ctx';

export default function SignIn() {
  const { signIn } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText>Sign In</ThemedText>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginVertical: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginVertical: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button
        onPress={() => {
          const user = { email, password };
          signIn(user);
          router.replace('/(app)');
        }}
        title="Sign In"
      />
    </ThemedView>
  );
}
