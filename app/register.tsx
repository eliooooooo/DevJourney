import React from 'react';
import { View, TextInput, Button, Image, useColorScheme, TouchableOpacity } from 'react-native';
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
  const inputText = colorScheme === 'dark' ? 'white' : 'black';

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
        style={{ padding: 10, borderColor: 'gray', borderWidth: 1, color: inputText }}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor={'gray'}
        value={username}
        onChangeText={setUsername}
        style={{ padding: 10, borderColor: 'gray', borderWidth: 1, color: inputText }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ padding: 10, borderColor: 'gray', borderWidth: 1, color: inputText }}
      />
      <TouchableOpacity onPress={() => { 
        const user = { email, username, password };
        register(user);
        }} 
        style={{ backgroundColor: '#5174F4', padding: 12, borderRadius: 30, width: '100%', display: 'flex' }} >
        <ThemedText style={{ color: 'white', fontSize: 16, textAlign: 'center' }} >Register</ThemedText>
      </TouchableOpacity>
      <Link href="/login">
        <ThemedText style={{ textAlign: 'center' }}>Already have an account ? <ThemedText style={{ textDecorationLine: 'underline', color: '#5174F4' }}>Login</ThemedText></ThemedText>
      </Link>
    </ThemedView>
  );
};

export default RegisterScreen;
