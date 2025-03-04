import { useSession } from '../../context/ctx';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Image, Touchable, TouchableOpacity, useColorScheme } from 'react-native';

export default function Index() {
  const { signOut } = useSession();
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme() ?? 'light';
  const { update } = useSession();
  console.log(session);

  const reset = () => {
    update({ _id: session._id, level: 1, streak: 0, bestStreak: session.bestStreak });
  };

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../../assets/images/user.png')} style={{ width: 200, height: 200 }} />
      <ThemedText style={{ fontSize: 22, fontWeight: 'bold', marginTop: 16 }}>{session.username}</ThemedText>
      <ThemedText style={{ fontSize: 16 }}>Level {session.level}</ThemedText>
      <ThemedText style={{ fontSize: 16 }}>Streak {session.streak}</ThemedText>
      <ThemedText style={{ fontSize: 16 }}>Best streak {session.bestStreak}</ThemedText>
      <TouchableOpacity onPress={() => reset()} style={{ marginTop: 16, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: 'red', borderRadius: 30 }}>
        <ThemedText style={{ color: colorScheme === 'light' ? 'white' : 'black', fontSize: 16 }}>
          Reset progression
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signOut()}>
        <ThemedText style={{ color: 'red', fontSize: 16 }}>
          Sign Out
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
