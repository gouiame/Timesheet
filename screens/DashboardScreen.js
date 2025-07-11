// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';
// import api from '../services/api';
// // import jwt_decode from 'jwt-decode';
// import * as jwtDecodeModule from 'jwt-decode';
// const jwtDecode = jwtDecodeModule.jwtDecode;


// const formatDateApi = (isoDate) => {
//   if (!isoDate) return '';
//   const [year, month, day] = isoDate.split('-');
//   return `${day}/${month}/${year}`;
// };

// const formatDateFr = (dateStr) => {
//   if (!dateStr) return '';
//   const [day, month, year] = dateStr.split('/');
//   const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
//   return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
// };

// export default function DashboardScreen({ route, navigation }) {
//   const [interventions, setInterventions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = route.params?.token;
//   // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUmVzc291cmNlSUQiOiIxMjMiLCJuYW1lIjoiVGVzdCIsInJvbGUiOiJ1c2VyIn0.dummy_signature';


//   // useEffect(() => {
//   //   console.log('Token reçu dans DashboardScreen:', token);

//   //   if (!token) {
//   //     Alert.alert('Erreur', 'Token manquant');
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   let decoded;
//   //   try {
//   //     decoded = jwtDecode(token);
//   //     console.log('Token décodé :', decoded);
//   //   } catch (e) {
//   //     console.log('Erreur lors du décodage du token :', e.message);
//   //     Alert.alert('Erreur', 'Token invalide');
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   const userRessourceID = decoded?.userRessourceID;
//   //   if (!userRessourceID) {
//   //     Alert.alert('Erreur', 'Ressource ID non trouvé dans le token');
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   const fetchInterventions = async () => {
//   //     try {
//   //       // Dates formatées attendues par l'API (jj/mm/aaaa)
//   //       const dateDebut = '01/07/2025';
//   //       const dateFin = '31/07/2025';

//   //       const response = await api.get('/m-time-intervention/getRange', {
//   //         params: {
//   //           ressource: userRessourceID,
//   //           dateDebut,
//   //           dateFin,
//   //         },
          
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });
//   //       console.log('API response:', response.data);
//   //       // console.log('Interventions reçues:', response.data);
//   //       setInterventions(response.data || []);
//   //     } catch (error) {
//   //       console.error('Erreur récupération interventions:', error.response?.data || error.message);
//   //       Alert.alert('Erreur', 'Impossible de charger les interventions');
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchInterventions();
//   // }, [token]);



//     useEffect(() => {
//   console.log('Token reçu dans DashboardScreen:', token);

//   // if (!token) {
//   //   Alert.alert('Erreur', 'Token manquant');
//   //   setLoading(false);
//   //   return;
//   // }

//   const fetchInterventions = async () => {
//     try {
//       // const dateDebut = '01/07/2025';
//       // const dateFin = '31/07/2025';

//       const response = await api.get('/m-time-intervention/getRange', {
//         params: {
//           dateDebut : '01/07/2025',
//           dateFin : '31/07/2026',
//           ressource : 225,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log('API response:', response.data);
//       setInterventions(response.data || []);
//     } catch (error) {
//       console.error('Erreur récupération interventions:', error.response?.data || error.message);
//       Alert.alert('Erreur', 'Impossible de charger les interventions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchInterventions();
// }, [token]);
//   const totalHeures = interventions.reduce((acc, i) => acc + (parseFloat(i.hours) || 0), 0);

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <Text style={styles.itemDate}>{formatDateFr(formatDateApi(item.date))}</Text>
//       <Text style={styles.itemTask}>{item.task || item.demande || 'Intervention'}</Text>
//       <Text style={styles.itemHours}>{item.hours} h</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tableau de bord</Text>

