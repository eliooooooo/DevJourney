import { useSession } from '../../context/ctx';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function Index() {
  const { signOut } = useSession();
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', height: '100%' }}>
      <ThemedText
        onPress={() => {
          signOut();
        }}>
        Sign Out
      </ThemedText>
    </ThemedView>
  );
}
