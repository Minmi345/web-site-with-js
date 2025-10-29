document.addEventListener("DOMContentLoaded", () => {

    let contactForm = document.getElementById("ContactForm");
    let name = document.getElementById("name");
    let mail = document.getElementById("email");
    let message = document.getElementById("message");
    let success = document.getElementById("success");
    let btnSubmit = document.getElementById("bootifulsubmitbutton");
    let nameerr = document.getElementById("error-name");
    let messageer = document.getElementById("error-message");
    let mailerr = document.getElementById("error-email");
    
    const cb = document.getElementById("tick");
    success.style.display = "none";

    name.addEventListener('input', checkinputonnumbers)
    
    function checkinputonnumbers(){
        //alert(name)
        const isThereNum = /\d/; 
      if (isThereNum.test(name.value)) {
            nameerr.textContent = ("Don't be silly, no numbers in name");
            name.style.border = "1px solid red";
        }
        else{
          nameerr.textContent = "‎ ‎";
          name.style.borderColor = "#ccc"


        }
    }


    if (cb.checked) {
        btnSubmit.disabled = false;
    }
    else {
        btnSubmit.disabled = true;

    }

    name.addEventListener("focus", () => {
        name.style.borderColor = "var(--primary-colour)"
    })
    name.addEventListener("blur", () => {
        name.style.borderColor = "#ccc"
        nameerr.textContent = "‎ ‎";

    })
    mail.addEventListener("focus", () => {
        mail.style.borderColor = "var(--primary-colour)"
    })
    mail.addEventListener("blur", () => {
        mail.style.borderColor = "#ccc"
        mailerr.textContent = "‎ ‎";

    })
    message.addEventListener("focus", () => {
        message.style.borderColor = "var(--primary-colour)"
    })
    message.addEventListener("blur", () => {
        message.style.borderColor = "#ccc";
        messageer.textContent = "‎ ‎";

    })

    cb.addEventListener("change", () => {
        let isChecked = cb.checked; // Get the current checked state
        if (isChecked){
            btnSubmit.disabled = false;
        }
        else{
            btnSubmit.disabled = true;
        }
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const isThereNum = /\d/; //contains number
        let isname = false, ismail = false, ismessage = false;
        console.log('Form submitted!'); 
        console.log(!isThereNum.test(name))
        if (name.value.trim() === ""){
            nameerr.textContent = ("Name is required");
            name.style.border = "1px solid red";
        }
        else{
            nameerr.textContent = "‎ ‎";
            name.style.border = "1px solid #ccc";
            isname = true;
        }

        if (mail.value.trim() === "") {
            mailerr.textContent = "no email? how will we reach back?";
            mail.style.border = "1px solid red";
        }
        else if (!mail.value.includes('@') || !mail.value.includes('.')) {
            mailerr.textContent = "-.- write email properly!!";
            mail.style.border = "1px solid red";
        }
        else if (!mail.value.substr(mail.value.indexOf('@')).includes('.')){
            mail.style.border = "1px solid red";
            mailerr.textContent = "erm.. it's a typo I hope???";
        }
        else{
            mail.style.border = "1px solid #ccc";
            mailerr.textContent = "‎ ‎";
            ismail = true;
        }
        console.log(name.value);

        if(message.value.trim() === ""){
            message.style.border = "1px solid red";
            messageer.textContent = "send nothing to us? why are you on this page then?";
        }
        else {
            message.style.border = "1px solid #ccc";
            messageer.textContent = "‎ ‎";
            ismessage = true;
        }
        
        if (isname && ismail && ismessage) {
            success.style.display = "block";
            success.textContent = ("Your message was succesfully sent!");
        }
        else{
            success.style.display = "none";
        }


    })
})