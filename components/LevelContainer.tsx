import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { Level } from "./Level";

let levels = [
    {
        check: false,
        number: 3
    },
    {
        check: true,
        number: 2
    },
    {
        check: true,
        number: 1
    }
    ];

export function LevelContainer() {
    let levelsRender = [];

    for (let i = 0; i < levels.length; i++) {
        levelsRender.push(
            <ThemedView key={i} style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 16
                }}>
                <Level
                    check={levels[i].check}
                    number={levels[i].number}
                ></Level>
            </ThemedView>
        );
    }

  return (
    <ThemedView
    >
        {levelsRender}
    </ThemedView>
  );
}