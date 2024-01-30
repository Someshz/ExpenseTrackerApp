import {View,Text, StyleSheet} from'react-native'
import { GlobalStyles } from '../constants/Styles';

function ExpensesSummary({expenses,expensesPeriod}){

    const expensesSum=expenses.reduce((sum,expense)=>{return sum+expense.amount},0)

    return <View style={Styles.summaryContainer}>
        <Text style={Styles.text}>{expensesPeriod}</Text>
        <Text style={Styles.text}>${expensesSum.toFixed(2)}</Text>
    </View>
}

export default ExpensesSummary;


const Styles=StyleSheet.create({
    summaryContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:GlobalStyles.colors.primary50,
        borderRadius:8,
        padding:10,
    },
    text:{
        fontSize:16,
        fontWeight:'bold',
        color:GlobalStyles.colors.primary500,
    }
})