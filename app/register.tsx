import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';

const RegisterScreen = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegister = () => {
    // Logique d'enregistrement
    router.push('/login');
  };

  return (
    <ThemedView>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Register" onPress={handleRegister} />
    </ThemedView>
  );
};

export default RegisterScreen;
