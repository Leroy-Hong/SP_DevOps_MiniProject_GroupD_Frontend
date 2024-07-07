import { Stack, Tabs } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false, headerTitle: "My Books"}}/>
      <Stack.Screen name='bookDetails' options={{headerTitle:"Book Details"}}/>
    </Stack>
  );
}