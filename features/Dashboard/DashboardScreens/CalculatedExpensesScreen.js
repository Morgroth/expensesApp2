import { Text, View, FlatList } from "react-native"


import { useSelector } from "react-redux"
import { selectCalculatedExpenses } from "../../../store/reducers/expensesReducer"

const CalculatedExpensesScreen = () => {

    const calculatedExpenses = useSelector(selectCalculatedExpenses)

    const renderExpense = (itemdata) => {
        return(
            <View>
                <Text>{itemdata.item.member} : { itemdata.item.amount }</Text>
            </View>
        )
    }
    return(
        <Text>
            Calculated Expenses
            <FlatList
            data={calculatedExpenses}
            key={(new Date()).toString + Math.random().toString + Math.random().toString}
            renderItem = {renderExpense}
            />
        </Text>
    )
}

export default CalculatedExpensesScreen