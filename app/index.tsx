import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const { isLoggedIn } = useAuth();


  
  
  if (!isLoggedIn) {
    console.log("Redirecting to Login")
    return <Redirect href={'/login'}/>
  }
  console.log("Redirecting to Home")
  return <Redirect href={'/home'}/>
}
