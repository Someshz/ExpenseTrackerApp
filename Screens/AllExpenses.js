import ExpensesOutput from '../components/ExpensesOutput'
import { useContext } from 'react';
import { ExpensesContext } from '../Store/expenses-context';



function AllExpenses() {
    const ExpenseContext = useContext(ExpensesContext);

    return (
        <ExpensesOutput period="All Pxpenses" expenses={ExpenseContext.expenses} fallBackText={'No Records Found!'}/>
    )
}


export default AllExpenses;