//       <View style={styles.summaryCard}>
//         <Text style={styles.summaryLabel}>Total heures saisies</Text>
//         <Text style={styles.summaryValue}>{totalHeures.toFixed(2)}</Text>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#005BAA" style={{ marginTop: 50 }} />
//       ) : (
//         <>
//           {interventions.length === 0 ? (
//             <Text style={styles.emptyText}>Aucune intervention trouvée.</Text>
//           ) : (
//             <FlatList
//               data={interventions}
//               keyExtractor={(item, index) => item.id?.toString() || index.toString()}
//               renderItem={renderItem}
//               style={{ width: '100%' }}
//               contentContainerStyle={{ paddingBottom: 30 }}
//             />
//           )}
//         </>
//       )}

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Calendar', { token })}
//       >
//         <Text style={styles.buttonText}>Ajouter une tâche 📅</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f4f7fb', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
//   title: { fontSize: 24, fontWeight: '700', color: '#005BAA', marginBottom: 30 },
//   summaryCard: {
//     width: '100%',
//     backgroundColor: '#7E1946',
//     borderRadius: 16,
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     marginBottom: 25,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 10,
//   },
//   summaryLabel: { color: '#fff', fontSize: 18, marginBottom: 8 },
//   summaryValue: { color: '#fff', fontSize: 48, fontWeight: 'bold' },
//   item: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//   },
//   itemDate: { fontWeight: '600', color: '#005BAA', flex: 2 },
//   itemTask: { flex: 4, color: '#333' },
//   itemHours: { flex: 1, fontWeight: '700', color: '#7E1946', textAlign: 'right' },
//   emptyText: { marginTop: 60, fontStyle: 'italic', fontSize: 16, color: '#888' },
//   button: {
//     backgroundColor: '#4D9FD3',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 12,
//     marginTop: 'auto',
//     marginBottom: 30,
//     alignSelf: 'stretch',
//   },
//   buttonText: { color: '#fff', fontWeight: '700', fontSize: 16, textAlign: 'center' },
// });






















// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from '../services/api';

// const formatDateApi = (isoDate) => {
//   if (!isoDate) return '';
//   const [year, month, day] = isoDate.split('-');
//   return `${day}/${month}/${year}`;
// };

// const formatDateFr = (dateStr) => {
//   if (!dateStr) return '';
//   const [day, month, year] = dateStr.split('/');
//   const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
//   return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
// };

// const getDateRange = () => {
//   const now = new Date();
//   const start = new Date(now.getFullYear(), now.getMonth(), 1);
//   const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

//   const format = (d) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
//   return { dateDebut: format(start), dateFin: format(end) };
// };

// export default function DashboardScreen({ navigation }) {
//   const [interventions, setInterventions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const ressourceID = await AsyncStorage.getItem('userRessourceID');
//         const firstName = await AsyncStorage.getItem('firstName');
//         const lastName = await AsyncStorage.getItem('lastName');

//         setUserName(`${firstName || ''} ${lastName || ''}`);

//         if (!token || !ressourceID) {
//           Alert.alert('Erreur', 'Token ou Ressource ID manquant');
//           setLoading(false);
//           return;
//         }

//         const { dateDebut, dateFin } = getDateRange();

//         const response = await api.get('/m-time-intervention/getRange', {
//           params: {
//             ressource: ressourceID,
//             dateDebut,
//             dateFin,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setInterventions(response.data || []);
//       } catch (error) {
//         console.error('Erreur récupération interventions:', error.response?.data || error.message);
//         Alert.alert('Erreur', 'Impossible de charger les interventions');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const totalHeures = interventions.reduce((acc, i) => acc + (parseFloat(i.hours) || 0), 0);

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <Text style={styles.itemDate}>{formatDateFr(formatDateApi(item.date))}</Text>
//       <Text style={styles.itemTask}>{item.task || item.demande || 'Intervention'}</Text>
//       <Text style={styles.itemHours}>{item.hours} h</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Bienvenue {userName}</Text>

