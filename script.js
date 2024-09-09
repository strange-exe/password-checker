// Add a checkbox for symbols, numbers, and a button to generate password
const symbolCheckbox = document.getElementById("symbols");
const numberCheckbox = document.getElementById("numbers");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");

// Add event listener to generate button
generateButton.addEventListener("click", generatePassword);

// Add event listener to copy button
copyButton.addEventListener("click", copyPassword);

// Function to generate password
function generatePassword() {
  const passwordLength = 12; // default password length
  const password = generateRandomPassword(passwordLength, symbolCheckbox.checked, numberCheckbox.checked);
  document.getElementById("password").value = password;
}

// Function to generate random password
function generateRandomPassword(length, useSymbols, useNumbers) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if (useNumbers) {
    chars += "0123456789";
  }
  if (useSymbols) {
    chars += "!@#$%^&*(),.?\":{}|<>";
  }
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Function to copy password
function copyPassword() {
  const password = document.getElementById("password").value;
  navigator.clipboard.writeText(password);
  alert("Password copied to clipboard!");
}

// Update the existing script to include the check password feature
document.getElementById("password").addEventListener("input", function (){
  const password = this.value;

  const upperCasePattern = /[A-Z]/;
  const lowerCasePattern = /[a-z]/;
  const numberPattern = /[0-9]/;
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

  updateValidation(
    "upperCase",
    upperCasePattern.test(password)
  );

  updateValidation(
    "lowerCase",
    lowerCasePattern.test(password)
  );
  updateValidation(
    "number",
    numberPattern.test(password)
  );
  updateValidation(
    "specialChar",
    specialCharPattern.test(password)
  );
});

function updateValidation(elementId, isValid){
  const element = document.getElementById(elementId);
  const icon = element.querySelector("i");

  if(isValid){
    element.classList.remove("invalid");
    element.classList.add("valid");
    icon.classList.remove("bi-shield-x");
    icon.classList.add("bi-shield-check");
  }
  else{
    element.classList.remove("valid");
    element.classList.add("invalid");
    icon.classList.remove("bi-shield-check");
    icon.classList.add("bi-shield-x");
  }
}
