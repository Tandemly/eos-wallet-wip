import * as React from "react";

const LoginLink = () => (
  <div className="ml-auto mr-3 align-self-center hidden-md-up">
    <a 
      className="text-link small button d-inline" 
      href="/create-account"
    >
      Sign Up
    </a>
    <button 
      className="btn btn-primary btn-sm ml-2 button d-inline" 
      type="submit"
    >
      Login
    </button>
  </div>
);

export default LoginLink;
