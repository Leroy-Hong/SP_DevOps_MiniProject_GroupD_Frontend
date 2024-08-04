import { View, Text, RefreshControl, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useCallback, useEffect, useState } from "react";
import { MongoObject2 } from '@/services/mongoObject2';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import BookCard from '../../../components/BookCard';
import { Book } from '@/services/interfaces'
export default function Home() {
    // var data: { _id: string, category: string, id: string, library: string, name: string, status: {}}[] = []
    
    const { user } = useAuth();
    const [displayedData, setDisplayedData] = useState<Book[]>([]);
    const bookDB = new MongoObject2("books2")
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    var userData: Record<string, string> = {"":""};
    var bookData: Book[] = [];


    useEffect(() => {
        console.log("Home is being rendered")
        async function getData() {
            // From booksDB, identify the books that are reserved by user or owned
            return await bookDB.getItems({
                "$or": [
                  { "status.reserved": user?.username },
                  { "status.owner": user?.username }
                ]
              }
              ).then(reservedBooks => {
                console.log(reservedBooks)
                return reservedBooks
            })
        };
        
        getData().then((books) => {
            setDisplayedData(books)
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
        <Text>Logged in as {user?.username}</Text>
        {displayedData.length > 0 ? 
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {displayedData.map(item => (
                <Pressable key={item._id} onPress={() => router.push({pathname:'/home/book_details', params:{id: item.id}})}>
                    <BookCard book={item}></BookCard>
                </Pressable>
            ))}
            </ScrollView> 
        : <Text>You have no books</Text>}
        
        </>
        );

    
}