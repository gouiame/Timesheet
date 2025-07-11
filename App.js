// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './screens/LoginScreen';
// import DashboardScreen from './screens/DashboardScreen';
// import CalendarScreen from './screens/CalendarScreen';
// // import { createStackNavigator } from '@react-navigation/stack';


// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
//         <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendrier' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }




import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as AntProvider } from '@ant-design/react-native'; // ✅ Import du Provider

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import CalendarScreen from './screens/CalendarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AntProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
          <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendrier' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AntProvider>
  );
}




// import React from 'react';
// import LoginScreen from './screens/LoginScreen';

// export default function App() {
//   return <LoginScreen />;
// }
