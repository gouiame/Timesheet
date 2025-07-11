import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';

const TaskList = ({ tasks, selectedDate, onEditTask, onDeleteTask }) => {
  const [expandedTaskIndex, setExpandedTaskIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedTaskIndex(expandedTaskIndex === index ? null : index);
  };

  if (!selectedDate || !tasks[selectedDate]) return null;

  return (
    <ScrollView style={{ padding: 10 }}>
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
                return (
                  <Text key={key} style={styles.taskText}>
                    🔹 {key} : {value}
                  </Text>
                );
              })}
            </View>
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }}>
            <TouchableOpacity 
              onPress={() => onEditTask(task, index)} 
              style={{ marginRight: 10 }}
            >
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
                      onPress: () => onDeleteTask(index),
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
  );
};

const styles = StyleSheet.create({
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
});

export default TaskList;