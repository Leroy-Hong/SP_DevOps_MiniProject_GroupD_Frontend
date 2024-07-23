import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native'

export default function BookDetails() {
    const params = useLocalSearchParams();
    const { id = 0, other} = params

  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}
