import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import alert from '../../services/alert'
import { getBooks, getUsers, createUser } from "@/services/mongoApi";
import { AES } from 'crypto-es/lib/aes'
import { router } from 'expo-router';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSignup = () => {
    const encryptPW = AES.encrypt(password, username).toString();
    // const decrypted = AES.decrypt(encrypted, "Secret Passphrase");

    // Retrieve current accounts (async) THEN
    // Check if account exists
    // If exists: return error. Else create new account & redirect to "success page"




    async function verifyAccount() {
      return getUsers().then(users => {
        // const status = users.forEach((value:object, index: number, array: object[]) => {
        //   if (users[index].studentId == username) {
        //     console.log("THERE IS ERROR")
        //     return "Error"
        //   }
        // })
        
        if (users.some((user: any) => { return user.studentId == username })) {
          // Enters here if there is matching name
          console.log("Repeated user");
          return false


        } else {
          // Create new user
          return createUser({
            "studentId": username,
            "password": encryptPW,
            "name": name,
            "loan": 0,
            "borrowedBooks": []
            })
        }
      });
    }

    verifyAccount().then(result => {
      if (!result) {
        console.log("User already exists")
        alert('Error','User already exists', [
          {text: 'OK', onPress: () => console.log('Alert dismissed')}
        ]);
      } else {
        console.log("User created")
        alert('Success!','User has been created', [
          {text: 'Go back to login', onPress: () => {
            console.log('Alert dismissed')
            router.navigate("/login")
          }}
        ]);
      }
    });

  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="black"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="black"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="black"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SignUp;
