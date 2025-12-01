const form=document.getElementById('form1');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    alert("Form submitted successfully!");
    const data=new FormData(form);
    console.log(data.entries());
    for (let [name, value] of data.entries()) {
            console.log(`${name}: ${value}`);
        }
})