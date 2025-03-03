import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export function Level({ current, number, colorScheme, check, id }) {
  const content = [
    <ThemedView
      style={{
        height: 60,
        width: 60,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: current
          ? colorScheme === 'dark'
            ? '#FFD700'
            : '#FFA500'
          : colorScheme === 'dark'
          ? '#FFF'
          : '#000',
        opacity: check ? 1 : 0.5,
        borderRadius: 60,
        marginLeft: Math.floor(Math.random() * 121) - 60,
        transform: [{ scale: current ? 1.2 : 1 }],
      }}
    >
      <ThemedText
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: colorScheme === 'dark' ? '#000' : '#FFF',
        }}
      >
        {number}
      </ThemedText>
    </ThemedView>
  ];

  return current ? (
    <Link href={`/(app)/level/${id}`}>
      {content}
    </Link>
  ) : (
    <ThemedView >{content}</ThemedView>
  );
};