var modal = document.getElementById("login_modal");
var trigger = document.getElementById("trigger");
var closeButton = document.getElementById("login_modal_close");
var log1 = document.getElementById("log_button");
var log2 = document.getElementById("register_button");
var sig1 = document.getElementById("sign_in");
var sig2 = document.getElementById("sign_up");
var logIn = document.getElementById("logIn");
var signIn = document.getElementById("signIn");
var logOut = document.getElementById("logOut");
var signInError = document.getElementById('signin_error');
var logInError = document.getElementById('login_error');
var app = firebase.app();

logOut.addEventListener("click", logOutEmail);
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
log1.addEventListener("click", openLogin);
log2.addEventListener("click", openRegister);
logIn.addEventListener("click", logInEmail);
signIn.addEventListener("click", signInEmail);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    if(user.displayName==null){
      email = document.getElementById("email_signin").value;
      var res = email.split("@");
      firebase.auth().currentUser.updateProfile({
        displayName: res[0]
      })
    }
    trigger.style.display = "none";
    logOut.style.display = "block";
  } else {
    trigger.style.display = "block";
    logOut.style.display = "none";
  }
});


function logOutEmail() {
  firebase.auth().signOut().then(function () {
    trigger.style.display = "block";
    logOut.style.display = "none";
  }).catch(function (error) {
    console.log(error);
  });
}

function logInEmail() {
  email = document.getElementById("email_login").value;
  password = document.getElementById("password_login").value;
  if (email == "" || password == "") {
    logInError.style.background = "red";
    logInError.innerText = "All fields are mandatory";
  } else {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        switch (error.code) {
          case "auth/invalid-email":
            logInError.style.background = "red";
            logInError.innerText = "Please use a valid email";
            break;
          case "auth/user-not-found":
            logInError.style.background = "red";
            logInError.innerText = "No user with this email exists ";
            break;
          case "auth/wrong-password":
            logInError.style.background = "red";
            logInError.innerText = "Incorrect password";
            break;
          default:
            logInError.style.background = "red";
            logInError.innerText = "An error occured please contact admin";
        }
      })
      .then(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            trigger.style.display = "none";
            logOut.style.display = "block";
            logInError.style.background = "green";
            logInError.innerText = "Welcome";
            setTimeout(function () {
              toggleModal();
              logInError.innerText = "";
            }, 1000);
          } else {
            trigger.style.display = "block";
            logOut.style.display = "none";
          }
        });
      })
  }
}

function signInEmail() {
  email = document.getElementById("email_signin").value;
  password = document.getElementById("password_signin").value;
  rpassword = document.getElementById("password_signin_repeat").value;
  if (email == "" || password == "" || rpassword == "") {
    signInError.style.background = "red";
    signInError.innerText = "All fields are mandatory";
  } else if (password != rpassword) {
    signInError.style.background = "red";
    signInError.innerText = "Passwords must match";
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        switch (error.code) {
          case "auth/invalid-email":
            signInError.style.background = "red";
            signInError.innerText = "Please use a valid email";
            break;
          case "auth/email-already-in-use":
            signInError.style.background = "red";
            signInError.innerText = "An account with this email already exists";
            break;
          case "auth/weak-password":
            signInError.style.background = "red";
            signInError.innerText = "Password to weak";
            break;
          default:
            signInError.style.background = "red";
            signInError.innerText = "Unknown error";
            break;
        }
      })
      .then(() => {
        var res = email.split("@");
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            firebase.auth().currentUser.updateProfile({
              displayName: res[0]
            })
            signInError.style.background = "green";
            signInError.innerText = "Register successful";
            trigger.style.display = "none";
            logOut.style.display = "block";
            setTimeout(function () {
              toggleModal();
              signInError.innerText = "";
            }, 1000);
          } else {
            trigger.style.display = "block";
            logOut.style.display = "none";
          }
        });
      })

  }

}


function openLogin() {
  sig2.classList.add("active");
  sig1.classList.add("inactive");
  sig1.classList.remove("active");
  sig2.classList.remove("inactive");
}

function openRegister() {
  sig1.classList.add("active");
  sig2.classList.add("inactive");
  sig2.classList.remove("active");
  sig1.classList.remove("inactive");
}

function toggleModal() {
  modal.classList.toggle("open_modal");
  signInError.innerText = "";
  logInError.innerText = "";
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

function openMenu() {
  var element = document.getElementById("round_menu");
  element.classList.toggle("open");
}