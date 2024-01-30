
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpense from './Screens/ManageExpense';
import RecentExpenses from './Screens/RecentExpenses';
import AllExpenses from './Screens/AllExpenses';
import { GlobalStyles } from './constants/Styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import ManageButton from './components/ManageButton';
import ExpensesContextProvider from './Store/expenses-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabsHandler() {
  return <Tab.Navigator screenOptions={({ navigation }) => ({
    headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({ tintColor }) => { return <ManageButton icon="add" color={tintColor} size={24} onPress={() => { navigation.navigate('ManageExpense') }} /> }
  })}>
    <Tab.Screen name="Recent Expenses" component={RecentExpenses} options={{
      tabBarIcon: ({ color, size }) => (
        <Icon name="hourglass" size={size} color={color} />
      ),
    }} />
    <Tab.Screen name="All Expenses" component={AllExpenses} options={{
      tabBarIcon: ({ color, size }) => (
        <Icon name="calendar" size={size} color={color}  />
      ),
    }} />
  </Tab.Navigator>
}

function App() {
  return (
    <>
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: 'white'
          }}>
            <Stack.Screen name="Expense Overview" component={BottomTabsHandler} options={{
              headerShown: false
            }} />
            <Stack.Screen name="ManageExpense" component={ManageExpense} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

export default App;
