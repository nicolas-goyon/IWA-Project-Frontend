import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@env';
import { useDispatch } from 'react-redux';  
import { login } from '../redux/authSlice'; 
import Colors from '../Enums/Colors';
import { AppLogo } from '../Enums/Images';



const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState(''); 

  const dispatch = useDispatch();

  const handleLogin = async () => {
    let isValid = true;

    setEmailError('');
    setPasswordError('');
    setServerError(''); 

    if (!email) {
      setEmailError('Adresse mail est obligatoire');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Moot de passe est obligatoire');
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        dispatch(login(response.data)); 
        // navigation.navigate('Home');
      }
    } catch (error) {
        const errorMessage = 'Vérifiez vos identifiants de connexion';
        setServerError(errorMessage); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={AppLogo} style={styles.logo} />
      </View>

      <Text style={styles.title}>Connexion</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Adresse mail"
        style={[styles.input, emailError ? styles.errorInput : null]}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Mot de passe"
        secureTextEntry={true}
        style={[styles.input, passwordError ? styles.errorInput : null]}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {serverError ? <Text style={styles.serverErrorText}>{serverError}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signupLink}>
          Vous n'avez pas encore de compte ? <Text style={styles.signupText}>S’inscrire</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: -100,
    width: '70%',
    height: '20%',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.NavyBlue,
    width: '100%',
    textAlign: 'left',
  },
  input: {
    backgroundColor: Colors.LightBlue,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  errorInput: {
    borderColor: Colors.Red,
    borderWidth: 1,
  },
  errorText: {
    color: Colors.Red,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  serverErrorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: '2%',
    width: '100%',
  },
  signupLink: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.Gray,
    marginBottom: 20,
    width: '100%',
    textAlign: 'left',
  },
  signupText: {
    color: Colors.Blue,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: Colors.Orange,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: '70%',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: Colors.White,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Login;
