import { Link, Redirect, Stack, useRouter, usePathname } from 'expo-router';
import { useSession } from '../../context/ctx';
import { Image, Text, useColorScheme, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useEffect, useState } from 'react';

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme() ?? 'light';
  const logo = colorScheme === 'dark' ? require('../../assets/images/icon-light.png') : require('../../assets/images/icon.png');
  const path = usePathname();
  const levelIdMatch = path.match(/\/level\/([a-f0-9]+)/i);
  const levelId = levelIdMatch ? levelIdMatch[1] : null;
  const [level, setLevel] = useState(null);

  useEffect(() => {
    if (levelId) {
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
    }
  }, [levelId]);

  if (!session) {
    return <Redirect href="/login" />;
  }

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
          source={logo}
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
        <IconSymbol name="settings" color={ colorScheme === "light" ? "black" : "white"} size={25}></IconSymbol>
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

  const LevelHeader = ({ level }) => {
    if (!level) {
      return null;
    }

    return (
      <ThemedView style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 16, gap: 20 }}>
        <ThemedView
          style={{ display: 'flex', flexDirection: 'row', gap: 20 }}
        >
          <ThemedView
            style={{ height: 60, width: 60, padding: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5174F4', borderRadius: 60 }}>
            <ThemedText
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              {level.number}
            </ThemedText>
          </ThemedView>
          <ThemedView style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>
              Level {level.number} ({level.category})
            </ThemedText>
            <ThemedView style={{ fontSize: 16, display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
              <ThemedView style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: level.difficulty === 'easy' ? "rgba(0, 255, 21, 0.2)" : level.difficulty === 'medium' ? "rgba(255, 246, 0, 0.2)" : "rgba(255, 0, 0, 0.2)", padding: 5, borderRadius: 5 }}>
                {Array.from({ length: level.difficulty === 'easy' ? 1 : level.difficulty === 'medium' ? 2 : level.difficulty === 'hard' ? 3 : 0 }).map((_, index) => (
                  <IconSymbol key={index} name="star" color={ colorScheme === "light" ? "black" : "white"} size={16} />
                ))}
                {Array.from({ length: level.difficulty === 'easy' ? 2 : level.difficulty === 'medium' ? 1 : level.difficulty === 'hard' ? 0 : 0 }).map((_, index) => (
                  <IconSymbol key={index} name="star.border" color={ colorScheme === "light" ? "black" : "white"} size={16} />
                ))}
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <Link href="/">
          <IconSymbol name="close" color={ colorScheme === "light" ? "black" : "white"} size={25}></IconSymbol>
        </Link>
      </ThemedView>
    );
  };

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