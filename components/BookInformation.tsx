import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { MongoObject2 } from '@/services/mongoObject2';
import { useAuth } from '@/contexts/AuthContext';


interface Prop {
  bookId: string;
}

interface bookStatus {
  unavailable: boolean;
  reserved: string;
}

interface Book {
  _id: string;
  category: string;
  id: string;
  library: string;
  name: string;
  status: bookStatus;
  dueDate: string;
}

const userDB = new MongoObject2("users")
const bookDB = new MongoObject2("books")

const BookInformation: React.FC<Prop> = ({ bookId }) => {
  const [bookData, setBookData] = useState<Book>()
  const { user } = useAuth()

  async function reserveBook() {
    // Set the selected book to be reserved & unavailable in booksdb
    bookDB.setItem({"id":bookId}, {"status.reserved":"P2302223"})
    bookDB.setItem({"id":bookId}, {"status.unavailable":true})
  }
  
  useEffect(() => {
    userDB.getItems({"studentId":"P2302223"}).then(userData => {
      // Get dueDate based on the logged in person's bookId
      const dueDate = userData[0]['borrowedBooks'][bookId]

      bookDB.getItems({"id":bookId}).then(tempBookData => {
        const book = tempBookData[0]
        book["dueDate"] = dueDate
        setBookData(book)
      })
    })
  }, [])


  return (
    <View style={styles.main}>
      <Text style={styles.title}
      adjustsFontSizeToFit={true}
      numberOfLines={1}>
        {bookData?.name}
      </Text>
      <View style={styles.details}>
        <Image source={require('@/assets/images/Placeholder_Image.png')} />
        <View style={styles.textDetails}>
          <Text>{bookData?.category}</Text>
          <Text>{bookData?.library}</Text>
          <Text>Due {bookData?.dueDate}</Text>
        </View>
      </View>

      <View style={{flexDirection:'column'}}>
        {(bookData?.status.unavailable) ? 
        <Pressable style={[styles.button1, styles.unavailableBtnColour]}>
          <Text style={styles.button1txt}>Unavailable For Reservation</Text>
        </Pressable>
        :
        <Pressable style={({ pressed }) => [{backgroundColor: pressed? '#243234' : "#153B50"},styles.button1]} onPress={reserveBook}>
          <Text style={styles.button1txt}>Reserve Book</Text>
        </Pressable>}


        <Pressable style={({ pressed }) => [{backgroundColor: pressed? '#243234' : "#153B50"},styles.button1]}>
          <Text style={styles.button1txt}>Extend Loan</Text>
        </Pressable>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  title: {
    marginBottom: 10,
    flexShrink: 1,
    fontSize: 999,
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  details: {
    flexShrink: 1,
    flexDirection: "row"
  },
  textDetails: {

  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "#153B50",
    height: 56,
    marginTop: 32,
    borderRadius: 12,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 5
    },
  },
  button1txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  unavailableBtnColour: {
    backgroundColor: 'gray'
  }
});

export default BookInformation;