//       <View style={styles.summaryCard}>
//         <Text style={styles.summaryLabel}>Total heures saisies</Text>
//         <Text style={styles.summaryValue}>{totalHeures.toFixed(2)}</Text>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#005BAA" style={{ marginTop: 50 }} />
//       ) : (
//         <>
//           {interventions.length === 0 ? (
//             <Text style={styles.emptyText}>Aucune intervention trouvée.</Text>
//           ) : (
//             <FlatList
//               data={interventions}
//               keyExtractor={(item, index) => item.id?.toString() || index.toString()}
//               renderItem={renderItem}
//               style={{ width: '100%' }}
//               contentContainerStyle={{ paddingBottom: 30 }}
//             />
//           )}
//         </>
//       )}

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Calendar')}
//       >
//         <Text style={styles.buttonText}>Ajouter une tâche 📅</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f4f7fb', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
//   title: { fontSize: 24, fontWeight: '700', color: '#005BAA', marginBottom: 30 },
//   summaryCard: {
//     width: '100%',
//     backgroundColor: '#7E1946',
//     borderRadius: 16,
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     marginBottom: 25,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 10,
//   },
//   summaryLabel: { color: '#fff', fontSize: 18, marginBottom: 8 },
//   summaryValue: { color: '#fff', fontSize: 48, fontWeight: 'bold' },
//   item: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//   },
//   itemDate: { fontWeight: '600', color: '#005BAA', flex: 2 },
//   itemTask: { flex: 4, color: '#333' },
//   itemHours: { flex: 1, fontWeight: '700', color: '#7E1946', textAlign: 'right' },
//   emptyText: { marginTop: 60, fontStyle: 'italic', fontSize: 16, color: '#888' },
//   button: {
//     backgroundColor: '#4D9FD3',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 12,
//     marginTop: 'auto',
//     marginBottom: 30,
//     alignSelf: 'stretch',
//   },
//   buttonText: { color: '#fff', fontWeight: '700', fontSize: 16, textAlign: 'center' },
// });



































// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   FlatList,
//   ActivityIndicator,
//   Alert,
//   Text,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from '../services/api';
// import {
//   Card,
//   Flex,
//   Button,
//   WhiteSpace,
//   WingBlank,
// } from '@ant-design/react-native';

// const formatDateApi = (isoDate) => {
//   if (!isoDate) return '';
//   const [year, month, day] = isoDate.split('-');
//   return `${day}/${month}/${year}`;
// };

// const formatDateFr = (dateStr) => {
//   if (!dateStr) return '';
//   const [day, month, year] = dateStr.split('/');
//   const months = [
//     'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
//     'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
//   ];
//   return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
// };

// const getDateRange = () => {
//   const now = new Date();
//   const start = new Date(now.getFullYear(), now.getMonth(), 1);
//   const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//   const format = (d) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
//   return { dateDebut: format(start), dateFin: format(end) };
// };

// export default function DashboardScreen({ navigation }) {
//   const [interventions, setInterventions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const ressourceID = await AsyncStorage.getItem('userRessourceID');
//         const firstName = await AsyncStorage.getItem('firstName');
//         const lastName = await AsyncStorage.getItem('lastName');
//         setUserName(`${firstName || ''} ${lastName || ''}`);

//         if (!token || !ressourceID) {
//           Alert.alert('Erreur', 'Token ou Ressource ID manquant');
//           setLoading(false);
//           return;
//         }

//         const { dateDebut, dateFin } = getDateRange();

//         const response = await api.get('/m-time-intervention/getRange', {
//           params: {
//             ressource: ressourceID,
//             dateDebut,
//             dateFin,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setInterventions(response.data || []);
//       } catch (error) {
//         console.error('Erreur récupération interventions:', error.response?.data || error.message);
//         Alert.alert('Erreur', 'Impossible de charger les interventions');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const totalHeures = interventions.reduce((acc, i) => acc + (parseFloat(i.hours) || 0), 0);

//   const renderItem = ({ item }) => (
//     <Card style={{ marginBottom: 10, borderRadius: 12, elevation: 3 }}>
//       <Card.Header
//         title={<Text style={{ color: '#005BAA', fontWeight: '600' }}>{formatDateFr(formatDateApi(item.date))}</Text>}
    
//       />
//       <Card.Body>
//         <View style={{ paddingHorizontal: 16 }}>
//           <Text style={{ fontSize: 16 }}>{item.task || item.demande || 'Intervention'}</Text>
//         </View>
//       </Card.Body>
//       <Card.Footer
//         content={<Text style={{ fontWeight: '700', color: '#7E1946' }}>{item.hours} h</Text>}
    
//       />
//     </Card>
//   );

//   return (
//     <WingBlank style={{ flex: 1, backgroundColor: '#f4f7fb' }}>
//       <WhiteSpace size="lg" />

//       <Text style={{ fontSize: 24, fontWeight: '700', color: '#005BAA', textAlign: 'center' }}>
//         Bienvenue {userName}
//       </Text>

//       <WhiteSpace size="lg" />

//       <Card full style={{ backgroundColor: '#7E1946', borderRadius: 16, marginBottom: 20 }}>
//         <Card.Body>
//           <View style={{ padding: 25, alignItems: 'center' }}>
//             <Text style={{ color: '#fff', fontSize: 18, marginBottom: 8 }}>Total heures saisies</Text>
//             <Text style={{ color: '#fff', fontSize: 48, fontWeight: 'bold' }}>{totalHeures.toFixed(2)}</Text>
//           </View>
//         </Card.Body>
//       </Card>

