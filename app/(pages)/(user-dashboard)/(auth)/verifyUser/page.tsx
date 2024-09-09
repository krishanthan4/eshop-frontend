"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function page() {
    const [verifyCode, setVerifyCode] = useState("");
    const router = useRouter();
    const verifyUserFunction= ()=>{
if(verifyCode==""){
toast.error("Please enter the verification code");
}else{
  fetch("/api/Verification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({verification : verifyCode}), // Make sure userDetails is properly defined
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
                // Clear localStorage if "Remember Me" is not checked
                localStorage.removeItem('user_email');
                localStorage.removeItem('user_password');
router.push("/signin");
      } else {
        toast.error("Sign-up failed: " + data.message);
      }
    })
    .catch((e) => {
      console.error(e.message); // Properly log the error
      toast.error("An error occurred: " + e.message);
    });
}


    }
  return (
    <>
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center tracking-[1px] text-2xl font-thin leading-9 text-gray-200">
        BeFit | Verification
      </h2>
    </div>

    <div className="mt-10 space-y-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-400">
          Verification Code
        </label>
        <div className="mt-2">
          <input
            id="verifyCode"
            name="verifyCode"
            type="text"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
            required
            className="block w-full rounded-md border-0 border-[#414247] py-1.5 bg-[#252629] text-gray-400 shadow-sm  sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          onClick={verifyUserFunction}
          className="flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-50"
        >
          Submit
        </button>
      </div>

    </div>
    <a className="mx-auto  pt-5 hover:underline text-gray-500" href="/signin">Signin</a>

  </>
  )
}
