// Gallery
let fullImgContainer = document.getElementById("full-img-container");
let fullImg = document.getElementById("full-img");

function openFullImg(src) {
  fullImgContainer.style.display = "flex";
  fullImg.src = src;
}

function closeFullImg(){
  fullImgContainer.style.display = "none";
}




// Contact 

//Get data 
const contactForm = document.querySelector('.contact-form');

let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let email = document.getElementById('email');
let number = document.getElementById('number');
let message= document.getElementById('message');

// Authenticate Data
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^\d{10}$/;  
  return phoneRegex.test(phoneNumber);
}

function dataAuthentication(formData) {
  if (formData.firstName === '') {
    alert('Please enter your first name.');
    return false;
  }

  if (formData.lastName === '') {
    alert('Please enter your last name.');
    return false;
  }

  if (formData.email === '') {
    alert('Please enter your email.');
    return false;
  } else if (!isValidEmail(formData.email)){
    alert("The email you entered is not valid.");
    return false;
  }

  if (formData.number === '') {
    alert('Please enter your phone number');
    return false;
  } else if (!isValidPhoneNumber(formData.number)) {
    alert("The phone number you entered is not valid.");
    return false;
  }

  if (formData.message === '') {
    alert('Please enter a message.');
    return false;
  }

  return true;
};

// Send data to server
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    number: number.value,
    message: message.value
  }

  if (!dataAuthentication(formData)) {
    return;
  }

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function() {
    console.log(xhr.responseText); 
    if(xhr.responseText == 'success'){
      alert('Email sent');
      firstName.value = '';
      lastName.value = '';
      email.value = '';
      number.value = '';
      message.value = '';
    }else{
      alert('Something went wrong!');
    }
  };
  xhr.send(JSON.stringify(formData));
});