//       {loading ? (
//         <ActivityIndicator size="large" color="#005BAA" style={{ marginTop: 40 }} />
//       ) : interventions.length === 0 ? (
//         <Text style={{ textAlign: 'center', color: '#888', marginTop: 60 }}>
//           Aucune intervention trouvée.
//         </Text>
//       ) : (
//         <FlatList
//           data={interventions}
//           keyExtractor={(item, index) => item.id?.toString() || index.toString()}
//           renderItem={renderItem}
//           contentContainerStyle={{ paddingBottom: 30 }}
//         />
//       )}

//       <WhiteSpace size="lg" />

//       <Button
//         style={{ backgroundColor: '#4D9FD3', borderColor: '#4D9FD3' }}
//         type="primary"
//         onPress={() => navigation.navigate('Calendar')}
//       >
//         {/* Ajouter une tâche 📅 */}
//         <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ajouter une tâche 📅</Text>
//       </Button>

//       <WhiteSpace size="lg" />
//     </WingBlank>
//   );
// }







































// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   FlatList,
//   ActivityIndicator,
//   Alert,
//   Text,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from '../services/api';
// import {
//   Card,
//   Button,
//   WhiteSpace,
//   WingBlank,
// } from '@ant-design/react-native';

// const formatDateApi = (isoDate) => {
//   if (!isoDate) return '';
//   const [year, month, day] = isoDate.split('-');
//   return `${day}/${month}/${year}`;
// };

// const formatDateFr = (dateStr) => {
//   if (!dateStr) return '';
//   const [day, month, year] = dateStr.split('/');
//   const months = [
//     'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
//     'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
//   ];
//   return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
// };

// const getDateRange = () => {
//   const now = new Date();
//   const start = new Date(now.getFullYear(), now.getMonth(), 1);
//   const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//   const format = (d) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
//   return { dateDebut: format(start), dateFin: format(end) };
// };

// export default function DashboardScreen({ navigation }) {
//   const [interventions, setInterventions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const ressourceID = await AsyncStorage.getItem('userRessourceID');
//         const firstName = await AsyncStorage.getItem('firstName');
//         const lastName = await AsyncStorage.getItem('lastName');
//         setUserName(`${firstName || ''} ${lastName || ''}`);

//         if (!token || !ressourceID) {
//           Alert.alert('Erreur', 'Token ou Ressource ID manquant');
//           setLoading(false);
//           return;
//         }

//         const { dateDebut, dateFin } = getDateRange();

//         const response = await api.get('/m-time-intervention/getRange', {
//           params: { ressource: ressourceID, dateDebut, dateFin },
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setInterventions(response.data || []);
//       } catch (error) {
//         console.error('Erreur récupération interventions:', error.response?.data || error.message);
//         Alert.alert('Erreur', 'Impossible de charger les interventions');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const totalHeures = interventions.reduce(
//     (acc, i) => acc + (parseFloat(i.hours) || 0),
//     0
//   );

//   const renderItem = ({ item }) => (
//     // <Card style={{ marginBottom: 10, borderRadius: 12, elevation: 3 }}>
//     //   <Card.Header
//     //     title={
//     //       <Text style={{ color: '#005BAA', fontWeight: '600' }}>
//     //         {formatDateFr(formatDateApi(item.date))}
//     //       </Text>
//     //     }
//     //   />
//     //   <Card.Body>
//     //     <View style={{ paddingHorizontal: 16 }}>
//     //       <Text style={{ fontSize: 16 }}>
//     //         {item.task || item.demande || 'Intervention'}
//     //       </Text>
//     //     </View>
//     //   </Card.Body>
//     //   <Card.Footer
//     //     content={
//     //       <Text style={{ fontWeight: '700', color: '#7E1946' }}>
//     //         {item.hours ? `${item.hours} h` : '0 h'}
//     //       </Text>
//     //     }
//     //   />
//     // </Card>
//     <Card style={{ marginBottom: 10, borderRadius: 12, elevation: 3 }}>
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       paddingHorizontal: 16,
//       paddingVertical: 10,
//       borderBottomWidth: 1,
//       borderBottomColor: '#eee',
//     }}
//   >
//     <Text style={{ color: '#005BAA', fontWeight: '600' }}>
//       {formatDateFr(formatDateApi(item.date))}
//     </Text>
//     <Text style={{ color: '#7E1946', fontWeight: 'bold' }}>
//       {item.hours ? `${item.hours} h` : '0 h'}
//     </Text>
//   </View>

