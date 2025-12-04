let editId=-1;
const form = document.getElementById('form1');
let formData = [
    {
        firstName:"Sourabh",
        lastName:"Khera",
        email:"sourabhkhera11@gmail.com",
        phone:"9876543210",
        gender:"male",
        interest2:"music",
        interest1:"sports",
        DOB:"2003-10-31",
        city:"New Delhi",
        address:"123, ABC Street, New Delhi",
        password:"Sourabh@123" 
    },
    {
        firstName:"Abhinav",
        lastName:"Goyal",
        email:"abhinavgoyal@gmail.com",
        phone:"8700134518",
        gender:"male",
        interest2:"music",
        interest3:"movies",
        DOB:"2003-10-29",
        city:"Mumbai",
        address:"B Block Noida",
        password:"Abhinav@123" 
    },
    {
        firstName:"Tushar",
        lastName:"Verma",
        email:"tushar@gmail.com",
        phone:"9834567012",
        gender:"female",
        interest2:"music",
        interest4:"politics",
        DOB:"2002-12-02",
        city:"Chennai",
        address:"XYZ Colony Shahdara",
        password:"Tushar@123" 
    },
    {
        firstName:"Deepanshu",
        lastName:"Punj",
        email:"deepanshu@gmail.com",
        phone:"8834567012",
        gender:"male",
        interest1:"sports",
        interest4:"politics",
        DOB:"2004-03-21",
        city:"Chennai",
        address:"PQR Colony Uttam Nagar",
        password:"Deepanshu@123" 
    }
];
function renderData(){
    formData.forEach((element ,index)=>{
        const table = document.getElementById("tbody");
        const original = document.getElementById('-2');
        const clone = original.cloneNode(true);
        
        clone.id = index;
        clone.style.display = 'table-row'; 
        const Interests = [
            element.interest1,
            element.interest2,
            element.interest3,
            element.interest4
        ].filter(Boolean).join(", ");
        clone.querySelector(".firstNamee").innerText = element.firstName.trim();
        clone.querySelector(".lastNamee").innerText = element.lastName.trim();
        clone.querySelector(".emaill").innerText = element.email.trim();
        clone.querySelector(".phonee").innerText = element.phone.trim();
        clone.querySelector(".genderr").innerText = element.gender;
        clone.querySelector(".Interestss").innerText = Interests;
        clone.querySelector(".dobb").innerText = element.DOB.trim();  
        clone.querySelector(".cityy").innerText = element.city.trim();
        clone.querySelector(".addresss").innerText = element.address.trim();
        clone.querySelector(".passwordd").innerText = element.password.trim();
        
        table.appendChild(clone);
    })
}
window.onload=function(){
    renderData();
}
function sortBy(event){
    const choiceId=event.target.options[event.target.selectedIndex].id;
    const field=event.target.value;
    const tableBody=document.getElementById("tbody");
    tableBody.innerHTML="";
    switch(choiceId){
        case "FNA-Z":
        case "LNA-Z":
        case "CityA-Z":
            formData.sort((a,b)=> a[field].localeCompare(b[field]));
            break;
        case "FNZ-A":
        case "LNZ-A":
        case "CityZ-A":
            formData.sort((a,b)=>b[field].localeCompare(a[field]));
            break;
        case "DOBO-Y":
            formData.sort((a, b) => {
            return new Date(a.DOB) - new Date(b.DOB);
            });
            break;
        case "DOBY-O":
            formData.sort((a, b) => {
            return new Date(b.DOB) - new Date(a.DOB);
            });
            break;
    }
    renderData();
}
function formSubmit(e){
    const submitButton=document.getElementById("submitButton");
    e.preventDefault();
    if(validFirstName() && validLastName() && validateEmail() && validatePhone() && validateGender() && validateInterests() && validateDob() && validateCity() && validateAdress() && validateRightPassword() && validatePassword()){
        
        alert("Form submitted successfully!");
        
        const data = new FormData(form);
        let entry = {};
        console.log(data.entries());
        for (let [name, value] of data.entries()) {
            entry[name] = value;
        }
        console.log(entry);
        const Interests = [
            entry.interest1,
            entry.interest2,
            entry.interest3,
            entry.interest4
        ].filter(Boolean).join(", ");

        if(submitButton.innerText==="Edit Details" && editId!=-1){
            submitButton.innerText="Submit";
            const row=document.getElementById(editId);
            row.querySelector(".firstNamee").innerText = entry.firstName.trim();
            row.querySelector(".lastNamee").innerText = entry.lastName.trim();
            row.querySelector(".emaill").innerText = entry.email.trim();
            row.querySelector(".phonee").innerText = entry.phone.trim();
            row.querySelector(".genderr").innerText = entry.gender;
            row.querySelector(".Interestss").innerText = Interests;
            row.querySelector(".dobb").innerText = entry.DOB.trim();  
            row.querySelector(".cityy").innerText = entry.city.trim();
            row.querySelector(".addresss").innerText = entry.address.trim();
            row.querySelector(".passwordd").innerText = entry.password.trim();

            // formData[editId]
            const editEntry=formData[editId];
            editEntry.firstName= entry.firstName.trim();
            editEntry.lastName= entry.lastName.trim();
            editEntry.email= entry.email.trim();
            editEntry.phone= entry.phone.trim();
            editEntry.gender= entry.gender;
            editEntry.DOB= entry.DOB.trim();  
            editEntry.city= entry.city.trim();
            editEntry.address= entry.address.trim();
            editEntry.password= entry.password.trim();
            const intNames=['interest1','interest2','interest3','interest4'];
            for(let intt of intNames){
                if(entry.intt){
                    formData[intt]=entry.intt
                }
                else{
                    formData[intt]=""
                }
            }
            editId=-1;
        }
        else{
            formData.push(entry);
            const table = document.getElementById('tbody');
            const original = document.getElementById('-2');
            const clone = original.cloneNode(true);
        
            clone.id = formData.length - 1;
            clone.style.display = 'table-row'; 
        
            clone.querySelector(".firstNamee").innerText = entry.firstName.trim();
            clone.querySelector(".lastNamee").innerText = entry.lastName.trim();
            clone.querySelector(".emaill").innerText = entry.email.trim();
            clone.querySelector(".phonee").innerText = entry.phone.trim();
            clone.querySelector(".genderr").innerText = entry.gender;
            clone.querySelector(".Interestss").innerText = Interests;
            clone.querySelector(".dobb").innerText = entry.DOB.trim();  
            clone.querySelector(".cityy").innerText = entry.city.trim();
            clone.querySelector(".addresss").innerText = entry.address.trim();
            clone.querySelector(".passwordd").innerText = entry.password.trim();
        
            table.appendChild(clone);
        }
        form.reset();
        const fields = document.querySelectorAll('.fields');
        fields.forEach(field => {
            field.style.borderColor = '';
        });
        const city=document.getElementById("city");
        city.style.borderColor='';
        const confirmPassword=document.querySelector(".confirmPassword .error-message");
        confirmPassword.innerText='';
    }
};

