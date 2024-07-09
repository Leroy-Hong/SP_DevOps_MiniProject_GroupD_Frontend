import { Slot, Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{headerShown: false}}/>
      <Stack.Screen name="signup" options={{headerTitle: "Sign Up", presentation: "modal"}} />
    </Stack>


  )
}