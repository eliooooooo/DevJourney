import { Link, Redirect, Stack, useRouter, usePathname } from 'expo-router';
import { useSession } from '../../context/ctx';
import { Image, Text, useColorScheme, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useEffect, useState } from 'react';

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

const LevelHeader = ({ level }) => (
  <ThemedView style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 16, gap: 20 }}>
    <ThemedView
      style={{ display: 'flex', flexDirection: 'row', gap: 20 }}
    >
      <ThemedView
        style={{ height: 60, width: 60, padding: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFD700', borderRadius: 60}}>
        <ThemedText
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000',
          }}
        >
          {level.number}
        </ThemedText>
      </ThemedView>
      <ThemedView style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>
          Level {level.number}
        </ThemedText>
        <ThemedText style={{ fontSize: 16 }}>
          {level.difficulty}
        </ThemedText>
      </ThemedView>
    </ThemedView>
    <Link href="/">
      <IconSymbol name="close" color="black" size={25}></IconSymbol>
    </Link>
  </ThemedView>
);

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme() ?? 'light';
  
  // Only require authentication within the (app) group's layout as users
  if (!session) {
    return <Redirect href="/login" />;
  }
  
  const path = usePathname();
  const levelIdMatch = path.match(/\/level\/([a-f0-9]+)/i);
  const levelId = levelIdMatch ? levelIdMatch[1] : null;

  const [level, setLevel] = useState(null);

  useEffect(() => {
      fetch(`https://devjourney.elioooooo.fr/levels/${levelId}`)
          .then(res => res.json())
          .then(
              (result) => {
                  setLevel(result);
                  console.log("Stack level fetched");
              },
              (error) => {
                  console.error("Error fetching level:", error);
              }
          );
  }, [levelId]);

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack
      screenOptions={() => ({
        header: () => {
          if (path === '/') {
            return <MainHeader session={session} />;
          } else if (path.startsWith('/level/')) {
            return <LevelHeader level={level} />;
          } else {
            return <AlternateHeader />;
          }
        },
      })}
    />
  );
}