function validateAdress(){
    const addressInput=document.getElementById("address");
    const addressValue=addressInput.value.trim();
    const errorMessage=addressInput.nextElementSibling;
    if(addressValue===""){
        errorMessage.innerText="This field is required.";
        addressInput.style.borderColor="red";
        return false;
    }else{
        errorMessage.innerText="";
        addressInput.style.borderColor="#5cb85c";
        return true;
    }
}
function handleError(errorMessage,Input){
    errorMessage.innerText = "This field is required.";
    Input.style.borderColor = "red";
}
function handleSuccess(errorMessage,Input){
    errorMessage.innerText = "";
    Input.style.borderColor = "#5cb85c";
}
function validFirstName(){
    const nameInput=document.getElementById("firstName");
    const nameValue=nameInput.value.trim();
    const errorMessage=nameInput.nextElementSibling;
    const namePattern=/^[A-Za-z]+$/;
    if(nameValue === ""){
        handleError(errorMessage,nameInput);
        return false;
    }
    else if(!namePattern.test(nameValue)){ 
        errorMessage.innerText = "Name should contain only alphabets.";
        nameInput.style.borderColor = "red";
        return false;
    }
    else{
        handleSuccess(errorMessage,nameInput)
        return true;
    }
}
function validLastName(){
    const nameInput=document.getElementById("lastName");
    const nameValue=nameInput.value.trim();
    const errorMessage=nameInput.nextElementSibling;
    const namePattern=/^[A-Za-z]+$/;
    if(nameValue === ""){
        handleError(errorMessage,nameInput);
        return false;
    }
    else if(!namePattern.test(nameValue)){ 
        errorMessage.innerText = "Name should contain only alphabets.";
        nameInput.style.borderColor = "red";
        return false;
    }
    else{
        handleSuccess(errorMessage,nameInput);
        return true;
    }
}
function validateEmail(){
    const emailInput=document.getElementById("email");
    const emailValue = emailInput.value.trim();
    const errorMessage=document.querySelector(".email .error-message");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailValue === ""){
        handleError(errorMessage,emailInput);
        return false;
    }
    if(!emailPattern.test(emailValue)){
        errorMessage.innerText = "Please enter a valid email address.";
        emailInput.style.borderColor = "red";
        return false;
    }else{
        handleSuccess(errorMessage,emailInput)
        return true;
    }
}
function validatePhone(){
    const phoneInput=document.getElementById("phone");
    const phoneValue = phoneInput.value.trim();
    const errorMessage=phoneInput.nextElementSibling;
    const phonePattern = /^\d{10}$/;
    if(phoneValue === ""){
        handleError(errorMessage,phoneInput)
        return false;
    }
    if(!phonePattern.test(phoneValue)){
        phoneInput.nextElementSibling.innerText = "Please enter a valid 10-digit phone number.";
        phoneInput.style.borderColor = "red";
        return false;
    }else{
        handleSuccess(errorMessage,phoneInput)
        return true;
    }
}
function validateGender() {
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const errorMessage = document.querySelector(".gender .error-message");

    const isChecked = [...genderInputs].some(input => input.checked);

    if (!isChecked) {
        errorMessage.innerText = "Please select your gender";
        errorMessage.style.color = "red";
        return false;
    }
    errorMessage.innerText = "";
    return true;
}
function validateInterests(){
    const interestInputs = document.querySelectorAll('input[type="checkbox"]');
    const errorMessage = document.querySelector(".Interests .error-message");

    const isChecked = [...interestInputs].some(input => input.checked);

    if (!isChecked) {
        errorMessage.innerText = "Please select at least one interest";
        errorMessage.style.color = "red";
        return false;
    }
    errorMessage.innerText = "";
    return true;
}
function validateDob() {
    const dobInput = document.getElementById("dob");
    const errorMessage = document.querySelector(".dob .error-message");

    const dobValue = dobInput.value;

    if (!dobValue) {
        errorMessage.innerText = "Please select your date of birth";
        errorMessage.style.color = "red";
        dobInput.style.borderColor = "red";
        return false;
    }

    const dobDate = new Date(dobValue);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    let finalAge = age;
   
    if (finalAge < 18) {
        errorMessage.innerText = "Age must be at least 18 years";
        errorMessage.style.color = "red";
        dobInput.style.borderColor = "red";
        return false;
    }

    if (finalAge > 120) {
        errorMessage.innerText = "Age must be less than 120 years";
        errorMessage.style.color = "red";
        dobInput.style.borderColor = "red";
        return false;
    }
    errorMessage.innerText = "";
    dobInput.style.borderColor = "#5cb85c";
    return true;
}

