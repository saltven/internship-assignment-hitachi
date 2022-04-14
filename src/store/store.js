import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  IncomeState: [{src: 'icon-investment', categoryName: ' Salary'}],
  ExpensesState: [{src: 'icon-money', categoryName: ' Investment'}],
  OverallState: [{jan: 0, feb: 0, march: 0.00, april: 0.00, may: 0.00, june: 0.00, july: 0.00, aug: 0.00, sept: 0.00, oct: 0.00, nov: 0.00, dec: 0.00}],
  SelectedMonthState: 'jan',
  IncomeExpensesState: [{jan: [{src: 'icon-money', subCategoryName: ' Sample', moneyCategory: '-10'}, {src: 'icon-investment', subCategoryName: ' Sample2', moneyCategory: '+10'}], feb: [], march: [], april: [], may: [], june: [], july: [], aug: [], sept: [], oct: [], nov: [], dec: []}],
  TotalIncomeState: [{jan: 0, feb: 0, march: 0.00, april: 0.00, may: 0.00, june: 0.00, july: 0.00, aug: 0.00, sept: 0.00, oct: 0.00, nov: 0.00, dec: 0.00}],
  TotalExpensesState: [{jan: 0, feb: 0, march: 0.00, april: 0.00, may: 0.00, june: 0.00, july: 0.00, aug: 0.00, sept: 0.00, oct: 0.00, nov: 0.00, dec: 0.00}],
  
}

const getters = {
  TotalIncome: state => state.TotalIncomeState,
  TotalExpenses: state => state.TotalExpensesState,
  Overall: state => state.OverallState,
  SelectedMonth: state => state.SelectedMonthState,
  ExpensesArray: state => state.ExpensesState,
  IncomeArray: state => state.IncomeState,
  IncomeExpensesArray: state => state.IncomeExpensesState,
}

const mutations = {
  TotalIncomeMutation: (state, payload) => { state.TotalIncomeState = payload },
  TotalExpensesMutation: (state, payload) => { state.TotalExpensesState = payload },
  OverallMutation: (state, payload) => { state.OverallState = payload },
  SelectedMonthMutation: (state, payload) => { state.SelectedMonthState = payload },
  ExpensesMutation: (state, payload) => { state.ExpensesState = payload },
  IncomeMutation: (state, payload) => { state.IncomeState = payload },
  IncomeExpensesMutation: (state, payload) => { state.IncomeExpensesState = payload },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
})
