import React from 'react';
import { View, TextInput, Button, Image, useColorScheme } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSession } from '@/context/ctx';

const RegisterScreen = () => {
  const { register } = useSession();
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const colorScheme = useColorScheme() ?? 'light';
  const logo = colorScheme === 'dark' ? require('../assets/images/icon-light.png') : require('../assets/images/icon.png');

  return (
    <ThemedView style={{ flex: 1, flexDirection: 'column', gap: 20, justifyContent: 'center', alignItems: 'stretch', padding: 20 }}>
      <ThemedView>
        <Image source={logo} style={{ width: 100, height: 100, alignSelf: 'center' }} />
        <ThemedText style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>Welcome ! Register</ThemedText>
      </ThemedView>
      <TextInput
        placeholder="Email"
        placeholderTextColor={'gray'}
        value={email}
        onChangeText={setEmail}
        style={{ padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor={'gray'}
        value={username}
        onChangeText={setUsername}
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
          const user = { email, username, password };
          register(user);
        }}
        title="Register"
      />
      <Link href="/login">
        <ThemedText style={{ textAlign: 'center' }}>Already have an account ? <ThemedText style={{ textDecorationLine: 'underline', color: 'blue' }}>Login</ThemedText></ThemedText>
      </Link>
    </ThemedView>
  );
};

export default RegisterScreen;
