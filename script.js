const lengthSlider = document.querySelector(".pass-length input"),
  options = document.querySelectorAll(".option input"),
  copyIcon = document.querySelector(".input-box span"),
  passwordInput = document.querySelector(".input-box input"),
  passIndicator = document.querySelector(".pass-indicator"),
  generateBtn = document.querySelector(".generate-btn");

const characters = {
  // objeto de letras, números e símbolos
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~"
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

  options.forEach((option) => {
    // percorrer as caixas de verificação de cada opção
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
       // adição de um valor-chave específico do objeto de carácter a staticPassword
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        // if checkbox id is spaces
        staticPassword += `  ${staticPassword}  `; // adicionar espaço no início e no fim de staticPassword
      } else {
        // senão passa um valor verdadeiro para excludeDuplicate
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
};

const upadatePassIndicator = () => {
// se o valor de lengthSlider for inferior a 8, então passa "weak" como id do passIndicator senão se lengthSlider
  // o valor é inferior a 16 então passa "medium" como id else passa "strong" como id
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
// passar o valor do seletor como texto do contador
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  upadatePassIndicator();
};
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value); // copying random password
  copyIcon.innerText = "check"; // changing copy icon to tick
  copyIcon.style.color = "#4285F4";
  setTimeout(() => {
    // after 1500 ms, changing tick icon back to copy
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#707070";
  }, 1500);
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);