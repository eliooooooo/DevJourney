import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_HEIGHT = 100;

type Props = PropsWithChildren<{
}>;

export default function ParallaxScrollView({
  children,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        <Animated.View
          style={[styles.header, headerAnimatedStyle]}
          pointerEvents="none">
          <ThemedView
            style={{
              backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
              justifyContent: 'start',
              padding: 16,
              alignItems: 'center',
              flexDirection: 'row',
              gap: 16,
              height: HEADER_HEIGHT,
            }}>
              <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' }} style={{ width: 60, height: 60 }} />
              <View>
                <Text style={{ fontSize: 24, color: colorScheme === 'dark' ? 'black' : 'white' }}>Username</Text>
                <Text style={{ fontSize: 16, color: colorScheme === 'dark' ? 'black' : 'white' }}>points</Text>
              </View>
          </ThemedView>
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
