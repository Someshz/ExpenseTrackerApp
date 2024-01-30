import {View,Text, FlatList} from'react-native'
import ExpensesItem from './ExpensesItem';


function ExpensesList({expenses}){

    function expensesListHandler(itemData){
      return  <ExpensesItem {...itemData.item}/>
    }

    return <FlatList data={expenses} renderItem={expensesListHandler} keyExtractor={(item)=>item.id}/>
}

export default ExpensesList;