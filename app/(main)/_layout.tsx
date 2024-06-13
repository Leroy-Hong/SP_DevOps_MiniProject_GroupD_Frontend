import { Stack, Tabs } from 'expo-router';
import React from 'react';

export default function MainLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ headerTitle:'home' }}/>
      <Tabs.Screen name="profile" options={{ headerTitle:'profile' }}/>
    </Tabs>
  );
}