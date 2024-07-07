import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Link, router } from 'expo-router';
import alert from '../../services/alert'

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    const userData = { username };
    if (userData.username) {
      login(userData)}
    else {
      alert('Error','Username cannot be empty', [
        {text: 'OK', onPress: () => console.log('Login dismissed')}
      ]);
    } 
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
