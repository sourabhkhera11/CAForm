let formData = [];
const form = document.getElementById('form1');
let editId=-1;
form.addEventListener('submit', (e) => {
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
            const table = document.getElementById('dataTable');
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
});

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
function validFirstName(){
    const nameInput=document.getElementById("firstName");
    const nameValue=nameInput.value.trim();
    const errorMessage=nameInput.nextElementSibling;
    const namePattern=/^[A-Za-z]+$/;
    if(nameValue === ""){
        errorMessage.innerText = "This field is required.";
        nameInput.style.borderColor = "red";
        return false;
    }
    else if(!namePattern.test(nameValue)){ 
        errorMessage.innerText = "Name should contain only alphabets.";
        nameInput.style.borderColor = "red";
        return false;
    }
    else{
        errorMessage.innerText = "";
        nameInput.style.borderColor = "#5cb85c";
        return true;
    }
}
function validLastName(){
    const nameInput=document.getElementById("lastName");
    const nameValue=nameInput.value.trim();
    const errorMessage=nameInput.nextElementSibling;
    const namePattern=/^[A-Za-z]+$/;
    if(nameValue === ""){
        errorMessage.innerText = "This field is required.";
        nameInput.style.borderColor = "red";
        return false;
    }
    else if(!namePattern.test(nameValue)){ 
        errorMessage.innerText = "Name should contain only alphabets.";
        nameInput.style.borderColor = "red";
        return false;
    }
    else{
        errorMessage.innerText = "";
        nameInput.style.borderColor = "#5cb85c";
        return true;
    }
}
function validateEmail(){
    const emailInput=document.getElementById("email");
    const emailValue = emailInput.value.trim();
    const errorMessage=document.querySelector(".email .error-message");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailValue === ""){
        errorMessage.innerText = "This field is required.";
        emailInput.style.borderColor = "red";
        return false;
    }
    if(!emailPattern.test(emailValue)){
        errorMessage.innerText = "Please enter a valid email address.";
        emailInput.style.borderColor = "red";
        return false;
    }else{
        errorMessage.innerText = "";
        emailInput.style.borderColor = "#5cb85c";
        return true;
    }
}

function validatePhone(){
    const phoneInput=document.getElementById("phone");
    const phoneValue = phoneInput.value.trim();
    const phonePattern = /^\d{10}$/;
    if(phoneValue === ""){
        phoneInput.nextElementSibling.innerText = "This field is required.";
        phoneInput.style.borderColor = "red";
        return false;
    }
    if(!phonePattern.test(phoneValue)){
        phoneInput.nextElementSibling.innerText = "Please enter a valid 10-digit phone number.";
        phoneInput.style.borderColor = "red";
        return false;
    }else{
        phoneInput.nextElementSibling.innerText = "";
        phoneInput.style.borderColor = "#5cb85c";
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
        errorMessage.innerText="This field is required.";
        cityInput.style.borderColor="red";
        return false;
    }else{
        errorMessage.innerText="";
        cityInput.style.borderColor="#5cb85c";
        return true;
    }
}
function validateRightPassword(){
    const passwordInput=document.getElementById("password");
    const passwordValue=passwordInput.value.trim();
    const errorMessage=passwordInput.nextElementSibling;

    const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(passwordValue===""){
        errorMessage.innerText="This field is required.";
        passwordInput.style.borderColor="red";
        return false;
    }
    if(!passwordPattern.test(passwordValue)){
        errorMessage.innerText="Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
        passwordInput.style.borderColor="red";
        return false;
    }else{
        errorMessage.innerText="";
        passwordInput.style.borderColor="#5cb85c";
        return true;
    }
}
function validatePassword(){
    const passwordInput=document.getElementById("password");
    const confirmPasswordInput=document.getElementById("confirmPassword");
    const errorMessage=confirmPasswordInput.nextElementSibling;
    if(passwordInput.value===""){
        errorMessage.innerText="This field is required.";
        confirmPasswordInput.style.borderColor="red";
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

