// balance field
const totalBalance = document.getElementById("total-balance");
const incomeBalance = document.getElementById("income-balance");
const expensiveBalance = document.getElementById("expensive-balance");
// input field and input button
const incomeTitle = document.getElementById("income-title");
const incomeAmount = document.getElementById("income-amount");
const expenseTitle = document.getElementById("expense-title");
const expenseAmount = document.getElementById("expense-amount");
const incomeBtn = document.getElementById("income-btn");
const expenseBtn = document.getElementById("expense-btn");
//menu button
const allMenu = document.getElementById("all-tab");
const incomeMenu = document.getElementById("income-tab");
const expensiveMenu = document.getElementById("expensive-tab");
// add item field
const addAll = document.getElementById("add-all-field");
let addIncome = document.getElementById("add-income-field");
const addExpense = document.getElementById("add-expense-field");
// data store in localStorage
let data_entry = [];
incomeBtn.addEventListener("click", () => {
  let entry = {
    type: "income",
    amount: parseInt(incomeAmount.value),
    title: incomeTitle.value,
  };
  data_entry.push(entry);
  showUI();
  inputFieldClear(incomeTitle, incomeAmount);
});
expenseBtn.addEventListener("click", () => {
  let entry = {
    type: "expense",
    amount: parseInt(expenseAmount.value),
    title: expenseTitle.value,
  };
  data_entry.push(entry);
  showUI();
  inputFieldClear(expenseTitle, expenseAmount);
});
// show UI
data_entry = JSON.parse(localStorage.getItem("entry")) || [];//get localStorage
function showUI() {
  let totalIncome = totalCalculate("income", data_entry);
  let totalExpense = totalCalculate("expense", data_entry);
  // show UI
  incomeBalance.innerText = "$" + totalIncome;
  expensiveBalance.innerText = "$" + totalExpense;
  totalBalance.innerText = "$" + (totalIncome - totalExpense);

  let data_entry_string = JSON.stringify(data_entry);
  localStorage.setItem("entry", data_entry_string);//set localStorage

  // show entry in html
  let income = ''
  let expense = ''
  let all = ''
  data_entry.map((dt, i)=>{
    if(dt){
      if(dt.type === 'income'){
        income += `<li class="d-flex align-items-center" id="${i}">
        <span>${dt.title}</span>
        <span class="ms-auto">$${dt.amount}</span>
        <span class="d-flex edit ms-auto text-white bold" id="edit">
          <i class="fas fa-edit" aria-hidden="true"></i>
        </span>
        <span class="d-flex delete ms-2 text-danger bold" id="remove">
          <i class="fas fa-times" aria-hidden="true"></i>
        </span>
      </li>`;
      all += `<li class="d-flex align-items-center" id="${i}">
      <span>${dt.title}</span>
      <span class="ms-auto">$${dt.amount}</span>
      <span class="d-flex delete ms-2 text-danger bold" id="remove">
        <i class="fas fa-times" aria-hidden="true"></i>
      </span>
    </li>`;
      }else if(dt.type === 'expense'){
        expense+= `<li class="d-flex align-items-center" id="${i}">
        <span>${dt.title}</span>
        <span class="ms-auto">$${dt.amount}</span>
        <span class="d-flex edit ms-auto text-white bold" id="edit">
          <i class="fas fa-edit" aria-hidden="true"></i>
        </span>
        <span class="d-flex delete ms-2 text-danger bold" id="remove">
          <i class="fas fa-times" aria-hidden="true"></i>
        </span>
      </li>`;
      all += `<li class="d-flex align-items-center" id="${i}">
      <span>${dt.title}</span>
      <span class="ms-auto">$${dt.amount}</span>
      <span class="d-flex delete ms-2 text-danger bold" id="remove">
        <i class="fas fa-times" aria-hidden="true"></i>
      </span>
    </li>`;
      }
    }
  })
  addIncome.innerHTML = income;
  addExpense.innerHTML = expense;
  addAll.innerHTML = all;
}
showUI();
//item delete and edit
addIncome.addEventListener('click', deleteEdit);
addExpense.addEventListener('click', deleteEdit);
addAll.addEventListener('click', deleteEdit);
function deleteEdit(e){
  let identify = e.target.parentNode
  let index = e.target.parentNode.parentNode
  if(identify.id === 'remove'){
    deleteItem(index)
  }else if(identify.id === 'edit'){
    editItem(index)
  }
}
// item delete
function deleteItem(index){
    data_entry.splice(index.id, 1)
  showUI()
}
// item edit
function editItem(index){
  let data = data_entry[index.id]
  if(data.type === 'income'){
    incomeTitle.value = data.title
    incomeAmount.value = data.amount
  }else if(data.type === 'expense'){
    expenseTitle.value = data.title
    expenseAmount.value = data.amount
  }
  deleteItem(index)
}
// total Calculate
function totalCalculate(type, data) {
  let sum = parseFloat(0);
  data.map((dt) => {
    if (dt.type === type) {
      let num = parseInt(dt.amount);
      sum += num;
    }
  });
  return sum;
}
// input field clear
function inputFieldClear(title, amount) {
  title.value = "";
  amount.value = "";
}
