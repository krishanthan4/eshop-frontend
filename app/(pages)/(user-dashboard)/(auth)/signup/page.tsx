"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retype_password, setRetype_password] = useState("");
const router = useRouter();
  const userDetails = {
    email: email,
    password: password,
  };
  const saveUserDetails = () => {
    // Assuming email, password, retype_password, and userDetails are state variables.
    if (email === "") {
      toast.error("Please enter an email.");
    } else if (password === "") {
      toast.error("Please enter a password.");
    } else if (retype_password === "") {
      toast.error("Please Enter the Retype Password.");
    } else if (retype_password !== password) {
      toast.error("Passwords does not match.");
    } else {
      fetch("/api/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails), // Make sure userDetails is properly defined
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // Return the parsed JSON data
          } else {
            throw new Error("Failed to sign up."); // Throw an error if the response is not ok
          }
        })
        .then((data) => {
          if (data.success) {
            toast.success(data.content); 
router.push("/verifyUser");
          } else {
            toast.error("Sign-up failed: " + data.content);
          }
        })
        .catch((e) => {
          console.error(e.message); // Properly log the error
          toast.error("An error occurred: " + e.message);
        });
    }
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
