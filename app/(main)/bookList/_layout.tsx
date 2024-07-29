import { Stack, Tabs } from 'expo-router';
import React from 'react';

export default function BookListLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false, headerTitle: "My Books"}}/>
      <Stack.Screen name='BookDetails' options={{headerTitle:"Book Details"}}/>
    </Stack>
  );
}