import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskStats = ({ tasks, selectedDate, onAddTask }) => {
  if (!selectedDate) return null;

  const taskCount = tasks[selectedDate]?.length || 0;
  const typesCount = {};

  if (tasks[selectedDate]) {
    tasks[selectedDate].forEach(task => {
      typesCount[task.type] = (typesCount[task.type] || 0) + 1;
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tâches du {selectedDate}</Text>
        <TouchableOpacity onPress={onAddTask}>
          <Text style={styles.addButton}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{taskCount}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>

        {Object.entries(typesCount).map(([type, count]) => (
          <View key={type} style={styles.statCard}>
            <Text style={styles.statNumber}>{count}</Text>
            <Text style={styles.statLabel}>{type}</Text>
          </View>
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    fontSize: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '30%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#005BAA',
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default TaskStats;