//   <Card.Body>
//     <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
//       <Text style={{ fontSize: 16 }}>
//         {item.task || item.demande || 'Intervention'}
//       </Text>
//     </View>
//   </Card.Body>
// </Card>

//   );

//   return (
//     <WingBlank style={{ flex: 1, backgroundColor: '#f4f7fb' }}>
//       <WhiteSpace size="lg" />

//       <Text
//         style={{
//           fontSize: 24,
//           fontWeight: '700',
//           color: '#005BAA',
//           textAlign: 'center',
//         }}
//       >
//         Bienvenue {userName}
//       </Text>

//       <WhiteSpace size="lg" />

//       <Card
//         full
//         style={{
//           backgroundColor: '#7E1946',
//           borderRadius: 16,
//           marginBottom: 20,
//         }}
//       >
//         <Card.Body>
//           <View style={{ padding:1, alignItems: 'center' }}>
//             <Text style={{ color: '#fff', fontSize: 18, marginBottom: 8 }}>
//               Total heures saisies
//             </Text>
//             <Text style={{ color: '#fff', fontSize: 48, fontWeight: 'bold' }}>
//               {totalHeures.toFixed(2)}
//             </Text>
//           </View>
//         </Card.Body>
//       </Card>

//       {loading ? (
//         <ActivityIndicator
//           size="large"
//           color="#005BAA"
//           style={{ marginTop: 40 }}
//         />
//       ) : interventions.length === 0 ? (
//         <Text style={{ textAlign: 'center', color: '#888', marginTop: 60 }}>
//           Aucune intervention trouvée.
//         </Text>
//       ) : (
//         <FlatList
//           data={interventions}
//           keyExtractor={(item, index) =>
//             item.id?.toString() || index.toString()
//           }
//           renderItem={renderItem}
//           contentContainerStyle={{ paddingBottom: 30 }}
//         />
//       )}

//       <WhiteSpace size="lg" />

//       <Button
//         style={{ backgroundColor: '#4D9FD3', borderColor: '#4D9FD3' }}
//         type="primary"
//         onPress={() => navigation.navigate('Calendar')}
//       >
//         <Text style={{ color: '#fff', fontWeight: 'bold' }}>
//           Ajouter une activité 
//         </Text>
//       </Button>

//       <WhiteSpace size="lg" />
//     </WingBlank>
//   );
// }
























import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import api from '../services/api';
import {
  Card,
  Button,
  WhiteSpace,
  WingBlank,
} from '@ant-design/react-native';

const formatDateApi = (isoDate) => {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
};

const formatDateFr = (dateStr) => {
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('/');
  const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
};

