import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthModal = () => {
// state for login
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");

// state for signup
const [signupName, setSignupName] = useState("");
const [signupEmail, setSignupEmail] = useState("");
const [signupPassword, setSignupPassword] = useState("");

// handle login
const handleLogin = async (e) => {
e.preventDefault();
try {
     const res = await axios.post("http://localhost:8080/login", {
     email: loginEmail,
     password: loginPassword,
     });
     alert("Login Successful!");
     console.log(res.data);
     // Close the modal manually after successful login
     const loginModal = new window.bootstrap.Modal(document.getElementById('loginModal'));
     loginModal.hide();
} catch (err) {
     alert("Login Failed!");
}
};

// handle signup
const handleSignup = async (e) => {
e.preventDefault();
try {
     const res = await axios.post("http://localhost:8080/signup", {
     name: signupName,
     email: signupEmail,
     password: signupPassword,
     });
     alert("Signup Successful!");
     console.log(res.data);
     // Close the modal manually after successful signup
     const signupModal = new window.bootstrap.Modal(document.getElementById('signupModal'));
     signupModal.hide();
} catch (err) {
     alert("Signup Failed!");
}
};

useEffect(() => {
// Make sure both modals are reset and ready to be shown
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');

loginModal.addEventListener('hidden.bs.modal', () => {
     setLoginEmail('');
     setLoginPassword('');
});

signupModal.addEventListener('hidden.bs.modal', () => {
     setSignupName('');
     setSignupEmail('');
     setSignupPassword('');
});

return () => {
     loginModal.removeEventListener('hidden.bs.modal', () => {});
     signupModal.removeEventListener('hidden.bs.modal', () => {});
};
}, []);

return (
<>
     {/* Login Modal */}
     <div className="modal fade" id="loginModal" aria-hidden="true" tabIndex="-1">
     <div className="modal-dialog modal-dialog-centered">
     <div className="modal-content bg-dark text-white">
          <div className="modal-header">
          <h5 className="modal-title">Login</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
          <form onSubmit={handleLogin}>
               <input
               type="email"
               className="form-control mb-3"
               placeholder="Enter Email"
               value={loginEmail}
               onChange={(e) => setLoginEmail(e.target.value)}
               />
               <input
               type="password"
               className="form-control mb-3"
               placeholder="Enter Password"
               value={loginPassword}
               onChange={(e) => setLoginPassword(e.target.value)}
               />
               <button type="submit" className="btn btn-primary w-100">
               Login
               </button>
          </form>
          </div>
          <div className="modal-footer">
          <button
               className="btn btn-link text-info"
               data-bs-target="#signupModal"
               data-bs-toggle="modal"
          >
               Create an Account
          </button>
          </div>
     </div>
     </div>
     </div>

     {/* Signup Modal */}
     <div className="modal fade" id="signupModal" aria-hidden="true" tabIndex="-1">
     <div className="modal-dialog modal-dialog-centered">
     <div className="modal-content bg-dark text-white">
          <div className="modal-header">
          <h5 className="modal-title">Sign Up</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
          <form onSubmit={handleSignup}>
               <input
               type="text"
               className="form-control mb-3"
               placeholder="Full Name"
               value={signupName}
               onChange={(e) => setSignupName(e.target.value)}
               />
               <input
               type="email"
               className="form-control mb-3"
               placeholder="Enter Email"
               value={signupEmail}
               onChange={(e) => setSignupEmail(e.target.value)}
               />
               <input
               type="password"
               className="form-control mb-3"
               placeholder="Enter Password"
               value={signupPassword}
               onChange={(e) => setSignupPassword(e.target.value)}
               />
               <button type="submit" className="btn btn-success w-100">
               Sign Up
               </button>
          </form>
          </div>
          <div className="modal-footer">
          <button
               className="btn btn-link text-info"
               data-bs-target="#loginModal"
               data-bs-toggle="modal"
          >
               Already have an account? Login
          </button>
          </div>
     </div>
     </div>
     </div>
</>
);
};

export default AuthModal;
