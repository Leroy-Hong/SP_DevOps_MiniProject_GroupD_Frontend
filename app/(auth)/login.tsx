import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
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
      <View style={{flexDirection: 'row'}}>
      <Button title="Log In" onPress={handleLogin} />
      <Button title="Sign up" onPress={ () => router.navigate("/signup")} />
      {/* <Link replace href={"/signup"}>Sign up</Link> */}
      </View>
      
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

export default Login;
