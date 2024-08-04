import { Stack, Tabs } from 'expo-router';
import React from 'react';

export default function BookListLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false, headerTitle: "All Books"}}/>
      <Stack.Screen name='book_details' options={{headerTitle:"Book Details"}}/>
    </Stack>
  );
}