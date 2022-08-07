import { Pressable, View, Text } from "react-native"
import { FlatList, TextInput } from "react-native-gesture-handler"
import { useDispatch, useSelector, } from "react-redux"
import { useEffect, useState, useRef } from 'react'

import { addExpense, addMemberToExpense, setCalculatedExpenses } from "../../../store/reducers/expensesReducer"
import { selectMembersByGroupName } from "../../../store/reducers/groupsReducer"
import AddRawExpenseMemberItem from "./AddRawExpenseMemberItem"

const AddRawExpense = (props) => {

    const dispatch = useDispatch()
    const groupName = props.groupName
    const allGroupMembers = useSelector(state => selectMembersByGroupName(state,groupName))
    const [expenseName,setExpenseName] = useState('')
    const [expenseTotalAmount,setExpenseTotalAmount] = useState('')
    const [createdExpense,setCreatedExpense] = useState(false)
    const [expenseDetailed,setExpenseDetailed] = useState(false)

    let membersAndAmountList = []



    const RefList = () => {
        while ( i < a){
            refList.push(useRef())
            //console.log(refList)
            i++
        }
        i = 0
        console.log('reflist made')
        //console.log(refList)
        return null
    }

    const newRefList = []     

    const expenseNameHandler = (expense) => {
        setExpenseName(expense)
    }

    let a = allGroupMembers.length
    let i = 0
    let refList = []

    const newRefHandler = (ref) => {
        newRefList.append(ref)
    }
    

    const expenseTotalAmountHandler = (expenseAmount) => {
        setExpenseTotalAmount(expenseAmount)
    }

    const expenseListCreator = (amount,member) => {
        dispatch(addMemberToExpense({amount:amount,member:member,expenseName:expense}))
        membersAndAmountList.push({amount:amount,member:member})
    }

    const addExpenseToList = (ref) => {
        console.log('Problem here')
        console.log(ref)
        ref.current.addExpenseImperative()
    }


    const fillExpense = () => {
        console.log('pressed')
        setExpenseDetailed(true)
        setCreatedExpense(false)
        console.log('Dispatching expenses')
        while ( i < a) {
            addExpenseToList(newRefList[i])
            i++
        }
        console.log('Dispatched expenses')
        console.log('Calculating expenses')
        dispatch(setCalculatedExpenses({totalAmount:expenseTotalAmount,membersAndAmount:membersAndAmountList}))
        setExpenseName('')
        setExpenseTotalAmount('')
        setExpenseDetailed(false)
        console.log('resetted')
        
    }


    const renderMemberItem = (itemdata) => {
        const member = itemdata.item
        return(
            <View>
                <AddRawExpenseMemberItem
                member = {member}
                //beginDispatchingExpense = {expenseDetailed}
                expenseListCreator = {expenseListCreator}
                //expensesReceived = {expensesReceivedHandler}
                //index={itemdata.index}
                ref={refList[item.index]}
                newRefHandler = {newRefHandler}
                />
            </View>
        )
    }


    const ExpenseInitializer = () => {
        if (!createdExpense){
            return(
                <View>
                    <Text>Fill Details for New Expense</Text>
                    <TextInput onChangeText={expenseNameHandler} value={expenseName} placeholder='Expense Name'/>
                    <TextInput onChangeText={expenseTotalAmountHandler} value={expenseTotalAmount} placeholder='Total Amount'/>
                    <Pressable onPress={CreateNewExpense}>
                        <Text>Create new Expense</Text>
                    </Pressable>
            </View>
            )
        } else {
            return null
        }
    }

    const ExpenseFiller = () => {
        //console.log(createdExpense)
        if (createdExpense){
            return(
                <View>
                    <RefList/>
                    <Text>Fill Expense Details</Text>
                    <FlatList
                        data={allGroupMembers}
                        keyExtractor={(member) => member}
                        renderItem={renderMemberItem}
                        />
                    <Pressable onPress={fillExpense}>
                        <Text>Add expense</Text>
                    </Pressable>    
            </View>
            )
        } else {
            return null
        }
    }

    //console.log(expenseMembersAndAmountList)

    const CreateNewExpense = () => {
        dispatch(addExpense({'expenseName':expenseName,'totalAmount':parseInt(expenseTotalAmount)}))
        console.log('Expense Created')
        
        setCreatedExpense(true)
        
    }


    return(
        <View>
            
            <ExpenseInitializer/>
            <ExpenseFiller/>
            
        </View>
    )
}

export default AddRawExpense