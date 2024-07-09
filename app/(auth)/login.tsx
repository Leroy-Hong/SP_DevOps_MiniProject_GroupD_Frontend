import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Pressable } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Link, router } from 'expo-router';
import { AES } from 'crypto-es/lib/aes'
import { Base64 } from 'crypto-es/lib/enc-base64'
import alert from '../../services/alert'
import { getUsers } from "@/services/mongoApi";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    const username64 = Base64.parse(username);
    const encryptPW = AES.encrypt(password, username, {iv: username64, salt: username64}).toString();

    async function verifyAcc() {
      return getUsers().then(users => {
        if (users.some((user: any) => { console.log(user.studentId, user.password, encryptPW); return (user.studentId == username && user.password == encryptPW) })) {
          // Enters here if there is matching name
          console.log("Found user");
          return true
        } else {
          return false
        }
      });
    }

    const userData = { username };

    // Guard empty username
    if (!userData.username) {
      alert('Error','Username cannot be empty', [
        {text: 'OK', onPress: () => console.log('Login dismissed')}
      ]);

      return
    }

    verifyAcc().then(result => {
      if (result) {
        login(userData)
      } else {
        // Error
        alert('Error','Username & password does not match', [
          {text: 'OK', onPress: () => console.log('Alert dismissed')}
        ]);
      }
    });  
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      <Text style={styles.headerText}>Sign in</Text>
      <View style={{padding:61}}>
        <Text style={styles.subText}>Username</Text>
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
        <Pressable style={styles.signinButton} onPress={handleLogin}>
          <Text style={styles.signinText}>Sign In</Text>
        </Pressable>
        <Button title="Don't have an account?" color={"#153B50"} onPress={ () => router.navigate("/signup")} />
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
  signinButton: {
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

export default Login;
