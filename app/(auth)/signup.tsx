import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import alert from '../../services/alert'
import { getBooks, getUsers } from "@/services/mongoApi";
import { AES } from 'crypto-es/lib/aes'

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSignup = () => {
    const userData = { username, password };

    const encrypted = AES.encrypt("Message", "Secret Passphrase");
    const decrypted = AES.decrypt(encrypted, "Secret Passphrase");

    // Retrieve current accounts
    // Check if account exists
    // If exists: return error. Else create new account & redirect to "success page"




    async function verifyAccount() {
      await getUsers().then(users => {
        // const status = users.forEach((value:object, index: number, array: object[]) => {
        //   if (users[index].studentId == username) {
        //     console.log("THERE IS ERROR")
        //     return "Error"
        //   }
        // })
        
        if (users.some((user: any) => {
          return user.studentId == username
          // Return true if there is already a username
        })) {

        }

        
      });
    }

    verifyAccount().then(status => {
      console.log(status)
    });



  
    // if (userData.username) {
    //   login(userData)}
    // else {
    //   alert('Error','Username cannot be empty', [
    //     {text: 'OK', onPress: () => console.log('Login dismissed')}
    //   ]);
    // } 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register</Text>
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
