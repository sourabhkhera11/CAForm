let editId=-1;
//Single Time accessing the required data 
const form = document.getElementById('form1');
const tbody = document.getElementById("tbody");
const original = document.getElementById('-2');
// convert interest in array->Done 
let formData = [
    {   
        id:1,
        firstName:"Sourabh",
        lastName:"Khera",
        email:"sourabhkhera11@gmail.com",
        phone:"9876543210",
        gender:"male",
        interests:["music","sports"],
        DOB:"2003-10-31",
        city:"New Delhi",
        address:"123, ABC Street, New Delhi",
        password:"Sourabh@123" 
    },
    {   
        id:2,
        firstName:"Abhinav",
        lastName:"Goyal",
        email:"abhinavgoyal@gmail.com",
        phone:"8700134518",
        gender:"male",
        interests:["music","movies"],
        DOB:"2003-10-29",
        city:"Mumbai",
        address:"B Block Noida",
        password:"Abhinav@123" 
    },
    {   
        id:3,
        firstName:"Tushar",
        lastName:"Verma",
        email:"tushar@gmail.com",
        phone:"9834567012",
        gender:"female",
        interests:["music","politics"],
        DOB:"2002-12-02",
        city:"Chennai",
        address:"XYZ Colony Shahdara",
        password:"Tushar@123" 
    },
    {
        id:4,
        firstName:"Deepanshu",
        lastName:"Punj",
        email:"deepanshu@gmail.com",
        phone:"8834567012",
        gender:"male",
        interests:["sports","politics"],
        DOB:"2004-03-21",
        city:"Chennai",
        address:"PQR Colony Uttam Nagar",
        password:"Deepanshu@123" 
    }
];
// good
//Tbody manipulation-> renderRow->Single Row
function renderRow(row,entry){
    row.querySelector(".firstNamee").innerText = entry.firstName.trim();
    row.querySelector(".lastNamee").innerText = entry.lastName.trim();
    row.querySelector(".emaill").innerText = entry.email.trim();
    row.querySelector(".phonee").innerText = entry.phone.trim();
    row.querySelector(".genderr").innerText = entry.gender;
    row.querySelector(".Interestss").innerText = entry.interests.toString();
    row.querySelector(".dobb").innerText = entry.DOB.trim();  
    row.querySelector(".cityy").innerText = entry.city.trim();
    row.querySelector(".addresss").innerText = entry.address.trim();
    row.querySelector(".passwordd").innerText = entry.password.trim();
}
//Render the whole tbody
function renderData(formData){
    formData.forEach((element)=>{
        const clone = original.cloneNode(true);
        clone.id = element.id;
        clone.style.display = 'table-row'; 
        renderRow(clone,element);
        tbody.appendChild(clone);
    })
}
//Initial data 
window.onload=function(){
    renderData(formData);
}
function formSubmit(e){
    const submitButton=document.getElementById("submitButton");
    e.preventDefault();
    // try creating a single function for all validations
    if(validFirstName() && validLastName() && validateEmail() && validatePhone() && validateGender() && validateInterests() && validateDob() && validateCity() && validateAdress() && validateRightPassword() && validatePassword()){
        const data = new FormData(form);
        let entry = {};
        console.log(data.entries());
        let interests=[];
        const names=["interest1","interest2","interest3","interest4"];
        for (let [name, value] of data.entries()) {
            if(names.includes(name)){
                interests.push(value);
            }
            else{
                entry[name] = value;
            }
        }
        entry["interests"]=interests;
        // dont check on innerText->Done
        if(editId!=-1){
            submitButton.innerText="Submit";
            document.getElementById("discardButton").style.display="none";
            const row=document.getElementById(editId);
            const editEntry=formData.find(item => item["id"]==editId);
            //Inside the array
            editEntry.firstName= entry.firstName.trim();
            editEntry.lastName= entry.lastName.trim();
            editEntry.email= entry.email.trim();
            editEntry.phone= entry.phone.trim();
            editEntry.gender= entry.gender;
            editEntry.DOB= entry.DOB.trim();  
            editEntry.city= entry.city.trim();
            editEntry.address= entry.address.trim();
            editEntry.password= entry.password.trim();
            editEntry.interests=entry.interests;
            editId=-1;
            // rendering should be done after data insertion/updation->Done
            renderRow(row,entry);
            alert("Details updated successfully!");
        }
        else{
            entry["id"]=Date.now();
            formData.push(entry);
            const table = document.getElementById('tbody');
            const original = document.getElementById('-2');
            const clone = original.cloneNode(true);
            clone.id = entry.id;
            clone.style.display = 'table-row'; 
            renderRow(clone,entry);
            table.appendChild(clone);
            console.log(formData);
            // alert should be done after data updation->Done              
            alert("Form submitted successfully!");
        }
        console.log(formData);
        form.reset();
        // see if there is any better solution for this
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
// combine these two->Done
function validationStyling(errorMessage,Input,status,message="This field is required."){
    //1->Success and 0-> failure
    if(status==0){
        errorMessage.innerText = message;
        Input.style.borderColor = "red";
        return false;
    }
    else{
        errorMessage.innerText = "";
        Input.style.borderColor = "#5cb85c";
        return true;
    }
}
// create single functions for validations
function validFirstName(){
    const nameInput=document.getElementById("firstName");
    const nameValue=nameInput.value.trim();
    const errorMessage=nameInput.nextElementSibling;
    const namePattern=/^[A-Za-z]+$/;
    if(nameValue === ""){
        return validationStyling(errorMessage,nameInput,0);
    }
    else if(!namePattern.test(nameValue)){ 
        return validationStyling(errorMessage,nameInput,0,"Name should contain only alphabets.");
    }
    else{
        return validationStyling(errorMessage,nameInput,1);
    }
}
function validLastName(){
    const nameInput=document.getElementById("lastName");
    const nameValue=nameInput.value.trim();
    const errorMessage=nameInput.nextElementSibling;
    const namePattern=/^[A-Za-z]+$/;
    if(nameValue === ""){
        return validationStyling(errorMessage,nameInput,0);
    }
    else if(!namePattern.test(nameValue)){ 
        return validationStyling(errorMessage,nameInput,0,"Name should contain only alphabets.");
    }
    else{
        return validationStyling(errorMessage,nameInput,1);
    }
}
function validateEmail(){
    const emailInput=document.getElementById("email");
    const emailValue = emailInput.value.trim();
    const errorMessage=document.querySelector(".email .error-message");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailValue === ""){
        return validationStyling(errorMessage,emailInput,0);
    }
    if(!emailPattern.test(emailValue)){
        return validationStyling(errorMessage,emailInput,0,"Please enter a valid email address.");
        
    }else{
        return validationStyling(errorMessage,emailInput,1)
    }
}
function validatePhone(){
    const phoneInput=document.getElementById("phone");
    const phoneValue = phoneInput.value.trim();
    const errorMessage=phoneInput.nextElementSibling;
    const phonePattern = /^\d{10}$/;
    if(phoneValue === ""){
        return validationStyling(errorMessage,phoneInput,0);
    }
    if(!phonePattern.test(phoneValue)){
        return validationStyling(errorMessage,phoneInput,0,"Please enter a valid 10-digit phone number.");
    }else{
        return validationStyling(errorMessage,phoneInput,1)
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
        return validationStyling(errorMessage,cityInput,0);
    }else{
        return validationStyling(errorMessage,cityInput,1);
    }
}
function validateAdress(){
    const addressInput=document.getElementById("address");
    const addressValue=addressInput.value.trim();
    const errorMessage=addressInput.nextElementSibling;
    if(addressValue===""){
        return validationStyling(errorMessage,addressInput,0);
    }else{
        return validationStyling(errorMessage,addressInput,1);
    }
}
function validateRightPassword(){
    const passwordInput=document.getElementById("password");
    const passwordValue=passwordInput.value.trim();
    const errorMessage=passwordInput.nextElementSibling;

    const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(passwordValue===""){
        return validationStyling(errorMessage,passwordInput,0);
    }
    if(!passwordPattern.test(passwordValue)){
        return validationStyling(errorMessage,passwordInput,0,"Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
    }else{
        return validationStyling(errorMessage,passwordInput,1);
    }
}
function validatePassword(){
    const passwordInput=document.getElementById("password");
    const confirmPasswordInput=document.getElementById("confirmPassword");
    const errorMessage=confirmPasswordInput.nextElementSibling;
    if(passwordInput.value===""){
        return validationStyling(errorMessage,passwordInput,0);
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
    formData=formData.filter(item=>item.id!= rowid);
    console.log(formData);
}

function editRow(event){
    document.getElementById("discardButton").style.display="block";
    const rowid=event.target.closest("tr").id;
    editId=rowid;
    const row=document.getElementById(rowid);
    const entry=formData.find(item => item["id"]==rowid);
    //Fill the data inside the input fields 
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
        document.querySelector(`input[name="${interest}"]`).checked = false;
    });
    entry.interests.forEach(item=>{
        document.getElementById(item).checked=true;
    });
    const submitButton=document.getElementById("submitButton");
    submitButton.innerText="Save Changes";
    // scroll after the data is updated in form->Done
    window.scrollTo({top:0,behavior:"smooth"});
}
function discard(){
    form.reset();
    document.getElementById("submitButton").innerHTML="Create Account";
    document.getElementById("discardButton").style.display="none";

}
// good
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
    renderData(formData);
}
// try rewamping this
function filterBy(){
    const male=document.getElementById("maleF").checked;
    const female=document.getElementById("femaleF").checked;
    const newDelhi=document.getElementById("newDelhiF").checked;
    const banglore=document.getElementById("bangloreF").checked;
    const mumbai=document.getElementById("mumbaiF").checked;
    const chennai=document.getElementById("chennaiF").checked;
    const kolkata=document.getElementById("kolkataF").checked;

    let tempArr=[...formData];
    if(male || female)[
        tempArr=tempArr.filter(item=>{
            if(male && item.gender==="male")return true;
            if(female && item.gender==="female")return true;
            return false;
        })
    ]
    let cities=[];
    if(newDelhi) cities.push("New Delhi");
    if(banglore) cities.push("Banglore");
    if(mumbai) cities.push("Mumbai");
    if(chennai) cities.push("Chennai");
    if(kolkata) cities.push("Kolkata");
    if(cities.length>0){
        tempArr=tempArr.filter(item=>{
            return cities.includes(item.city);
            
        })
    }
    const tableBody=document.getElementById("tbody");
    tableBody.innerHTML="";
    renderData(tempArr);
}
