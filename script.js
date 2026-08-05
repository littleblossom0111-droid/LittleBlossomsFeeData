
let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

displayStudents();


// Save / Update Student

function saveStudent(){

let student = {

id: editIndex == -1 ? "DC" + String(students.length + 1).padStart(3,"0") : students[editIndex].id,

name:document.getElementById("name").value,

father:document.getElementById("father").value,

mother:document.getElementById("mother").value,

mobile:document.getElementById("mobile").value,

address:document.getElementById("address").value,

admission:document.getElementById("admission").value,

dob:document.getElementById("dob").value,

regfee:document.getElementById("regfee").value,

monthlyfee:document.getElementById("monthlyfee").value

};


if(editIndex == -1){

students.push(student);

alert("Student Saved Successfully");

}else{

students[editIndex] = student;

alert("Student Updated Successfully");

editIndex = -1;

}


localStorage.setItem("students",JSON.stringify(students));

location.reload();

}



// Display Student

function displayStudents(){

let data="";


students.forEach(function(s,index){

data += `

<tr>

<td>${s.id}</td>

<td>${s.name}</td>

<td>${s.mobile}</td>

<td>₹${s.monthlyfee}</td>

<td class="action">

<button class="edit" onclick="editStudent(${index})">
✏️ Edit
</button>


<button class="delete" onclick="deleteStudent(${index})">
🗑️ Delete
</button>

</td>

</tr>

`;

});


document.getElementById("studentList").innerHTML=data;

}



// Search Student

function searchStudent(){

let value=document.getElementById("search").value.toLowerCase();

let data="";


students.forEach(function(s,index){

if(s.name.toLowerCase().includes(value)){


data += `

<tr>

<td>${s.id}</td>

<td>${s.name}</td>

<td>${s.mobile}</td>

<td>₹${s.monthlyfee}</td>

<td class="action">

<button class="edit" onclick="editStudent(${index})">
✏️ Edit
</button>


<button class="delete" onclick="deleteStudent(${index})">
🗑️ Delete
</button>

</td>

</tr>

`;

}

});


document.getElementById("studentList").innerHTML=data;

}



// Edit Student

function editStudent(index){

let pass = prompt("Enter Admin Password");

let savedPass = localStorage.getItem("adminPassword");


if(pass == savedPass){


let s = students[index];

editIndex = index;


document.getElementById("name").value=s.name;

document.getElementById("father").value=s.father;

document.getElementById("mother").value=s.mother;

document.getElementById("mobile").value=s.mobile;

document.getElementById("address").value=s.address;

document.getElementById("admission").value=s.admission;

document.getElementById("dob").value=s.dob;

document.getElementById("regfee").value=s.regfee;

document.getElementById("monthlyfee").value=s.monthlyfee;


window.scrollTo(0,0);


}else{

alert("Wrong Password");

}

}



// Delete Student

function deleteStudent(index){

let pass = prompt("Enter Admin Password");

let savedPass = localStorage.getItem("adminPassword");


if(pass == savedPass){


let confirmDelete = confirm("Delete Student?");


if(confirmDelete){

students.splice(index,1);

localStorage.setItem("students",JSON.stringify(students));

location.reload();

}


}else{

alert("Wrong Password");

}

}
