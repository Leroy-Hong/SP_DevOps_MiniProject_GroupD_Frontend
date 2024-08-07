import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Pressable } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Base64 } from 'crypto-es/lib/enc-base64'
import alert from '../../services/alert'
import { getUsers, createUser } from "@/services/mongoApi";
import { AES } from 'crypto-es/lib/aes'
import { router } from 'expo-router';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    const username64 = Base64.parse(username);
    const encryptPW = AES.encrypt(password, username, {iv: username64, salt: username64}).toString();

    // Retrieve current accounts (async) THEN
    // Check if account exists
    // If exists: return error. Else create new account & redirect to "success page"

    async function verifyAcc() {
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
            "borrowedBooks": {}
            })
        }
      });
    }

    verifyAcc().then(result => {
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
    <View style={{ flex: 1, justifyContent: 'center'}}>
      <Text style={styles.headerText}>Register</Text>
      <View style={{padding:61}}>
        <Text style={styles.subText}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.subText}>Admin number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your admin number"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.subText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable style={styles.signupBtn} onPress={handleSignup}>
          <Text style={styles.signinText}>Create account</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ECEBE4",
    borderColor: "#000000",
    shadowColor: 'black',
    shadowOpacity: 0.25,
    borderRadius: 3,

    shadowOffset: {
      width: 0,
      height: 5
    },
    
    height: 47,
    marginTop:10,
    marginBottom:19,
    borderWidth: 0,
    padding: 10,
    fontSize: 20
  },
  headerText: {
    alignSelf: 'center',
    color: "#243234",
    fontWeight: 'bold',
    fontSize: 40
  },
  subText: {
    fontSize: 20
  },
  signupBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#153B50",
    height: 56,
    marginTop: 32,
    borderRadius: 12,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 5
    },

    
  },
  signinText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default SignUp;
