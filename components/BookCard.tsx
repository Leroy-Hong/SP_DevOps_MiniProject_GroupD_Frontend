import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface BookItemProps {
   book : {
    _id: string;
    category: string;
    id: string;
    library: string;
    name: string;
    status: {};
    dueDate: string;
  }
}

const BookDetails: React.FC<BookItemProps> = ({ book }) => {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/Placeholder_Image.png')}/>
      <View>
        <Text style={styles.title}>{book.name}</Text>
        <Text>by {book.category}</Text>
        <Text>{book.dueDate}</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    flexShrink: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  textDetails: {
    flexDirection:"column"
  },
});

export default BookDetails;
