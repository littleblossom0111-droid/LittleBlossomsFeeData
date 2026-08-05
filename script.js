let students = JSON.parse(localStorage.getItem("students")) || [];

displayStudents();


// Save Student

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



// Edit (अगले स्टेप में पूरा करेंगे)

function editStudent(index){

alert("Edit Feature Next Step Me Add Hoga");

}



// Delete (अगले स्टेप में Password के साथ जोड़ेंगे)

function deleteStudent(index){

alert("Delete Feature Next Step Me Add Hoga");

}
