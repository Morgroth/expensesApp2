import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { TextInput, Text, View, StyleSheet, Pressable } from "react-native"

import { addMemberToExpense } from "../../../store/reducers/expensesReducer"



const AddRawExpenseMemberItem = forwardRef((props,ref) => {

    const [expenseAmount, setExpenseAmount] = useState('0')
    const [checkboxState, setCheckboxState ] = useState(false)
    //const [beginDispatchingExpense,setBeginDispatchingExpense] = useState(props.beginDispatchingExpense)

    //console.log(beginDispatchingExpense)

    useEffect(() => {
        props.newRefHandler(ref)
    },[])
    

    // useEffect(() => {
    //     if (beginDispatchingExpense === true){
    //         console.log('effect called')
    //         if (checkboxState === true ){
    //             console.log(checkboxState)
    //             //props.dispatchExpenses({'memberName': props.member,'amount': parseInt(expenseAmount),'expenseName':props.expenseName})
                
    //         }
    //         props.expensesReceived
    //     }
    // })

    console.log(ref)
    console.log('end')

    

    useImperativeHandle(ref, () => ({
        addExpenseImperative : () => {
            if (checkboxState) {
                props.expenseListCreator.bind(this,expenseAmount,props.member)
            }
            setExpenseAmount(0)
            setCheckboxState(false)
        }
    }))

    //props.dispatchExpenses(props.index,parseInt(expenseAmount))
    
    const expenseAmountHandler = (expenseAmount) => {
        setExpenseAmount(expenseAmount)
    }

    const checkboxStateHandler = () => {
        setCheckboxState(!checkboxState)
    }

    // console.log(ref.current)
    // console.log(1)


    return (
        <View>
            <View style={styles.flexRow}>
            <BouncyCheckbox isChecked={checkboxState} onPress={checkboxStateHandler} />
            <Text>{props.member}</Text>
            <TextInput onChangeText={expenseAmountHandler} value={expenseAmount}/>
            </View>
        </View>
    )
})

export default AddRawExpenseMemberItem

const styles = StyleSheet.create({
    flexRow:{
        flexDirection : 'row'
    }
})