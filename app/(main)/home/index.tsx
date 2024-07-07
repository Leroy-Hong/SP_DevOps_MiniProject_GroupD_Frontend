import { View, Text, Button, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import alert from '../../../services/alert'
import { useEffect, useState } from "react";
import { getBooks, getUsers } from "@/services/mongoApi";
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
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
    

    const [displayedData, setDisplayedData] = useState<Book[]>([]);
    var userData: Record<string, string> = {"1":"Balls"};
    var bookData: Book[] = [];
    useEffect(() => {
        async function getData() {
            await getUsers({"studentId":"P2302223"}).then(tempData => {
                userData = tempData[0].borrowedBooks;
                console.log(userData);
            })
            await getBooks().then(tempData => {
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
            <ScrollView contentContainerStyle={styles.container}>
            {displayedData.map(item => (
                <Pressable key={item._id} style={styles.itemContainer} onPress={() => router.navigate({pathname:'/home/bookDetails', params:{id:item.id}})}>
                <Text style={styles.text}>Name: {item.name}</Text>
                <Text style={styles.text}>Category: {item.category}</Text>
                {/* <Text style={styles.text}>ID: {item.id}</Text> */}
                <Text style={styles.text}>Library: {item.library}</Text>
                <Text style={styles.text}>Due: {item.dueDate}</Text>
                {/* <Text style={styles.text}>Status: {JSON.stringify(item.status)}</Text> */}
                </Pressable>
                
            ))}
            </ScrollView>
        </View>
        );

    
}