import { createStackNavigator } from "@react-navigation/stack";
import { ThemedView } from "./ThemedView";
import { Image, Text } from "react-native";
  
const { Navigator } = createStackNavigator();
  
// This can be used like `<CustomStack />`
// export const CustomStack = withLayoutContext<StackNavigationOptions, typeof Navigator, any, any>(Navigator);

export const CustomStack = () => {
    return(
        <ThemedView
            style={{
                padding: 16,
                height: 100,
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}
        >
            <Image source={require('../assets/images/icon.png')} style={{ width: 60, height: 60 }} />
            <Text>Custom Stack</Text>
        </ThemedView>
    )
};
