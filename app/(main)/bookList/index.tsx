import { Button, Pressable, RefreshControl, ScrollView, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuth } from '../../../contexts/AuthContext';
import { useCallback, useEffect, useState } from "react";
import { mongoObject } from '@/services/mongoObject';
import BookCard from '../../../components/BookCard';

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
        console.log("BookList is being rendered")
        mongoDB.getBooks().then(tempData => {
            setBookData(tempData)
            console.log(bookData)
        })
    }, [refreshing])

    const styles = StyleSheet.create({
        container: {
            padding: 20,
        },
        itemContainer: {
            marginBottom: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
        },
        text: {
            fontSize: 16,
        },
    });


    return (
        <>
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                width: '100%',
            }}>
            {bookData.map(item => (
                <Pressable key={item.id} onPress={() => router.push({ pathname: '/bookList/book_details', params: { id: item.id } })}>
                    <BookCard book={item}></BookCard>
                </Pressable>
            ))}
        </ScrollView>
        </>
    );

}