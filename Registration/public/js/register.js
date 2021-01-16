//function to get all input and send them over using fetch method from express
function getInfo() {
let form = document.getElementById('form');
let name = form.elements['name'].value;
let surname = form.elements['surname'].value;
let address = form.elements['address'].value;
let phonenumber = form.elements['phonenumber'].value;
let email = form.elements['email'].value;
let password = form.elements['password'].value;

const info = { name , surname, address, phonenumber, email, password};
const options = {
    method: 'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(info)
};

fetch('/register',options).then(response =>{
    window.location.replace("http://localhost:3000/regsuccess.html");
});
}