import { Link, Redirect, Stack, useRouter, usePathname } from 'expo-router';
import { useSession } from '../../context/ctx';
import { Image, Text, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

const MainHeader = ({ session }) => (
  <ThemedView
    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 16, gap: 20 }}
  >
    <ThemedView
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../../assets/images/icon.png')}
        style={{ width: 60, height: 60 }}
      />
      <ThemedView>
        <ThemedText style={{ fontSize: 20, fontWeight: 'bold' }}>
          {session.username}
        </ThemedText>
        <ThemedText style={{ fontSize: 16 }}>
          Level {session.level}
        </ThemedText>
        <ThemedText style={{ fontSize: 16 }}>
          Current streak : {session.streak}
        </ThemedText>
      </ThemedView>
    </ThemedView>
    <Link href="/(app)/profil">
      <IconSymbol name="settings" color="black" size={25}></IconSymbol>
    </Link>
  </ThemedView>
);

const AlternateHeader = () => (
  <ThemedView
    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 16, gap: 20 }}
  >
    <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>
      Alternate Header
    </ThemedText>
  </ThemedView>
);

export default function AppLayout() {
  const { session, isLoading } = useSession();
  
  // Only require authentication within the (app) group's layout as users
  if (!session) {
    return <Redirect href="/login" />;
  }
  
  const path = usePathname();

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack
      screenOptions={() => ({
        header: () => (
          path === '/' ? <MainHeader session={session} /> : <AlternateHeader />
        ),
      })}
    />
  );
}
