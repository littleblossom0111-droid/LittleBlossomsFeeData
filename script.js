let students = JSON.parse(localStorage.getItem("students")) || [];

displayStudents();


function saveStudent(){

let student = {

id:"DC" + String(students.length + 1).padStart(3,"0"),

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


students.push(student);

localStorage.setItem("students",JSON.stringify(students));

alert("Student Saved Successfully");

location.reload();

}



function displayStudents(){

let data="";

students.forEach(function(s){

data += `

<tr>
<td>${s.id}</td>
<td>${s.name}</td>
<td>${s.mobile}</td>
<td>₹${s.monthlyfee}</td>
</tr>

`;

});

document.getElementById("studentList").innerHTML=data;

}



function searchStudent(){

let value=document.getElementById("search").value.toLowerCase();

let data="";


students.filter(function(s){

return s.name.toLowerCase().includes(value);

}).forEach(function(s){

data += `

<tr>
<td>${s.id}</td>
<td>${s.name}</td>
<td>${s.mobile}</td>
<td>₹${s.monthlyfee}</td>
</tr>

`;

});


document.getElementById("studentList").innerHTML=data;

}
