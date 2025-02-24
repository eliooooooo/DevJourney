import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { Level } from "./Level";
import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";
import { Text } from "react-native";

export function LevelContainer() {

    const [levels, setLevels] = useState([]);

    useEffect(() => {
        fetch("https://devjourney.elioooooo.fr/levels")
            .then(res => res.json())
            .then(
                (result) => {
                    setLevels(result);
                    console.log("Levels fetched:", result);
                },
                (error) => {
                    console.error("Error fetching items:", error);
                }
            );
    }, []);
    
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
                <Text>{levels[i].check}</Text>
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
