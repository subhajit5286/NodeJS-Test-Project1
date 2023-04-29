var form=document.getElementById('addForm')
// var electronics = document.getElementById("electronics");
// var food = document.getElementById("food");
// var skincare = document.getElementById("skincare");
form.addEventListener('submit', saveExpense);//

function saveExpense(event){
    event.preventDefault();
    const amount = event.target.amount.value;
    const description= event.target.description.value;
    const category = event.target.category.value;

    const obj = {
        amount,
        description,
        category

    }

    axios.post("http://localhost:4000/order/add-order",obj)
       .then((response) => {
        showNewExpenseOnScreen(response.data.newExpense);
           console.log(response);
       })
       .catch((error) => {
        document.body.innerHTML =
          document.body.innerHTML + "<h4>Something went worng";
        console.log(error);
       })
    
}

window.addEventListener("DOMContentLoaded",() => {
    axios.get("http://localhost:4000/order/get-order")
       .then((response) => {
          console.log(response);

          for(var i=0; i<response.data.allExpenses.length; i++){
             showNewExpenseOnScreen(response.data.allExpenses[i]);
          }

          
       }).catch((error) => {
            console.log(error);
       });
});

function showNewExpenseOnScreen(expense){
    var items = expense.category.toLowerCase();
    const parentNode = document.getElementById(items);
    const childNode = `
    <li  id=${expense.id} class="list-group-item"> 
    Amount: ${expense.amount} Description: ${expense.description} Category: ${expense.category} 
    
    <button class="btn btn-danger  pull-right" onclick=deleteExpense('${expense.id}') > 
    Delete Expense</button>
       <button class="btn btn-warning pull-right" onclick=editExpense('${expense.amount}','${expense.description}','${expense.category}','${expense.id}')>
        Edit Expense</button>
   
     </li>
    `
    parentNode.innerHTML = parentNode.innerHTML + childNode;
}
//Edit Expense1
function editExpense(amount, description,category, expenseid) {
    console.log(category)
    document.getElementById("amount").value = amount;
    document.getElementById("description").value = description;
    document.getElementById("category").value = category;
    deleteExpense(expenseid);
}

// delete Expense
function deleteExpense(expenseid) {
    axios.delete(`http://localhost:4000/order/delete-order/${expenseid}`)
        .then((response) => {
           removeExpenseFromScreen(expenseid);
        })
        .catch((err) => console.log(err));
}

function removeExpenseFromScreen(expenseid) {

    const parentNode = document.getElementById("items");
    const childNodeToBeDeleted = document.getElementById(expenseid);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}