import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "react-native";

type Props = {
  check: boolean;
  number: number;
};

export function Level({
  check,
  number
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedView
      style={{
      height: 60,
      width: 60,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorScheme === 'dark' ? '#FFF' : '#000',
      opacity: check ? 1 : 0.5,
      borderRadius: 60
      }}
    >
      <ThemedText
      style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: colorScheme === 'dark' ? '#000' : '#FFF'
      }}
      >{number}</ThemedText>
    </ThemedView>
  );
}