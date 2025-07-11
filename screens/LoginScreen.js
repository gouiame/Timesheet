// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import api from '../services/api';
// import { aesEncrypt } from '../utils/crypto';
// import JWTHelper from 'jwthelper';


// export default function LoginScreen({ navigation }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');


// const handleLogin = async () => {
//   if (!username || !password) {
//     Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
//     return;
//   }

//   try {
//     const encryptedPassword = aesEncrypt(password);

//     const response = await api.post('/login', {
//       login: username,
//       password: encryptedPassword,
//     });

//     const token = response.data;

//     const helper = JWTHelper.createJWTHelper();
//     const userInfo = helper.decode(token);

//     console.log('Utilisateur connecté :', userInfo);

//     Alert.alert('Succès', `Bienvenue ${userInfo.firstName} ${userInfo.lastName}`);
//     navigation.navigate('Dashboard');
    
//   } catch (error) {
//     console.error('Erreur backend:', error.response?.data || error.message);
//     Alert.alert('Erreur', 'Connexion échouée.');
//   }
// };


//   // const handleLogin = async () => {
//   //   if (!username || !password) {
//   //     Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
//   //     return;
//   //   }

//   //   try {
//   //     const encryptedPassword = aesEncrypt(password);

//   //     const response = await api.post('/login', {
//   //       login: username,
//   //       password: encryptedPassword,
//   //     });
//   //     console.log('Mot de passe chiffré :', encryptedPassword);

//   //     const token = response.data?.token;

//   //     if (token) {
//   //       Alert.alert('Succès', 'Connexion réussie');
//   //       navigation.navigate('Dashboard');
//   //     } else {
//   //       Alert.alert('Erreur', 'Identifiants incorrects');
//   //     }

//   //   } catch (error) {
//   //     console.error(error);
//   //     Alert.alert('Erreur', 'Échec de connexion au serveur');
//   //   }
//   // };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../assets/Logo_muis.png')} style={styles.logo} />
//       <Text style={styles.title}>Bienvenue, connectez-vous</Text>

//       <View style={styles.inputContainer}>
//         <Ionicons name="person" size={20} color="#005BAA" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Identifiant"
//           placeholderTextColor="#888"
//           value={username}
//           onChangeText={setUsername}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Ionicons name="lock-closed" size={20} color="#005BAA" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Mot de passe"
//           placeholderTextColor="#888"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Se connecter</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f6fc',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   logo: {
//     width: 200,
//     height: 80,
//     resizeMode: 'contain',
//     marginBottom: 30,
//     marginTop: -60,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 25,
//     color: '#8E2566',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#005BAA',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     marginBottom: 15,
//     width: '100%',
//   },
//   icon: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     fontSize: 16,
//   },
//   button: {
//     width: '100%',
//     backgroundColor: '#005BAA',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });































import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../services/api';
import { aesEncrypt, aesDecrypt } from '../utils/crypto';
// import JWTHelper from 'jwthelper';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      const encryptedPassword = aesEncrypt(password);

      const response = await api.post('/login', {
        login: username,
        password: encryptedPassword,
      });

      // if (response.data && typeof response.data === 'string') {
      //   Alert.alert('Succès', 'Connexion réussie.');
      //   // navigation.navigate('Dashboard');
      //   navigation.navigate('Dashboard', { token: response.data });

      // } else {
      //   Alert.alert('Erreur', 'Identifiants incorrects.');
      // }
      // console.log('🔍 Données reçues du backend :', response.data);
    // const token = response.data.token;

    // if (token) {
    //   console.log('✅ Token reçu du backend :', token);
    //   Alert.alert('Succès', 'Connexion réussie.');
    // navigation.navigate('Dashboard', { token });
    // } else {
    //   Alert.alert('Erreur', 'Aucun token reçu du serveur.');
    // }
    // const token = typeof response.data === 'string' ? response.data : response.data.token;


    // use AsyncStorage to store some informations


    const token = response.headers.authorization;
    const encryptedTokenData = token.replace("Bearer ", '');
    console.log('token', token);    //===> store it in AsyncStorage
    console.log('debug', aesDecrypt(encryptedTokenData));
    //var helper = JWTHelper.createJWTHelper();
    //const decryptedTokenData = helper.decode(aesDecrypt(encryptedTokenData));
    const decryptedTokenData = jwtDecode(aesDecrypt(encryptedTokenData));
    console.log('decryptedTokenData', decryptedTokenData);
    console.log('firstName', decryptedTokenData.firstName);    //===> store it in AsyncStorage
    console.log('lastName', decryptedTokenData.lastName);    //===> store it in AsyncStorage
    console.log('userID', decryptedTokenData.userID);    //===> store it in AsyncStorage
    console.log('userRessourceID', decryptedTokenData.userRessourceID);    //===> store it in AsyncStorage

    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('firstName', decryptedTokenData.firstName);
    await AsyncStorage.setItem('lastName', decryptedTokenData.lastName);
    await AsyncStorage.setItem('userID', decryptedTokenData.userID.toString());
    await AsyncStorage.setItem('userRessourceID', decryptedTokenData.userRessourceID.toString());



    if (token) {
      // console.log('✅ Token reçu du backend :', token);
      // Alert.alert('Succès', 'Connexion réussie.');
    navigation.navigate('Dashboard', { token });
    } else {
      Alert.alert('Erreur', 'Aucun token reçu du serveur.');
    }

    } catch (error) {
      console.error('Erreur de connexion:', error.response?.data || error.message);
      Alert.alert('Erreur', 'Connexion impossible. Vérifiez vos identifiants ou votre réseau.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo_muis.png')} style={styles.logo} />
      <Text style={styles.title}>Bienvenue, connectez-vous</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color="#005BAA" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Identifiant"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#005BAA" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View> 

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 30,
    marginTop: -60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#8E2566',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#005BAA',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#005BAA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
