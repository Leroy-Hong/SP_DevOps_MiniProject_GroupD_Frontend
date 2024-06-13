import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const { isLoggedIn } = useAuth();


  
  
  if (!isLoggedIn) {
    console.log("I am redirecting")
    return <Redirect href={'/login'}/>
  }
  
  return <Redirect href={'/home'}/>
}
