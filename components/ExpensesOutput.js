
import {StyleSheet, View, Text} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../constants/Styles';



function ExpensesOutput({expenses,period,fallBackText}){

    const content= expenses.length > 0 ?  <ExpensesList expenses={expenses}/> : <Text style={styles.fallBackTextStyle}> {fallBackText}</Text>

return (
    <View style={styles.rootConatiner}>
        <ExpensesSummary  expenses={expenses} expensesPeriod={period}/>
        {content}
    </View>
)

}

export default ExpensesOutput;


const styles=StyleSheet.create({
    rootConatiner:{
        flex:1,
        backgroundColor:GlobalStyles.colors.primary800,
        padding:10,
    },
    fallBackTextStyle:{
        color:'white',
        fontSize:20,
        textAlign:'center',
        marginTop:100
    }
})