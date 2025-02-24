import React from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // Logique de login
    if (email === 'user@example.com' && password === 'password') {
      router.push('/(tabs)/home');
    } else {
      Alert.alert('Erreur', 'Identifiants incorrects');
    }
  };

  return (
    <ThemedView>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => router.push('/register')} />
    </ThemedView>
  );
};

export default LoginScreen;
