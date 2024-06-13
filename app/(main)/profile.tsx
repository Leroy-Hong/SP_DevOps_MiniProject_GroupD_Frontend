import { Button, Pressable, Text, View } from "react-native";
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
    const { logout } = useAuth();


    return (
        <View
            style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            <Button title="Log Out" onPress={logout}></Button>
        </View>
        );

}