"use client";
import { useState } from "react";
import { json } from "stream/consumers";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retype_password, setRetype_password] = useState("");

  const userDetails = {
    email: email,
    password: password,
    retype_password: retype_password,
  };

  const saveUserDetails = () => {
    fetch("/api/Signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        if(response.ok){
          response.json();
        }
      })
      .then((data) => {
        alert(data);
        // if(data.message=="success"){


        // }
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center tracking-[1px] text-2xl font-thin leading-9 text-gray-200">
          BeFit | Sign Up
        </h2>
      </div>

      <div className="mt-10 space-y-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-400">
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
            <label className="block text-sm font-medium leading-6 text-gray-400">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 border-[#414247] py-1.5 bg-[#252629] text-gray-400 shadow-sm  sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-400">
            Retype Password
          </label>
          <div className="mt-2">
            <input
              id="retype_password"
              name="retype_password"
              type="password"
              autoComplete="retype-password"
              value={retype_password}
              onChange={(e) => setRetype_password(e.target.value)}
              required
              className="block w-full rounded-md border-0 border-[#414247] py-1.5 bg-[#252629] text-gray-400 shadow-sm  sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            onClick={saveUserDetails}
            className="flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-50"
          >
            Sign Up
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          already have a account?
          <a href="/signin">
            {" "}
            <button className="font-semibold leading-6 text-gray-400 hover:text-gray-300">
              Sign In
            </button>
          </a>
        </p>
      </div>
    </>
  );
}
