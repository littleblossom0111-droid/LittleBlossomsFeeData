/* ==========================================
   Little Blossoms Day Care Management
   script.js - Part 1
========================================== */

// ---------- Local Storage ----------

let students = JSON.parse(localStorage.getItem("students")) || [];
let payments = JSON.parse(localStorage.getItem("payments")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// ---------- Save Data ----------

function saveData() {

    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("payments", JSON.stringify(payments));
    localStorage.setItem("expenses", JSON.stringify(expenses));

}

// ---------- Dashboard ----------

function updateDashboard(){

    document.getElementById("totalStudents").innerHTML = students.length;

    let totalMonthly = 0;
    let totalRegistration = 0;

    students.forEach(s=>{

        totalMonthly += Number(s.monthlyFee);

        if(s.registrationPaid)
            totalRegistration += Number(s.registrationFee);

    });

    let received = 0;

    payments.forEach(p=>{

        received += Number(p.amount);

    });

    let expense = 0;

    expenses.forEach(e=>{

        expense += Number(e.amount);

    });

    let pending = totalMonthly - received;

    if(pending < 0)
        pending = 0;

    document.getElementById("monthlyFees").innerHTML =
    "₹"+totalMonthly;

    document.getElementById("feesReceived").innerHTML =
    "₹"+received;

    document.getElementById("pendingFees").innerHTML =
    "₹"+pending;

    document.getElementById("registrationFees").innerHTML =
    "₹"+totalRegistration;

    document.getElementById("expenses").innerHTML =
    "₹"+expense;

    document.getElementById("netIncome").innerHTML =
    "₹"+((received+totalRegistration)-expense);

}

// ---------- Add Student ----------

function addStudent(name,parent,mobile,monthlyFee,registrationFee){

    let obj={

        id:Date.now(),

        name:name,

        parent:parent,

        mobile:mobile,

        monthlyFee:Number(monthlyFee),

        registrationFee:Number(registrationFee),

        registrationPaid:false

    };

    students.push(obj);

    saveData();

    updateDashboard();

    loadStudents();

}

// ---------- Student Table ----------

function loadStudents(){

    let tbody=document.getElementById("studentTableBody");

    if(!tbody) return;

    tbody.innerHTML="";

    students.forEach((s,index)=>{

        tbody.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${s.name}</td>

<td>${s.parent}</td>

<td>${s.mobile}</td>

<td>₹${s.monthlyFee}</td>

<td>

${s.registrationPaid
?
"<span style='color:green'>Paid</span>"
:
"<span style='color:red'>Pending</span>"
}

</td>

<td>

<button onclick="deleteStudent(${s.id})">

Delete

</button>

</td>

</tr>

`;

    });

}

// ---------- Delete Student ----------

function deleteStudent(id){

    if(confirm("Delete Student?")){

        students =
        students.filter(x=>x.id!=id);

        saveData();

        loadStudents();

        updateDashboard();

    }

}

// ---------- Registration Paid ----------

function registrationPaid(id){

    students.forEach(s=>{

        if(s.id==id){

            s.registrationPaid=true;

        }

    });

    saveData();

    loadStudents();

    updateDashboard();

}

// ---------- Navigation ----------

function showPage(id){

    let pages =
    document.querySelectorAll(".page");

    pages.forEach(p=>{

        p.style.display="none";

    });

    document.getElementById(id).style.display="block";

}

// ---------- Start ----------

window.onload=function(){

    updateDashboard();

    loadStudents();

    showPage("dashboard");

}