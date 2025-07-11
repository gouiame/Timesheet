import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ScrollView } from 'react-native';

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

const TaskForm = ({ 
  visible, 
  onClose, 
  onSubmit, 
  initialType = '', 
  initialForm = {}, 
  isEditMode = false 
}) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(initialType);
  const [form, setForm] = useState(initialForm);
  const [isDistance, setIsDistance] = useState(false);
  const [isPrincipal, setIsPrincipal] = useState(true);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState(null);

  useEffect(() => {
    if (step === 1) {
      setSelectedType(initialType);
    }
  }, [step, initialType]);

  useEffect(() => {
    if (step === 2 && selectedType) {
      const fields = formFieldsByType[selectedType];
      const newForm = { ...form, type: selectedType };
      
      fields.forEach(field => {
        if (!newForm[field]) {
          newForm[field] = '';
        }
      });
      
      setForm(newForm);
    }
  }, [step, selectedType]);

  const handleSubmit = () => {
    onSubmit(form);
    setStep(1);
    setSelectedType('');
    setForm({});
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{isEditMode ? 'Modifier une tâche' : 'Ajouter une tâche'}</Text>

        {step === 1 && (
          <>
            <Text style={styles.label}>Type de tâche :</Text>
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
                <View key={field} style={styles.fieldContainer}>
                  <Text style={styles.label}>Lieu :</Text>
                  <View style={styles.switchContainer}>
                    <Text>Sur site</Text>
                    <Switch 
                      value={isDistance} 
                      onValueChange={(val) => {
                        setIsDistance(val);
                        setForm({ ...form, lieu: val ? 'À distance' : 'Sur site' });
                      }} 
                    />
                    <Text>À distance</Text>
                  </View>
                </View>
              ) : field === 'role' ? (
                <View key={field} style={styles.fieldContainer}>
                  <Text style={styles.label}>Rôle :</Text>
                  <View style={styles.switchContainer}>
                    <Text>Principal</Text>
                    <Switch 
                      value={isPrincipal} 
                      onValueChange={(val) => {
                        setIsPrincipal(val);
                        setForm({ ...form, role: val ? 'Principal' : 'Secondaire' });
                      }} 
                    />
                    <Text>Secondaire</Text>
                  </View>
                </View>
              ) : field === 'dateDebut' || field === 'dateFin' ? (
                <View key={field} style={styles.fieldContainer}>
                  <Text style={styles.label}>{field === 'dateDebut' ? 'Date de début' : 'Date de fin'} :</Text>
                  <TouchableOpacity 
                    onPress={() => { 
                      setSelectedDateField(field); 
                      setCalendarVisible(true); 
                    }} 
                    style={styles.dateInput}
                  >
                    <Text>{form[field] || 'Sélectionner une date'}</Text>
                  </TouchableOpacity>
                </View>
              ) : field === 'duree' ? (
                <View key={field} style={styles.fieldContainer}>
                  <Text style={styles.label}>Durée :</Text>
                  <View style={styles.durationContainer}>
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
                    <Text style={styles.durationText}>h</Text>
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
                    <Text style={styles.durationText}>min</Text>
                  </View>
                </View>
              ) : (
                <View key={field} style={styles.fieldContainer}>
                  <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')} :</Text>
                  <TextInput
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    placeholderTextColor="#888"
                    style={styles.input}
                    value={form[field]}
                    onChangeText={text => setForm({ ...form, [field]: text })}
                  />
                </View>
              )
            ))}

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Annuler</Text>
        </TouchableOpacity>

        {calendarVisible && (
          <Modal visible={calendarVisible} animationType="slide">
            <View style={styles.calendarContainer}>
              <TouchableOpacity 
                onPress={() => setCalendarVisible(false)} 
                style={styles.backButton}
              >
                <Text style={styles.backText}>← Retour</Text>
              </TouchableOpacity>
              <Calendar
                onDayPress={(day) => {
                  setForm({ ...form, [selectedDateField]: day.dateString });
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
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#7E1946',
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 40,
    textAlign: 'center',
  },
  durationText: {
    marginHorizontal: 5,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  typeButton: {
    backgroundColor: '#2F5D85',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  typeSelected: {
    backgroundColor: '#005BAA',
  },
  submitButton: {
    backgroundColor: '#005BAA',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#999',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  calendarContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 15,
  },
  backText: {
    fontSize: 18,
  },
});

export default TaskForm;