// import React, { useState, useEffect } from 'react';
// import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, FlatList, AsyncStorage } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { StyleSheet } from 'react-native';
// import { Switch } from 'react-native';
// import { Alert } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const formFieldsByType = {
//   'Support': ['client', 'demande', 'produits', 'action', 'duree', 'lieu', 'statutDemande', 'role', 'ville', 'commentaire'],
//   'Maintenance Préventive': ['client', 'demande', 'produits', 'action', 'duree', 'lieu', 'statutDemande', 'role', 'ville', 'commentaire'],
//   'Assistance': ['client', 'demande', 'produits', 'action', 'duree', 'lieu', 'role', 'ville', 'commentaire'],
//   'Projet': ['client', 'projet', 'produits', 'action', 'duree', 'lieu', 'role', 'ville', 'commentaire'],
//   'Formation': ['produits', 'action', 'duree', 'lieu'],
//   'Congé': ['dateDebut', 'dateFin', 'motif', 'commentaire'],
//   'Avant-vente': ['client', 'opportunite', 'action', 'duree', 'lieu', 'role', 'ville', 'commentaire'],
//   'Support SI': ['client', 'demandeSI', 'produits', 'duree', 'lieu', 'role', 'ville', 'commentaire']
// };

// export default function CalendarScreen() {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [tasks, setTasks] = useState({});
//   const [modalVisible, setModalVisible] = useState(false);
//   const [step, setStep] = useState(1);
//   const [selectedType, setSelectedType] = useState('');
//   const [form, setForm] = useState({});
//   const [isDistance, setIsDistance] = useState(false);
//   const [isPrincipal, setIsPrincipal] = useState(true);
//   const [calendarVisible, setCalendarVisible] = useState(false);
//   const [selectedDateField, setSelectedDateField] = useState(null);
//   const [expandedTaskIndex, setExpandedTaskIndex] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [showTasks, setShowTasks] = useState(false);

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const loadTasks = async () => {
//     const savedTasks = await AsyncStorage.getItem('tasks');
//     if (savedTasks) {
//       setTasks(JSON.parse(savedTasks));
//     }
//   };

//   const saveTasksToStorage = async (newTasks) => {
//     await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
//   };

//   const getTaskCount = (dateString) => {
//     return tasks[dateString]?.length || 0;
//   };

//   useEffect(() => {
//     if (step === 2 && selectedType) {
//       const fields = formFieldsByType[selectedType];
//       const initialForm = {};
//       fields.forEach(field => {
//         initialForm[field] = '';
//       });
//       initialForm['type'] = selectedType;
//       initialForm['lieu'] = isDistance ? 'À distance' : 'Sur site';
//       initialForm['role'] = isPrincipal ? 'Principal' : 'Secondaire';
//       setForm(initialForm);
//     }
//   }, [step, selectedType]);

//   useEffect(() => {
//     if (form.type) {
//       setForm(prev => ({
//         ...prev,
//         lieu: isDistance ? 'À distance' : 'Sur site',
//         role: isPrincipal ? 'Principal' : 'Secondaire'
//       }));
//     }
//   }, [isDistance, isPrincipal]);

//   const handleDayPress = (day) => {
//     setSelectedDate(day.dateString);
//     setShowTasks(true);
//   };

//   const handleSaveTask = () => {
//     const newTasks = { ...tasks };
//     if (!newTasks[selectedDate]) newTasks[selectedDate] = [];

//     if (editMode) {
//       newTasks[selectedDate][editIndex] = form;
//     } else {
//       newTasks[selectedDate].push(form);
//     }

//     setTasks(newTasks);
//     saveTasksToStorage(newTasks);
//     setModalVisible(false);
//     setEditMode(false);
//     setEditIndex(null);
//     setShowTasks(true);
//   };

//   const handleDeleteTask = (index) => {
//     const updatedTasks = { ...tasks };
//     updatedTasks[selectedDate].splice(index, 1);
//     setTasks(updatedTasks);
//     saveTasksToStorage(updatedTasks);
//   };

//   const handleEditTask = (task, index) => {
//     setSelectedType(task?.type || '');
//     setForm(task);
//     setIsDistance(task.lieu === 'À distance');
//     setIsPrincipal(task.role === 'Principal');
//     setEditMode(true);
//     setEditIndex(index);
//     setStep(2);
//     setModalVisible(true);
//   };

//   const toggleExpand = (index) => {
//     setExpandedTaskIndex(expandedTaskIndex === index ? null : index);
//   };


import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { StyleSheet } from 'react-native';
import { Switch } from 'react-native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const formFieldsByType = {
  'Support': ['client', 'demande', 'produits', 'action', 'duree', 'lieu', 'statutDemande', 'role', 'ville', 'commentaire'],
  'Maintenance Préventive': ['client', 'demande', 'produits', 'action', 'duree', 'lieu', 'statutDemande', 'role', 'ville', 'commentaire'],
  'Assistance': ['client', 'demande', 'produits', 'action', 'duree', 'lieu', 'role', 'ville', 'commentaire'],
  'Projet': ['client', 'projet', 'produits', 'action', 'duree', 'lieu', 'role', 'ville', 'commentaire'],
  'Formation': ['produits', 'action', 'duree', 'lieu'],
  'Congé': ['dateDebut', 'dateFin', 'motif', 'commentaire'],
  'Avant-vente': ['client', 'opportunite', 'action', 'duree', 'lieu', 'role', 'ville', 'commentaire'],
  'Support SI': ['client', 'demandeSI', 'produits', 'duree', 'lieu', 'role', 'ville', 'commentaire']
};

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [form, setForm] = useState({});
  const [isDistance, setIsDistance] = useState(false);
  const [isPrincipal, setIsPrincipal] = useState(true);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState(null);
  const [expandedTaskIndex, setExpandedTaskIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showTasks, setShowTasks] = useState(false);

  const formatToApiDate = (date) => moment(date).format('DD/MM/YYYY');

  const loadTasksFromBackend = async (dateStr) => {
    try {
      const ressourceID = await AsyncStorage.getItem('userRessourceID');
      const token = await AsyncStorage.getItem('token');
      if (!ressourceID || !token) {
        Alert.alert('Erreur', 'Utilisateur non connecté');
        return;
      }

      const response = await api.get('/m-time-intervention/getRange', {
        params: {
          ressource: ressourceID,
          dateDebut: formatToApiDate(dateStr),
          dateFin: formatToApiDate(dateStr),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const backendTasks = response.data;
      const formattedTasks = {};

      backendTasks.forEach(item => {
        const date = item.date?.split('T')[0];
        if (!date) return;
        const task = {
          type: item.typeActivite?.libelle || 'Type inconnu',
          client: item.client || '',
          demande: item.demande || '',
          produits: item.produits?.map(p => p.libelle).join(', ') || '',
          action: item.action?.libelle || '',
          duree: `${item.dureeHeure || 0}h${item.dureeMinutes || 0}min`,
          lieu: item.lieu || '',
          role: item.role || '',
          commentaire: item.commentaire || '',
        };
        if (!formattedTasks[date]) formattedTasks[date] = [];
        formattedTasks[date].push(task);
      });

      setTasks(prev => ({
        ...prev,
        [dateStr]: formattedTasks[dateStr] || [],
      }));
    } catch (error) {
      console.error('Erreur récupération interventions:', error);
      Alert.alert('Erreur', 'Impossible de charger les interventions');
    }
  };

  const handleDayPress = (day) => {
    const dateStr = day.dateString;
    setSelectedDate(dateStr);
    setShowTasks(true);
    loadTasksFromBackend(dateStr);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const savedTasks = await AsyncStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  const saveTasksToStorage = async (newTasks) => {
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const getTaskCount = (dateString) => tasks[dateString]?.length || 0;

  useEffect(() => {
    if (step === 2 && selectedType) {
      const fields = formFieldsByType[selectedType];
      const initialForm = {};
      fields.forEach(field => { initialForm[field] = ''; });
      initialForm['type'] = selectedType;
      initialForm['lieu'] = isDistance ? 'À distance' : 'Sur site';
      initialForm['role'] = isPrincipal ? 'Principal' : 'Secondaire';
      setForm(initialForm);
    }
  }, [step, selectedType]);

  useEffect(() => {
    if (form.type) {
      setForm(prev => ({
        ...prev,
        lieu: isDistance ? 'À distance' : 'Sur site',
        role: isPrincipal ? 'Principal' : 'Secondaire'
      }));
    }
  }, [isDistance, isPrincipal]);

  const handleSaveTask = () => {
    const newTasks = { ...tasks };
    if (!newTasks[selectedDate]) newTasks[selectedDate] = [];

    if (editMode) {
      newTasks[selectedDate][editIndex] = form;
    } else {
      newTasks[selectedDate].push(form);
    }

    setTasks(newTasks);
    saveTasksToStorage(newTasks);
    setModalVisible(false);
    setEditMode(false);
    setEditIndex(null);
    setShowTasks(true);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = { ...tasks };
    updatedTasks[selectedDate].splice(index, 1);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const handleEditTask = (task, index) => {
    setSelectedType(task?.type || '');
    setForm(task);
    setIsDistance(task.lieu === 'À distance');
    setIsPrincipal(task.role === 'Principal');
    setEditMode(true);
    setEditIndex(index);
    setStep(2);
    setModalVisible(true);
  };

  const toggleExpand = (index) => {
    setExpandedTaskIndex(expandedTaskIndex === index ? null : index);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        {/* <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Calendrier</Text> */}
        {selectedDate && (
          <TouchableOpacity onPress={() => { setModalVisible(true); setStep(1); setSelectedType(''); setEditMode(false); }}>
            {/* <Text style={{ fontSize: 15 }}>➕</Text> */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end',  width: '100%' }}>
                <Text style={{ fontSize: 15 }}>➕</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <Calendar
        onDayPress={handleDayPress}
        dayComponent={({ date, state }) => {
          const dateStr = date.dateString;
          const taskCount = getTaskCount(dateStr);
          const barWidth = Math.min(6 + taskCount * 6, 30);

          const isToday = dateStr === new Date().toISOString().split('T')[0];
          const isSelected = dateStr === selectedDate;

          return (
            <TouchableOpacity onPress={() => handleDayPress(date)}>
              <View style={{ alignItems: 'center', paddingVertical: 4 }}>
                <View
                  style={{
                    backgroundColor: isSelected ? '#007AFF' : isToday ? '#D0E8FF' : 'transparent',
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    minWidth: 30,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: state === 'disabled' ? 'gray' : isSelected ? 'white' : 'black',
                      fontWeight: isSelected || isToday ? 'bold' : 'normal',
                    }}
                  >
                    {date.day}
                  </Text>
                </View>
                {taskCount > 0 && (
                  <View
                    style={{
                      height: 4,
                      width: barWidth,
                      backgroundColor: '#D0E8FF',
                      borderRadius: 2,
                      marginTop: 4,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>{editMode ? 'Modifier une tâche' : 'Ajouter une tâche'}</Text>

          {step === 1 && (
            <>
              <Text style={{ marginBottom: 10 }}>Type de tâche :</Text>
              {Object.keys(formFieldsByType).map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => { setSelectedType(type); setStep(2); }}
                  style={[styles.typeButton, selectedType === type && styles.typeSelected]}
                >
                  <Text style={styles.buttonText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {step === 2 && (
            <>
              {formFieldsByType[selectedType]?.map((field) => (
                field === 'lieu' ? (
                  <View key={field} style={styles.input}>
                    <Text>Lieu :</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>À distance</Text>
                      <Switch value={isDistance} onValueChange={setIsDistance} />
                      <Text>Sur site</Text>
                    </View>
                  </View>
                ) : field === 'role' ? (
                  <View key={field} style={styles.input}>
                    <Text>Rôle :</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>Principal</Text>
                      <Switch value={isPrincipal} onValueChange={setIsPrincipal} />
                      <Text>Secondaire</Text>
                    </View>
                  </View>
                ) : field === 'dateDebut' || field === 'dateFin' ? (
                  <View key={field} style={styles.input}>
                    <Text>{field === 'dateDebut' ? 'Date de début' : 'Date de fin'} :</Text>
                    <TouchableOpacity onPress={() => { setSelectedDateField(field); setCalendarVisible(true); }} style={styles.dateInput}>
                      <Text style={styles.inputText}>{form[field] || 'Sélectionner une date'}</Text>
                    </TouchableOpacity>
                  </View>
                ) : field === 'duree' ? (
                  <View key={field} style={styles.input}>
                    <Text>Durée :</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                      <TextInput
                        style={styles.durationInput}
                        value={form[field]?.split('h')[0] || ''}
                        onChangeText={hours => {
                          if (/^\d*$/.test(hours)) {
                            const mins = form[field]?.split('h')[1]?.replace('min', '') || '';
                            setForm({ ...form, [field]: `${hours}h${mins}min` });
                          }
                        }}
                        keyboardType="numeric"
                        maxLength={2}
                        placeholder="00"
                      />
                      <Text style={{ marginHorizontal: 5 }}>h</Text>
                      <TextInput
                        style={styles.durationInput}
                        value={form[field]?.split('h')[1]?.replace('min', '') || ''}
                        onChangeText={mins => {
                          if (/^\d*$/.test(mins)) {
                            const hours = form[field]?.split('h')[0] || '';
                            setForm({ ...form, [field]: `${hours}h${mins}min` });
                          }
                        }}
                        keyboardType="numeric"
                        maxLength={2}
                        placeholder="00"
                      />
                      <Text style={{ marginLeft: 5 }}>min</Text>
                    </View>
                  </View>
                ) : (
                  <TextInput
                    key={field}
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    placeholderTextColor="#888"
                    style={styles.input}
                    value={form[field]}
                    onChangeText={text => setForm({ ...form, [field]: text })}
                    keyboardType="default"
                  />
                )
              ))}
              <TouchableOpacity onPress={handleSaveTask} style={styles.saveButton}>
                <Text style={styles.buttonText}>Enregistrer</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {calendarVisible && (
        <Modal visible={calendarVisible} animationType="slide">
          <View style={{ flex: 1, paddingTop: 40 }}>
            <TouchableOpacity onPress={() => setCalendarVisible(false)} style={{ padding: 10 }}>
              <Text style={{ fontSize: 20 }}>← Retour</Text>
            </TouchableOpacity>
            <Calendar
              onDayPress={(day) => {
                if (selectedDateField) {
                  setForm({ ...form, [selectedDateField]: day.dateString });
                }
                setCalendarVisible(false);
              }}
              markedDates={{
                [form.dateDebut]: { startingDay: true, color: 'green' },
                [form.dateFin]: { endingDay: true, color: 'red' },
              }}
            />
          </View>
        </Modal>
      )}

      {showTasks && selectedDate && tasks[selectedDate] && (
        <ScrollView style={{ padding: 10 }}>
          <Text style={styles.taskTitle}>Tâches du {selectedDate} :</Text>
          {tasks[selectedDate].map((task, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleExpand(index)}
              style={styles.taskItem}
            >
              <Text style={styles.taskText}>
                🧩 {task.type || 'Type inconnu'}
                {task.client ? ` - ${task.client}` : ''}
              </Text>

              {expandedTaskIndex === index && (
                <View style={{ marginTop: 10 }}>
                  {Object.entries(task).map(([key, value]) => {
                    if (key === 'type' || value === '') return null;
                    if (!formFieldsByType[task.type]?.includes(key)) return null;

                    return (
                      <Text key={key} style={styles.taskText}>
                        🔹 {key} : {value}
                      </Text>
                    );
                  })}
                </View>
              )}

              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }}>
                <TouchableOpacity onPress={() => handleEditTask(task, index)} style={{ marginRight: 10 }}>
                  <Text style={{ fontSize: 16 }}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Confirmation",
                      "Êtes-vous sûr de vouloir supprimer cette tâche ?",
                      [
                        { text: "Non", style: "cancel" },
                        {
                          text: "Oui",
                          onPress: () => handleDeleteTask(index),
                           style: "destructive",
                        }
                      ]
                    )
                  }
                >
                  <Text style={{ fontSize: 16 }}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  durationInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: 40,
    textAlign: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#7E1946',
  },
  taskText: {
    fontSize: 14,
    marginBottom: 3,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#7E1946',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#005BAA',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  typeButton: {
    backgroundColor: '#2F5D85',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  typeSelected: {
    backgroundColor: '#005BAA',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});





























// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from '../services/api';

// export default function CalendarScreen() {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [interventions, setInterventions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [expandedIndex, setExpandedIndex] = useState(null);
//   const [ressourceID, setRessourceID] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const storedRessourceID = await AsyncStorage.getItem('userRessourceID');
//       setRessourceID(storedRessourceID);
//     })();
//   }, []);

//   const formatToApi = (dateStr) => {
//     const [year, month, day] = dateStr.split('-');
//     return `${day}/${month}/${year}`;
//   };

//   const fetchInterventions = async (dateStr) => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('token');
//       const response = await api.get('/m-time-intervention/getRange', {
//         params: {
//           ressource: ressourceID,
//           dateDebut: formatToApi(dateStr),
//           dateFin: formatToApi(dateStr),
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setInterventions(response.data || []);
//     } catch (error) {
//       console.warn('Erreur API CalendarScreen:', error.response?.data || error.message);
//       Alert.alert('Erreur', "Impossible de charger les interventions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDayPress = (day) => {
//     const dateStr = day.dateString;
//     setSelectedDate(dateStr);
//     fetchInterventions(dateStr);
//   };

//   const toggleExpand = (index) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
//         {selectedDate && (
//           <TouchableOpacity onPress={() => { setModalVisible(true); }}>
//             <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
//               <Text style={{ fontSize: 15 }}>➕</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       </View>

//       <Calendar onDayPress={handleDayPress} markedDates={selectedDate ? {
//         [selectedDate]: { selected: true, selectedColor: '#005BAA' },
//       } : {}} />

//       {loading ? (
//         <ActivityIndicator size="large" color="#005BAA" style={{ marginTop: 40 }} />
//       ) : selectedDate && interventions.length > 0 ? (
//         <ScrollView style={{ padding: 10 }}>
//           <Text style={styles.taskTitle}>Tâches du {selectedDate} :</Text>
//           {interventions.map((task, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => toggleExpand(index)}
//               style={styles.taskItem}
//             >
//               <Text style={styles.taskText}>
//                 🧩 {task.type || 'Type inconnu'}
//                 {task.client ? ` - ${task.client}` : ''}
//               </Text>
//               {expandedIndex === index && (
//                 <View style={{ marginTop: 10 }}>
//                   {Object.entries(task).map(([key, value]) => {
//                     if (key === 'type' || !value) return null;
//                     return (
//                       <Text key={key} style={styles.taskText}>
//                         🔹 {key} : {value}
//                       </Text>
//                     );
//                   })}
//                 </View>
//               )}
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       ) : selectedDate ? (
//         <Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>
//           Aucune intervention pour cette date.
//         </Text>
//       ) : null}

//       {/* Modal bouton + (futur ajout) */}
//       <Modal visible={modalVisible} animationType="slide">
//         <View style={{ flex: 1, padding: 20 }}>
//           <TouchableOpacity onPress={() => setModalVisible(false)}>
//             <Text style={{ fontSize: 18 }}>← Retour</Text>
//           </TouchableOpacity>
//           <View style={{ marginTop: 20 }}>
//             <Text>Ajout d'une intervention (fonctionnalité future)</Text>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   taskTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 15,
//   },
//   taskItem: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//     borderLeftWidth: 4,
//     borderLeftColor: '#7E1946',
//   },
//   taskText: {
//     fontSize: 14,
//     marginBottom: 3,
//   },
// });














// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import TaskStats from '../components/TaskStats';
// import TaskList from '../components/TaskList';
// import TaskForm from '../components/TaskForm';

// export default function CalendarScreen() {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [tasks, setTasks] = useState({});
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editTask, setEditTask] = useState({});

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const loadTasks = async () => {
//     const savedTasks = await AsyncStorage.getItem('tasks');
//     if (savedTasks) {
//       setTasks(JSON.parse(savedTasks));
//     }
//   };

//   const saveTasksToStorage = async (newTasks) => {
//     await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
//   };

//   const handleDayPress = (day) => {
//     setSelectedDate(day.dateString);
//   };

//   const handleAddTask = () => {
//     setEditMode(false);
//     setEditTask({});
//     setModalVisible(true);
//   };

//   const handleSaveTask = (formData) => {
//     const newTasks = { ...tasks };
//     if (!newTasks[selectedDate]) newTasks[selectedDate] = [];

//     if (editMode) {
//       newTasks[selectedDate][editIndex] = formData;
//     } else {
//       newTasks[selectedDate].push(formData);
//     }

//     setTasks(newTasks);
//     saveTasksToStorage(newTasks);
//     setModalVisible(false);
//   };

//   const handleDeleteTask = (index) => {
//     const updatedTasks = { ...tasks };
//     updatedTasks[selectedDate].splice(index, 1);
//     setTasks(updatedTasks);
//     saveTasksToStorage(updatedTasks);
//   };

//   const handleEditTask = (task, index) => {
//     setEditTask(task);
//     setEditMode(true);
//     setEditIndex(index);
//     setModalVisible(true);
//   };

//   const getTaskCount = (dateString) => {
//     return tasks[dateString]?.length || 0;
//   };

//   return (
//     <View style={styles.container}>
//       {/* <View style={styles.header}> */}
//         {/* <Text style={styles.headerText}>Calendrier</Text> */}
//       {/* </View> */}

//       <Calendar
//         onDayPress={handleDayPress}
//         markedDates={{
//           [selectedDate]: { selected: true, selectedColor: '#007AFF' },
//         }}
//         dayComponent={({ date, state }) => {
//           const dateStr = date.dateString;
//           const taskCount = getTaskCount(dateStr);
//           const barWidth = Math.min(6 + taskCount * 6, 30);

//           const isToday = dateStr === new Date().toISOString().split('T')[0];
//           const isSelected = dateStr === selectedDate;

//           return (
//             <TouchableOpacity onPress={() => handleDayPress(date)}>
//               <View style={styles.dayContainer}>
//                 <View style={[
//                   styles.dayContent,
//                   isSelected && styles.selectedDay,
//                   isToday && !isSelected && styles.todayDay
//                 ]}>
//                   <Text style={[
//                     styles.dayText,
//                     state === 'disabled' && styles.disabledDay,
//                     (isSelected || isToday) && styles.boldDay
//                   ]}>
//                     {date.day}
//                   </Text>
//                 </View>
//                 {taskCount > 0 && (
//                   <View style={[styles.taskIndicator, { width: barWidth }]} />
//                 )}
//               </View>
//             </TouchableOpacity>
//           );
//         }}
//       />

//       <TaskStats 
//         tasks={tasks} 
//         selectedDate={selectedDate} 
//         onAddTask={handleAddTask} 
//       />

//       <TaskList
//         tasks={tasks}
//         selectedDate={selectedDate}
//         onEditTask={handleEditTask}
//         onDeleteTask={handleDeleteTask}
//       />

//       <TaskForm
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         onSubmit={handleSaveTask}
//         initialType={editTask?.type}
//         initialForm={editTask}
//         isEditMode={editMode}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   dayContainer: {
//     alignItems: 'center',
//     paddingVertical: 4,
//   },
//   dayContent: {
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     minWidth: 30,
//     alignItems: 'center',
//   },
//   selectedDay: {
//     backgroundColor: '#007AFF',
//   },
//   todayDay: {
//     backgroundColor: '#D0E8FF',
//   },
//   dayText: {
//     color: 'black',
//   },
//   disabledDay: {
//     color: 'gray',
//   },
//   boldDay: {
//     fontWeight: 'bold',
//   },
//   taskIndicator: {
//     height: 4,
//     backgroundColor: '#D0E8FF',
//     borderRadius: 2,
//     marginTop: 4,
//   },
// });