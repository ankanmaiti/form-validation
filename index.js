const formInputs = document.querySelectorAll("input") 

const submit = document.getElementById('submit')
const errorMessage = document.getElementById('error-message')


function verifyFullName(name) {
    if ( !name ) return 
    if (name.length > 20) return [false, "max length 20 is exceed"]

    const nameRegex = /^[a-zA-Z\s]+$/
    const verify = nameRegex.test(name)

    return [verify, verify ? null : "Invalid Name"]
}

function verifyEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const verify = emailRegex.test(email);
    return [verify, verify ? null : "Invalid Email"]
}

function verifyNewPassword(password) {

    // atleast 1 Capital, 1 small, 1 num, 1 specialChar 
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/
    const verify = passwordRegex.test( password )

    return [ verify, verify ? null: "must include atleast 1 char, 1 number and 1 special char " ]
}

function verifyConfirmPassword( password ) {
    const passwordField = document.getElementById('password')
    const verify = passwordField.value === password
    return [ verify, verify ? null: "password didn't match" ]
}


function verifyPhoneNumber(phone) {
    const verify = /\d/.test(phone)
    return [ verify, verify ? null : "only accept numerics" ]
}

function verifyDateOfBirth( dateInput, ageLimit = 13 ) {
    const date = new Date(dateInput)

    const dateLimit = new Date()
    dateLimit.setFullYear( dateLimit.getFullYear() - ageLimit)

    const verify = date < dateLimit
    return [verify, verify ? null : `age must be ${ageLimit}+`]
}


function inputVerify( target, verifyingCallback ) {
    const [verify, error] = verifyingCallback(target.value)
    if ( verify === false ) {
        target.style.borderColor = 'red';
        errorMessage.textContent = error
    }
    else {
        target.style.borderColor = 'green';
        errorMessage.textContent = ' '
    }
}


formInputs.forEach( inputField => inputField.addEventListener('input', ({ target })=>{

    let callBack = null
    switch ( target.name ){
        case "fullname" : 
            callBack = verifyFullName
            break

        case "email" : 
            callBack = verifyEmail
            break
        
        case "phone" :
            callBack = verifyPhoneNumber
            break
        
        case "dob" :
            callBack = verifyDateOfBirth
            break
        
        case "password" :
            callBack = verifyNewPassword
            break
        
        case "confirm-password" :
            callBack = verifyConfirmPassword
            break
        
    }
    if (callBack != null) inputVerify( target, callBack )
}))
