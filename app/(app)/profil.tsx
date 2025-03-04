import React, { useRef } from 'react';
import { useSession } from '../../context/ctx';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Image, Share, TouchableOpacity, useColorScheme } from 'react-native';
import ViewShot from 'react-native-view-shot';

export default function Index() {
  const { signOut, session, isLoading, update } = useSession();
  const colorScheme = useColorScheme() ?? 'light';
  const viewShotRef = useRef(null);

  const reset = () => {
    update({ _id: session._id, level: 1, streak: 0, bestStreak: session.bestStreak });
  };

  const shareProgress = async () => {
    try {
      // Capture la vue contenant l'image et le texte
      const uri = await viewShotRef.current.capture();

      // Partage l'image capturée
      await Share.share({
        message: `Check out my progress on DevJourney! I've reached level ${session.level} with a streak of ${session.streak} correct answers! 🚀`,
        url: uri,
      });
    } catch (error) {
      console.error('Error sharing progress:', error.message);
    }
  };

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
        <ThemedView style={{ alignItems: 'center', backgroundColor: colorScheme === 'light' ? '#E1E1E1' : '#EAEAEA', padding: 20, borderRadius: 16 }}>
          <Image source={require('../../assets/images/user.png')} style={{ width: 200, height: 200, borderRadius: 200, backgroundColor: colorScheme === 'light' ? '#EAEAEA' : '#E1E1E1' }} />
          <ThemedText style={{ fontSize: 22, fontWeight: 'bold', marginTop: 16 }}>{session.username}</ThemedText>
          <ThemedText style={{ fontSize: 16 }}>Level {session.level}</ThemedText>
          <ThemedText style={{ fontSize: 16 }}>Streak {session.streak}</ThemedText>
          <ThemedText style={{ fontSize: 16 }}>Best streak {session.bestStreak}</ThemedText>
        </ThemedView>
        <TouchableOpacity onPress={shareProgress} style={{ marginTop: 16, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#5174F4', borderRadius: 30 }}>
          <ThemedText style={{ color: colorScheme === 'light' ? 'white' : 'black', fontSize: 16, textAlign: 'center' }}>
            Share progression
          </ThemedText>
        </TouchableOpacity>
      </ViewShot>
      <ThemedView style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
        <TouchableOpacity onPress={reset} style={{ marginTop: 16, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#EF5757', borderRadius: 30 }}>
          <ThemedText style={{ color: colorScheme === 'light' ? 'white' : 'black', fontSize: 16 }}>
            Reset progression
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOut} style={{ marginTop: 16 }}>
          <ThemedText style={{ color: '#EF5757', fontSize: 16 }}>
            Sign Out
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}