function validateCity(){
    const cityInput=document.getElementById("city");
    const cityValue=cityInput.value.trim();
    const errorMessage=document.querySelector(".city .error-message");
    if(cityValue===""){
        handleError(errorMessage,cityInput);
        return false;
    }else{
        handleSuccess(errorMessage,cityInput)
        return true;
    }
}
function validateRightPassword(){
    const passwordInput=document.getElementById("password");
    const passwordValue=passwordInput.value.trim();
    const errorMessage=passwordInput.nextElementSibling;

    const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(passwordValue===""){
        handleError(errorMessage,passwordInput)
        return false;
    }
    if(!passwordPattern.test(passwordValue)){
        errorMessage.innerText="Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
        passwordInput.style.borderColor="red";
        return false;
    }else{
        handleSuccess(errorMessage,passwordInput)
        return true;
    }
}
function validatePassword(){
    const passwordInput=document.getElementById("password");
    const confirmPasswordInput=document.getElementById("confirmPassword");
    const errorMessage=confirmPasswordInput.nextElementSibling;
    if(passwordInput.value===""){
        handleError(errorMessage,passwordInput)
        errorMessage.style.color="red";
        return false;
    }
    if(passwordInput.value!==confirmPasswordInput.value){
        errorMessage.innerText="Passwords do not match.";
        errorMessage.style.color="red";
        confirmPasswordInput.style.borderColor="red";
        return false;
    }else{
        errorMessage.innerText="Passwords match.";
        errorMessage.style.color="#5cb85c";
        confirmPasswordInput.style.borderColor="#5cb85c";
        return true;
    }
}

function deleteRow(event){
    const rowid=event.target.closest("tr").id;
    const row=document.getElementById(rowid);
    row.remove();
    formData.splice(rowid,1);
}

function editRow(event){
    const rowid=event.target.closest("tr").id;
    editId=rowid;
    const row=document.getElementById(rowid);
    const entry=formData[rowid];
    console.log(entry);
    // console.log(row.querySelector(".firstNamee").innerHTML);
    console.log(entry.firstName);
    document.getElementById("firstName").value=entry.firstName;
    document.getElementById("lastName").value=entry.lastName;
    document.getElementById("email").value=entry.email;
    document.getElementById("phone").value=entry.phone;
    document.getElementById("dob").value=entry.DOB;
    document.getElementById("city").value=entry.city;
    document.getElementById("address").value=entry.address;
    document.getElementById("password").value=entry.password;
    document.getElementById("confirmPassword").value=entry.password;
    document.querySelector(`input[name="gender"][value="${entry.gender}"]`).checked = true;
    const interests = ['interest1', 'interest2', 'interest3', 'interest4'];
    interests.forEach(interest => {
        if (entry[interest]) {
            document.querySelector(`input[name="${interest}"][value="${entry[interest]}"]`).checked = true;
        } else {
            document.querySelector(`input[name="${interest}"]`).checked = false;
        }
    });
    const submitButton=document.getElementById("submitButton");
    submitButton.innerText="Edit Details";
    // formData.splice(rowid,1);
    // delete formData[rowid];
    // row.remove();
}

// console.log("Before timeout");
// setTimeout(() => {
//     console.log("Hello after 2 seconds");
// }, -2);
// console.log("after timeout ");

