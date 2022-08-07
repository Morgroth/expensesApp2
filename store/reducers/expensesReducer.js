import { createSlice } from "@reduxjs/toolkit"

const expenseSlice = createSlice({
    name : 'expenses',
    initialState : {
        expensesData :[],
        //[{group:'',expenseNames:[{'expenseName':'Test','membersAndAmount':[{'memberName':'','amount': 0}],'totalAmount':0}],calculatedExpenses: []}],
        expensesDataForActiveGroup : {},
        group : ''
        
    },
    reducers :{
        addExpense:(state,action) => {
            state.expensesDataForActiveGroup.expenseNames.push({'expenseName':action.payload.expenseName,'membersAndAmount':[],'totalAmount':action.payload.totalAmount})
        },
        addMemberToExpense : (state,action) => {
            const expensePos = state.expensesDataForActiveGroup.expenseNames.indexOf(expense => expense.expenseName === action.payload.expenseName)
            //const expensePos = state.expensesDataForActiveGroup.expenseNames.indexOf(expense[0])
            state.expensesDataForActiveGroup.expenseNames[expensePos].membersAndAmount.push({'member':action.payload.member,'amount':action.payload.amount})
        },
        initialiseExpensesData: (state,action) => {
            state.expensesData.push({'group':action.payload.groupName,expenseNames:[],calculatedExpenses:[]})
        },
        initialiseCalculatedExpensesMembers: (state,action) => {
            if (state.expensesDataForActiveGroup.calculatedExpenses){
            state.expensesDataForActiveGroup.calculatedExpenses.push({'member':action.payload.member,'amount':0})
            } else {
                state.expensesDataForActiveGroup.calculatedExpenses = []
                state.expensesDataForActiveGroup.calculatedExpenses.push({'member':action.payload.member,'amount':0})
            }
        },
        setCalculatedExpenses : (state,action) => {
            let membersAndAmount = action.payload.membersAndAmount
            let a = membersAndAmount.length
            let amountToBePaid = action.payload.totalAmount/a
            let i = 0
            while ( i < a ) {
                let memberIndex = state.expensesDataForActiveGroup.calculatedExpenses.findIndex(memberItem => memberItem.member === membersAndAmount[i].member)
                state.expensesDataForActiveGroup.calculatedExpenses[memberIndex].amount+=(amountToBePaid-membersAndAmount[i].amount)
                i++
            }
        },
        setActiveGroup : ( state, action ) => {
            state.group = action.payload.groupName
            state.expensesDataForActiveGroup = state.expensesData.find(expenses => expenses.group === action.payload.groupName)
        }
    }
})

export const addExpense = expenseSlice.actions.addExpense
export const addMemberToExpense = expenseSlice.actions.addMemberToExpense
export const initialiseCalculatedExpensesMembers = expenseSlice.actions.initialiseCalculatedExpensesMembers
export const setCalculatedExpenses = expenseSlice.actions.setCalculatedExpenses
export const setActiveGroup = expenseSlice.actions.setActiveGroup
export const initialiseExpensesData = expenseSlice.actions.initialiseExpensesData

export const selectExpensesByGroupName = (state,groupName) => state.expenses.expensesDataForActiveGroup.expensesData.find(expenses => expenses.group === groupName)
export const selectExpenseByexpenseName = ( state, expenseName) => state.expenses.expensesDataForActiveGroup.expenseNames.find(expense => expense.expenseName === expenseName)
export const selectCalculatedExpenses = (state) => state.expenses.expensesDataForActiveGroup.calculatedExpenses


export default expenseSlice.reducer


