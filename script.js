let students = JSON.parse(localStorage.getItem("students")) || [];


// Student Save
function saveStudent(){

let student = {

id: "DC" + String(students.length + 1).padStart(3,"0"),

name: document.getElementById("name").value,

father: document.getElementById("father").value,

mother: document.getElementById("mother").value,

mobile: document.getElementById("mobile").value,

address: document.getElementById("address").value,

admission: document.getElementById("admission").value,

dob: document.getElementById("dob").value,

regfee: document.getElementById("regfee").value,

monthlyfee: document.getElementById("monthlyfee").value

};


students.push(student);

localStorage.setItem("students", JSON.stringify(students));


alert("Student Saved Successfully");


window.location.reload();

}



// Student List Show

function displayStudents(){

let table="";


students.forEach(function(s){

table += `

<tr>

<td>${s.id}</td>

<td>${s.name}</td>

<td>${s.mobile}</td>

<td>₹${s.monthlyfee}</td>

</tr>

`;

});


let list=document.getElementById("studentList");

if(list){
list.innerHTML=table;
}

}



// Search Student

function searchStudent(){

let value=document.getElementById("search").value.toLowerCase();


let table="";


students.filter(function(s){

return s.name.toLowerCase().includes(value);

}).forEach(function(s){


table +=`

<tr>

<td>${s.id}</td>

<td>${s.name}</td>

<td>${s.mobile}</td>

<td>₹${s.monthlyfee}</td>

</tr>

`;

});


document.getElementById("studentList").innerHTML=table;


}


// Dashboard Update

function updateDashboard(){

let totalStudents = students.length;


let totalRegistration = 0;


students.forEach(function(s){

totalRegistration += Number(s.regfee || 0);

});


if(document.getElementById("students"))
document.getElementById("students").innerHTML=totalStudents;


if(document.getElementById("registration"))
document.getElementById("registration").innerHTML="₹"+totalRegistration;


}


// Page Load

displayStudents();

updateDashboard();