const formatToApi = (dateObj) => {
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatToCalendarDate = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function DashboardScreen({ navigation }) {
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [calendarVisibleDebut, setCalendarVisibleDebut] = useState(false);
  const [calendarVisibleFin, setCalendarVisibleFin] = useState(false);

  useEffect(() => {
    fetchData();
  }, [dateDebut, dateFin]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const ressourceID = await AsyncStorage.getItem('userRessourceID');
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      setUserName(`${firstName || ''} ${lastName || ''}`);

      if (!token || !ressourceID) {
        Alert.alert('Erreur', 'Token ou Ressource ID manquant');
        setLoading(false);
        return;
      }

      const response = await api.get('/m-time-intervention/getRange', {
        params: {
          ressource: ressourceID,
          dateDebut: formatToApi(dateDebut),
          dateFin: formatToApi(dateFin),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInterventions(response.data || []);
    } catch (error) {
      console.error('Erreur récupération interventions:', error.response?.data || error.message);
      Alert.alert('Erreur', 'Impossible de charger les interventions');
    } finally {
      setLoading(false);
    }
  };

  const totalHeures = interventions.reduce(
    (acc, i) => acc + (parseFloat(i.hours) || 0),
    0
  );

  const renderItem = ({ item }) => (
    <Card style={{ marginBottom: 10, borderRadius: 12, elevation: 3 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}
      >
        <Text style={{ color: '#005BAA', fontWeight: '600' }}>
          {formatDateFr(formatDateApi(item.date))}
        </Text>
        <Text style={{ color: '#7E1946', fontWeight: 'bold' }}>
          {item.hours ? `${item.hours} h` : '0 h'}
        </Text>
      </View>
      <Card.Body>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text style={{ fontSize: 16 }}>{item.task || item.demande || 'Intervention'}</Text>
        </View>
      </Card.Body>
    </Card>
  );

  return (
    <TouchableWithoutFeedback onPress={() => {
    setCalendarVisibleDebut(false);
    setCalendarVisibleFin(false);
    Keyboard.dismiss(); 
  }}>
    <View style={{ flex: 1 }}>
      <WingBlank style={{ flex: 1, backgroundColor: '#f4f7fb' }}>
        <WhiteSpace size="lg" />

        <Text style={{
          fontSize: 20,
          fontWeight: '700',
          color: '#005BAA',
          textAlign: 'center',
        }}>
          Bienvenue {userName}
        </Text>

      <WhiteSpace size="lg" />

      {/* Filtres dates */}
      <View style={{ position: 'relative', marginBottom: 2 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: '500' }}>Du</Text>
          <TouchableOpacity onPress={() => {
            setCalendarVisibleDebut(!calendarVisibleDebut);
            setCalendarVisibleFin(false);
          }}>
            <Text style={{ padding: 8, backgroundColor: '#eee', borderRadius: 8, marginHorizontal: 6 }}>
              {formatToApi(dateDebut)}
            </Text>
          </TouchableOpacity>

          <Text style={{ fontWeight: '500' }}>au</Text>
          <TouchableOpacity onPress={() => {
            setCalendarVisibleFin(!calendarVisibleFin);
            setCalendarVisibleDebut(false);
          }}>
            <Text style={{ padding: 8, backgroundColor: '#eee', borderRadius: 8, marginLeft: 6 }}>
              {formatToApi(dateFin)}
            </Text>
          </TouchableOpacity>
        </View>

        {calendarVisibleDebut && (
          <View style={{
            position: 'absolute',
            top: 40,
            left: 20,
            zIndex: 999,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            transform: [{ scale: 0.85 }],
          }}>
            <Calendar
              current={formatToCalendarDate(dateDebut)}
              onDayPress={(day) => {
                setDateDebut(new Date(day.dateString));
                setCalendarVisibleDebut(false);
              }}
              markedDates={{
                [formatToCalendarDate(dateDebut)]: { selected: true, selectedColor: '#005BAA' }
              }}
            />
          </View>
        )}

        {calendarVisibleFin && (
          <View style={{
            position: 'absolute',
            top: 40,
            right: 20,
            zIndex: 999,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            transform: [{ scale: 0.85 }],
          }}>
            <Calendar
              current={formatToCalendarDate(dateFin)}
              onDayPress={(day) => {
                setDateFin(new Date(day.dateString));
                setCalendarVisibleFin(false);
              }}
              markedDates={{
                [formatToCalendarDate(dateFin)]: { selected: true, selectedColor: '#005BAA' }
              }}
            />
          </View>
        )}
      </View>

      {/* Total heures */}
      <Card full style={{ backgroundColor: '#7E1946', borderRadius: 16, marginVertical: 20 }}>
        <Card.Body>
          <View style={{ paddingVertical:6, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 18, marginBottom: 4 }}>Total heures saisies</Text>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
              {totalHeures.toFixed(2)}
            </Text>
          </View>
        </Card.Body>
      </Card>

      {/* Liste des interventions */}
      {loading ? (
        <ActivityIndicator size="large" color="#005BAA" style={{ marginTop: 40 }} />
      ) : interventions.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#888', marginTop: 60 }}>
          Aucune intervention trouvée.
        </Text>
      ) : (
        <FlatList
          data={interventions}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}

      <WhiteSpace size="lg" />

      {/* Bouton Ajouter */}
      <Button
        style={{ backgroundColor: '#4D9FD3', borderColor: '#4D9FD3' }}
        type="primary"
        onPress={() => navigation.navigate('Calendar')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ajouter une activité</Text>
      </Button>

      <WhiteSpace size="lg" />
    </WingBlank>
    </View>
    </TouchableWithoutFeedback>
  );
}
