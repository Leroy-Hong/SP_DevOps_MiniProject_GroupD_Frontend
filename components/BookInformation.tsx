import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { MongoObject2 } from '@/services/mongoObject2';
import { useAuth } from '@/contexts/AuthContext';
import alert from '@/services/alert';
import { Book } from '@/services/interfaces';
import { BOOK_COVERS } from '@/services/bookcovers';


interface Prop {
  bookId: string;
}

const userDB = new MongoObject2("users")
const bookDB = new MongoObject2("books2")

const BookInformation: React.FC<Prop> = ({ bookId }) => {
  const [bookData, setBookData] = useState<Book>()
  const [rerender, setRerender] = useState(0)
  const { user } = useAuth()
  async function cancelReservation() {
    try {
      await bookDB.unsetItem({"id":bookId}, "status.reserved")
    } catch (error) {
      return false
    }
    setRerender(rerender+1)
    return true
  }

  function addDaysToDate(dateString: string, daysToAdd: number): string {
    // Split the date string into components
    const [day, month, year] = dateString.split('/').map(Number);

    // Adjust the year to a 4-digit format
    const fullYear = 2000 + year; // Assuming the year is in the 21st century

    // Create a new Date object
    const date = new Date(fullYear, month - 1, day);

    // Add the specified number of days
    date.setDate(date.getDate() + daysToAdd);

    // Format the date back to DD/MM/YY
    const newDay = date.getDate().toString().padStart(2, '0');
    const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const newYear = (date.getFullYear() % 100).toString().padStart(2, '0');

    return `${newDay}/${newMonth}/${newYear}`;
  }

  async function extendLoan() {
    // Set the selected book status.loanExtended to be the user's id
    const newDue = addDaysToDate(bookData?.dueDate!,7)
    if (!bookData?.status.loanExtended) {
      try {
        await bookDB.setItem({"id":bookId}, {"status.loanExtended":user?.username})
        await userDB.setItem({"studentId":user?.username}, {[`borrowedBooks.${bookId}`]:newDue})
      } catch (error) {
        return false
      }
      alert('Success!','Book loan has been extended by 7 days', [
        {text: 'OK', onPress: () => console.log('Alert dismissed')}
      ]);
      setRerender(rerender+1)
    } else {
      alert('Error!','Book loan has already been extended', [
        {text: 'OK', onPress: () => console.log('Alert dismissed')}
      ]);
    }
  }

  async function reserveBook() {
    // Set the selected book to be reserved & unavailable in booksdb
    async function sendRequests() {
      try {
        await bookDB.setItem({"id":bookId}, {"status.reserved":user?.username})
      } catch (error) {
        return false
      }
      setRerender(rerender+1)
      return true
    }

    sendRequests().then((status) => {
      if (status) {
        alert('Success!','Book has been reserved', [
          {text: 'OK', onPress: () => console.log('Alert dismissed')}
        ]);
      } else {
        alert('Error!','Something went wrong in reserving', [
          {text: 'OK', onPress: () => console.log('Alert dismissed')}
        ]);
      }
    })
  }
  
  useEffect(() => {
    console.log("BookInfo is being rendered", {rerender})
    userDB.getItems({"studentId":user?.username}).then(userData => {
      // Get dueDate based on the logged in person's bookId
      
      var dueDate = userData[0]['borrowedBooks'][bookId] ?? ""

      bookDB.getItems({"id":bookId}).then(tempBookData => {
        const book = tempBookData[0]
        book["dueDate"] = dueDate
        setBookData(book)
      }).catch(error => {console.log('catch block in booksDB function'); console.log(error)});
    }).catch(error => {console.log('catch block in userDB function'); console.log(error)});
  }, [rerender])


  return (
    <View style={styles.main}>
      <Text 
      adjustsFontSizeToFit={true}
      numberOfLines={2}
      style={styles.title}>
        {bookData?.name}
      </Text>
      
      <View style={styles.details}>
        <Image style={styles.bookImage} source={BOOK_COVERS[+bookId]} />
        <View style={styles.txtDetailsView}>
          <Text style={styles.author}>{bookData?.author}</Text>
          <Text>{bookData?.library}</Text>
          {bookData?.dueDate ? <Text>Due {bookData?.dueDate}</Text> : <></>}
          {(bookData?.status.reserved == user?.username) ? <Text>Reserved by you</Text> : <></>}
          <ScrollView style={{marginTop:10}}bounces={false} persistentScrollbar={true}>
            <Text style={styles.bookDesc}>{bookData?.desc}</Text>
          </ScrollView>
        </View>
      </View>

      <View style={{flexGrow:1,flexDirection:'column'}}>
        {(bookData?.status.owner || (bookData?.status.reserved ?? user?.username) != user?.username) ? 
          <Pressable style={[styles.button1, styles.unavailableBtnColour]}>
            <Text style={styles.button1txt}>Unavailable For Reservation</Text>
          </Pressable>
        : (bookData?.status.reserved == user?.username) ?
          <Pressable style={({ pressed }) => [{backgroundColor: pressed? 'maroon' : "red"},styles.button1]}
          onPress={cancelReservation}>
            <Text style={styles.button1txt}>Cancel Reservation?</Text>
          </Pressable>
        :
        <Pressable style={({ pressed }) => [{backgroundColor: pressed? '#243234' : "#153B50"},styles.button1]}
        onPress={reserveBook}>
          <Text style={styles.button1txt}>Reserve Book</Text>
        </Pressable>
        }

        {(bookData?.status.owner == user?.username) ? 
          <Pressable style={({ pressed }) => [{backgroundColor: pressed? '#243234' : "#153B50"},styles.button1]} onPress={extendLoan}>
            <Text style={styles.button1txt}>Extend Loan</Text>
          </Pressable>
        :
          <></>
        }
        
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
    // height: "10%",
    marginBottom: 10,
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
    flexDirection: "row",
    alignSelf: 'baseline'
  },
  txtDetailsView: {
    flexShrink: 1,
    paddingLeft: 10,
    height: "70%"
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
  },
  bookImage: {
    width: 181,
    height: 252,
    resizeMode: 'contain'
  },
  bookDesc: {
    flexShrink: 1,
    flexWrap: 'wrap'
  }
});

export default BookInformation;
