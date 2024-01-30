import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     description: 'A pair of shoes',
//     amount: 59.99,
//     date: new Date('2021-12-19')
//   },
//   {
//     id: 'e2',
//     description: 'A pair of trousers',
//     amount: 89.29,
//     date: new Date('2022-01-05')
//   },
//   {
//     id: 'e3',
//     description: 'Some bananas',
//     amount: 5.99,
//     date: new Date('2021-12-01')
//   },
//   {
//     id: 'e4',
//     description: 'A book',
//     amount: 14.99,
//     date: new Date('2022-02-19')
//   },
//   {
//     id: 'e5',
//     description: 'Another book',
//     amount: 18.59,
//     date: new Date('2022-02-18')
//   },
//   {
//     id: 'e6',
//     description: 'Another book',
//     amount: 18.59,
//     date: new Date('2023-11-20')
//   },
//   {
//     id: 'e7',
//     description: 'Another book',
//     amount: 18.59,
//     date: new Date('2023-11-21')
//   },
  
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ description, amount, date }) => { },
  deleteExpenses: (id) => { },
  setExpenseData:(expenseData)=>{},
  updateExpenses: (id, {amount, date, description }) => { }
})

function manageExpenses(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state]
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload)
    case 'SET':
        const reverseData=action.payload.reverse();
        return reverseData;
    case "UPDATE":
      const index = state.findIndex((expense) => {
       return expense.id === action.payload.id;
      })
      const expensedata = state[index];
      const updatedData = { ...expensedata, ...action.payload.data };
      const data=[...state]
      data[index] = updatedData;
      return data;
    default:
      return state
  }
}

function ExpensesContextProvider({ children }) {

  const [expenseState, dispatch] = useReducer(manageExpenses, []);
  
  function addExpenses(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function updateExpenses(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
  }

  function deleteExpenses(id) {
    dispatch({ type: "DELETE", payload: id })
  }

  function setApiDate(expenseData){
    dispatch({ type: "SET", payload: expenseData })
  }

  const value = {
    expenses: expenseState,
    addExpenses: addExpenses,
    deleteExpenses: deleteExpenses,
    updateExpenses: updateExpenses,
    setExpenseData:setApiDate
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}


export default ExpensesContextProvider;
