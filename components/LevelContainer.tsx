import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { Level } from "./Level";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { useSession } from "@/context/ctx";

export function LevelContainer() {
    const { session, isLoading } = useSession();
    const currentLevel = session.level;

    const [levels, setLevels] = useState([]);

    useEffect(() => {
        fetch("https://devjourney.elioooooo.fr/levels")
            .then(res => res.json())
            .then(
                (result) => {
                    setLevels(result);
                    console.log("Levels fetched");
                },
                (error) => {
                    console.error("Error fetching items:", error);
                }
            );
    }, []);
    
    let levelsRender = [];
    for (let i = levels.length - 1; i >= 0; i--) {
        levelsRender.push(
            <ThemedView key={levels[i].number} 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 12
                }}>
                <Level
                    check={i < currentLevel - 1}
                    current={i === currentLevel - 1}
                    number={levels[i].number}
                    key={levels[i].number}
                    id={levels[i]._id}
                ></Level>
            </ThemedView>
        );
    }


  return (
    <ScrollView style={{ width: "100%" }} >
        {levelsRender}
    </ScrollView>
  );
}
