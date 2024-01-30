
import axios from 'axios'


const URL='https://trackingexpense-9575a-default-rtdb.firebaseio.com'
export async function postExpenseData(expenseData){
    const response = await axios.post(URL+'/expenses.json',expenseData);
    const id=response.data.name
    return id;
  
}

export async function getExpenseData(){
        const response = await axios.get(URL+'/expenses.json');
        const expenses=[];

        for(const key in response.data){
          const expense={
            id:key,
            amount:response.data[key].amount,
            description : response.data[key].description,
            date : new Date(response.data[key].date),
          }
          expenses.push(expense);
        }
    
    return expenses;
}


export function deleteExpense(id){
  return axios.delete(URL+`/expenses/${id}.json`)
}

export function updateExpense(id,expenseData){
  return axios.put(URL+`/expenses/${id}.json`,expenseData)
}