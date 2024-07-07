import { Ionicons } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';
import React from 'react';

export default function MainLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ 
        headerTitle:'Home',
        tabBarLabel:'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
        }}/>
      <Tabs.Screen name="profile" options={{
        headerTitle:'Profile',
        tabBarLabel:'Profile',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        ),
        }}/>
        
    </Tabs>
  );
}