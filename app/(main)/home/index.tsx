import { View, Text, Button, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import alert from '../../../services/alert'
import { useEffect, useState } from "react";
// import { getBooks, getUsers } from "@/services/mongoApi";
import { mongoObject } from '@/services/mongoObject';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import BookCard from '../../../components/BookCard';
export default function Home() {
    // var data: { _id: string, category: string, id: string, library: string, name: string, status: {}}[] = []
    interface Book {
        _id: string;
        category: string;
        id: string;
        library: string;
        name: string;
        status: {};
        dueDate: string;
    }
    
    const { user } = useAuth();
    const [displayedData, setDisplayedData] = useState<Book[]>([]);
    const mongoDB = new mongoObject(String(process.env.EXPO_PUBLIC_API_KEY))
    var userData: Record<string, string> = {"":""};
    var bookData: Book[] = [];
    useEffect(() => {
        async function getData() {
            await mongoDB.getUsers({"studentId":"P2302223"}).then(tempData => {
                userData = tempData[0].borrowedBooks;
                console.log(userData);
            })
            await mongoDB.getBooks().then(tempData => {
                bookData = tempData;
                console.log(bookData);
            })
        };
        
        getData().then(() => {
            const filteredBooks = bookData.filter(book => userData[book.id]);
            const filteredData = filteredBooks.map(book => ({
                ...book,
                dueDate: userData[book.id]
              }));
            
              console.log(filteredData)
            setDisplayedData(filteredData)
            // console.log("IDK WHATSO", (userData[bookData[2].id]))
        })
        
    }, [])

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
        <View
            style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            <Text>My Books</Text>
            <ScrollView>
            {displayedData.map(item => (
                <Pressable key={item._id} onPress={() => router.navigate({pathname:'/home/BookDetails', params:{id: item.id}})}>
                    <BookCard book={item}></BookCard>
                </Pressable>
            ))}
            </ScrollView>
        </View>
        );

    
}