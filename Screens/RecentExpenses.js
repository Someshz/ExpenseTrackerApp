
import ExpensesOutput from '../components/ExpensesOutput'
import { useContext, useState, useEffect } from 'react';
import { ExpensesContext } from '../Store/expenses-context';
import { getDateMinusDays } from '../util/DateFormatter';
import { getExpenseData } from '../Store/http';
import Loading from '../components/Loading';
import ErrorOverlay from '../components/ErrorOverlay';
function RecentExpenses() {
    const ExpenseContext = useContext(ExpensesContext);
    const [isLoading, setIsLoading]= useState(true);
    const [error,setError] = useState();
    useEffect(()=>{
        async function getData(){
            try{
                const response=await getExpenseData();
                ExpenseContext.setExpenseData(response)
            }
            catch(error){
                setError('could not fetch expenses '+error);
            }
            setIsLoading(false);
        }
        getData();
    }
    ,[])

    

    const RecentExpenses=ExpenseContext.expenses.filter((expense)=>{
            const today=new Date();
            const last7Days= getDateMinusDays(today,7)
            return (expense.date >= last7Days) && (expense.date<=today) ;
    })


    if(error && !isLoading ){
        return <ErrorOverlay message={error}/>
    }

    if(isLoading){
        return <Loading/>
    }

    return (
            <ExpensesOutput period="Last 7 Days" expenses={RecentExpenses} fallBackText={'No Records Found for last 7 Days'}/> 
         
    )
}


export default RecentExpenses;