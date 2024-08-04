import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Book } from '@/services/interfaces'

interface BookItemProps {
  book: Book
}

const BookCard: React.FC<BookItemProps> = ({ book }) => {

  useEffect(() => {
    // console.log(book.name)
    // console.log(book.name.length)
  }, [])


  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/Placeholder_Image.png')} />
      <View style={styles.textDetails}>

        <Text style={styles.title}>{book.name}</Text>
        <Text>By: {book.author}</Text>
        {book.dueDate ?
          <Text>Due: {book.dueDate}</Text> :
          <View />
        }

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    flexShrink: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    flexWrap: 'wrap'
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  textDetails: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "column"
  },
});

export default BookCard;
