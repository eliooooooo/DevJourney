import { useSession } from '../../context/ctx';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Widget from '@/components/WidgetModule';

export default function Index() {
  const { signOut } = useSession();
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText
        onPress={() => {
          signOut();
        }}>
        Sign Out
      </ThemedText>
      <Widget />
    </ThemedView>
  );
}
