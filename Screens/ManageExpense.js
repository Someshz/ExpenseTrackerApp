import { View, Text, StyleSheet, LayoutAnimation } from 'react-native';
import { useLayoutEffect, useState } from 'react';
import ManageButton from '../components/ManageButton';
import { GlobalStyles } from '../constants/Styles';
import { useContext } from 'react';
import { ExpensesContext } from '../Store/expenses-context';
import ManageInputExpense from '../components/ManageInputExpense';
import { deleteExpense, postExpenseData, updateExpense } from '../Store/http';
import Loading from '../components/Loading';
import ErrorOverlay from '../components/ErrorOverlay';


function ManageExpense({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const ExpenseContext = useContext(ExpensesContext);
    const expenseId = route.params?.expenseId;
    const isExpenseId = !!expenseId;

    const selectedExpenseData = ExpenseContext.expenses.find((expense) => {
        return expense.id === expenseId
    })


    

    async function deleteExpenseHandler() {
        setIsLoading(true)
        try {
            await deleteExpense(expenseId)
            ExpenseContext.deleteExpenses(expenseId)
            navigation.goBack()
        }
        catch (error) {
            setError("Could not delete expense please try again! "+error);
            setIsLoading(false);
        }
    }

    function cancelButtonHandler() {
        navigation.goBack()
    }

    async function editOrAddButtonHandler(expenseData) {
        setIsLoading(true)
        try {
            if (isExpenseId) {
                ExpenseContext.updateExpenses(expenseId, expenseData)
                await updateExpense(expenseId, expenseData)
            } else {
                const id = await postExpenseData(expenseData);
                console.log(id);
                ExpenseContext.addExpenses({ id, ...expenseData });
            }
            navigation.goBack()
        }
        catch (error) {
            setError("Could not add expense please try again! "+error);
            setIsLoading(false);
        }
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isExpenseId ? "Edit Expense" : "Add Expense",
        })
    }, [navigation, isExpenseId])

    if (error && !isLoading) {
        return <ErrorOverlay message={error} />
    }

    if (isLoading) {
        return <Loading />
    }    

    return (
        <View style={styles.rootContainer}>
            <ManageInputExpense onCancelClick={cancelButtonHandler} defaultValue={selectedExpenseData} onSubmit={editOrAddButtonHandler} submitText={isExpenseId ? 'Edit' : 'Add'} />
            <View >
                {isExpenseId && (<View style={styles.deleteButton}>
                    <ManageButton icon="trash" color={GlobalStyles.colors.error500} size={30} onPress={deleteExpenseHandler} />
                </View>)
                }
            </View>
        </View>
    )
}


export default ManageExpense;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttonStyle: {
        margin: 20
    },
    deleteButton: {
        borderTopWidth: 4,
        borderTopColor: 'white',
        marginHorizontal: 50,
        alignItems: 'center'
    }
})