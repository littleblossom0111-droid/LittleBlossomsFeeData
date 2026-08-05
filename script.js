

import { database } from "./firebase.js";

alert("script.js loaded");
import { 
ref,
push,
set,
onValue,
remove,
update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


let students = [];

let editId = null;


// Page Load

loadStudents();



// SAVE / UPDATE STUDENT

function saveStudent(){


let student = {


name:document.getElementById("name").value,

father:document.getElementById("father").value,

mother:document.getElementById("mother").value,

mobile:document.getElementById("mobile").value,

address:document.getElementById("address").value,

admission:document.getElementById("admission").value,

dob:document.getElementById("dob").value,

regfee:document.getElementById("regfee").value,

regdate:document.getElementById("regdate").value,

monthlyfee:document.getElementById("monthlyfee").value


};




// UPDATE

if(editId){


update(ref(database,"students/"+editId),student)

.then(()=>{

alert("Student Updated Successfully");

location.reload();

});


}



// NEW SAVE

else{


let newRef = push(ref(database,"students"));


set(newRef,student)

.then(()=>{

alert("Student Saved Online Successfully");

location.reload();

});


}


}






// LOAD STUDENTS FROM FIREBASE


function loadStudents(){


onValue(ref(database,"students"),function(snapshot){


students=[];


snapshot.forEach(function(child){


students.push({

id:child.key,

...child.val()

});


});



displayStudents();


});


}







// DISPLAY STUDENTS


function displayStudents(){


let data="";


students.forEach(function(s){


data += `


<tr>

<td>${s.name}</td>

<td>${s.mobile}</td>

<td>₹${s.monthlyfee}</td>


<td>


<button class="edit" onclick="editStudent('${s.id}')">
✏️ Edit
</button>


<button class="delete" onclick="deleteStudent('${s.id}')">
🗑️ Delete
</button>


</td>


</tr>


`;


});



let list=document.getElementById("studentList");


if(list){

list.innerHTML=data;

}


}








// SEARCH


function searchStudent(){


let value=document.getElementById("search").value.toLowerCase();


let data="";


students.forEach(function(s){


if(s.name.toLowerCase().includes(value)){


data += `


<tr>

<td>${s.name}</td>

<td>${s.mobile}</td>

<td>₹${s.monthlyfee}</td>


<td>


<button onclick="editStudent('${s.id}')">
✏️ Edit
</button>


<button onclick="deleteStudent('${s.id}')">
🗑️ Delete
</button>


</td>


</tr>


`;

}


});



document.getElementById("studentList").innerHTML=data;


}








// EDIT STUDENT


function editStudent(id){


let pass=prompt("Enter Admin Password");


if(pass==localStorage.getItem("adminPassword")){


let s=students.find(x=>x.id==id);



editId=id;



document.getElementById("name").value=s.name || "";

document.getElementById("father").value=s.father || "";

document.getElementById("mother").value=s.mother || "";

document.getElementById("mobile").value=s.mobile || "";

document.getElementById("address").value=s.address || "";

document.getElementById("admission").value=s.admission || "";

document.getElementById("dob").value=s.dob || "";

document.getElementById("regfee").value=s.regfee || "";

document.getElementById("regdate").value=s.regdate || "";

document.getElementById("monthlyfee").value=s.monthlyfee || "";



document.getElementById("saveBtn").innerHTML="Update Student";


window.scrollTo(0,0);


}

else{

alert("Wrong Password");

}


}








// DELETE STUDENT


function deleteStudent(id){


let pass=prompt("Enter Admin Password");


if(pass==localStorage.getItem("adminPassword")){


if(confirm("Delete Student?")){


remove(ref(database,"students/"+id))

.then(()=>{

alert("Student Deleted");

});


}


}


else{

alert("Wrong Password");

}


}
window.saveStudent = saveStudent;
window.searchStudent = searchStudent;
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
