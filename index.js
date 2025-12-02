let formData = [];
const form = document.getElementById('form1');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    alert("Form submitted successfully!");

    const data = new FormData(form);
    let entry = {};
    console.log(data.entries());
    for (let [name, value] of data.entries()) {
        entry[name] = value;
    }

    formData.push(entry);

    const Interests = [
        entry.interest1,
        entry.interest2,
        entry.interest3,
        entry.interest4
    ].filter(Boolean).join(", ");

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
    form.reset();
});

function validateEmpty(event){
    const inputValue = event.target.value.trim();
    if(inputValue === ""){
        event.target.nextElementSibling.innerText = "This field is required.";
        event.target.style.borderColor = "red";
    }else{
        event.target.nextElementSibling.innerText = "";
        event.target.style.borderColor = "#5cb85c";

    }
}

function validateEmail(event){
    const emailValue = event.target.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(emailValue)){
        event.target.nextElementSibling.innerText = "Please enter a valid email address.";
        event.target.style.borderColor = "red";
    }else{
        event.target.nextElementSibling.innerText = "";
        event.target.style.borderColor = "#5cb85c";
    }
}

function validatePhone(event){
    const phoneValue = event.target.value.trim();
    const phonePattern = /^\d{10}$/;
    if(!phonePattern.test(phoneValue)){
        event.target.nextElementSibling.innerText = "Please enter a valid 10-digit phone number.";
        event.target.style.borderColor = "red";
    }else{
        event.target.nextElementSibling.innerText = "";
        event.target.style.borderColor = "#5cb85c";
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
function validatePassword(){
    const passwordInput=document.getElementById("password");
}
// console.log("Before timeout");
// setTimeout(() => {
//     console.log("Hello after 2 seconds");
// }, -2);
// console.log("after timeout ");

