import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native'
import BookInformation from '@/components/BookInformation';

export default function book_details() {
    const params = useLocalSearchParams();
    const { id = "0", other} = params

  return (
    <BookInformation bookId={id.toString()}/>
  )
}
