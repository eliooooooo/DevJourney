import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type Props = {
  check: boolean;
  number: number;
};

export function Level({
  check,
  number
}: Props) {

  return (
    <ThemedView
      style={{
        height: 60,
        width: 60,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: check === true ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.5)',
        borderRadius: 60
      }}
    >
      <ThemedText
        style={{
          fontSize: 20,
          fontWeight: 'bold'
        }}
      >{number}</ThemedText>
    </ThemedView>
  );
}