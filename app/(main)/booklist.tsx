import { Button, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useAuth } from '../../contexts/AuthContext';
import { useCallback, useEffect, useState } from "react";
import { mongoObject } from '@/services/mongoObject';
import BookDetails from '../../components/BookCard';

export default function BookList() {
    const { logout, user } = useAuth();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

    const mongoDB = new mongoObject(String(process.env.EXPO_PUBLIC_API_KEY))

    interface Book {
        _id: string;
        category: string;
        id: string;
        library: string;
        name: string;
        status: {};
        dueDate: string;
    }
    const [bookData, setBookData] = useState<Book[]>([]);


    useEffect(() => {
        mongoDB.getBooks().then(tempData => {
            setBookData(tempData)
            console.log(bookData)
        })
    }, [])

    return (
        <View
            style={{
            position: "absolute",
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            <Text>Book List</Text>
            <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            width: '100%',
            }}>
                {bookData.map((item,i) => (
                    <Pressable key={item._id} onPress={() => router.navigate({pathname:'/home/BookDetails', params:{id:item.id}})}>
                        <BookDetails book={item}></BookDetails>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
        );

}