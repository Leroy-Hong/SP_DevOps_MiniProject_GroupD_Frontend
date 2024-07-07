import { Button, Pressable, Text, View } from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
export default function bookDetails() {
    const params = useLocalSearchParams();
    const { id = 0, other } = params;
    return (
        <View
            style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            <Text>{id}</Text>
        </View>
        );

}