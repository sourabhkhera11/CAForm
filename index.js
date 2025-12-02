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

    clone.querySelector(".firstNamee").innerText = entry.firstName;
    clone.querySelector(".lastNamee").innerText = entry.lastName;
    clone.querySelector(".emaill").innerText = entry.email;
    clone.querySelector(".phonee").innerText = entry.phone;
    clone.querySelector(".genderr").innerText = entry.gender;
    clone.querySelector(".Interestss").innerText = Interests;
    clone.querySelector(".dobb").innerText = entry.DOB;  
    clone.querySelector(".cityy").innerText = entry.city;
    clone.querySelector(".addresss").innerText = entry.address;
    clone.querySelector(".passwordd").innerText = entry.password;

    table.appendChild(clone);
});
