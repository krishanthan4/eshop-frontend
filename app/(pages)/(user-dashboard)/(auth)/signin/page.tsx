"use client";
import React, { useState } from "react";

export default function page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userDetails ={
        email: email,
        password: password
    }

   const sendUserDetails= async ()=>{
    
    try{
   const response = await fetch('/api/Signin', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
    });

    if (response.ok) {
        const data = await response.json();
        alert(JSON.stringify(data));
    } else {
        // Handle HTTP errors
        console.error('HTTP error:', response.status);
        alert('Error: ' + response.statusText);
    }
} catch (e: any) {
    // Handle fetch errors
    console.error('Fetch error:', e);
    alert('Error: ' + e.message);
}
   }

  return (
      <>  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center tracking-[1px] text-2xl font-thin leading-9 text-gray-200">
        BeFit | Sign In
      </h2>
    </div>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full rounded-md border-0 border-[#414247] py-1.5 bg-[#252629] text-gray-400 shadow-sm  sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-300">
            Password
          </label>
          <div className="text-sm">
            <div className="font-semibold cursor-pointer text-gray-500 hover:text-gray-400">
              Forgot password?
            </div>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full rounded-md border-0 border-[#414247] py-1.5 bg-[#252629] text-gray-400 shadow-sm  sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="flex">
        <div className="checkbox-wrapper-33 mt-2">
          <label className="checkbox">
            <input
              className="checkbox__trigger visuallyhidden"
              type="checkbox"
              id="rememberMe"
            />
            <span className="checkbox__symbol">
              <svg
                aria-hidden="true"
                className="icon-checkbox"
                width="28px"
                height="28px"
                viewBox="0 0 28 28"
                version="1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 14l8 7L24 7"></path>
              </svg>
            </span>
          </label>
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-300 mt-2">
          Remember Me
        </label>
      </div>

      <div>
        <button onClick={sendUserDetails} className="flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-50">
          Sign in
        </button>
      </div>
      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <a href="/signup">
          <button className="font-semibold leading-6 text-gray-400 hover:text-gray-300">
            {" "}
            Sign Up
          </button>
        </a>
      </p>
    </div></>
  );
}
