import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import walmartLogo from "../assets/walmartLogo.png";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  // Error Message start
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [errFirebase, setErrFirebase] = useState("");
  const [loading, setLoading] = useState();
  const [successMsgLoad, setSuccessMsgLoad] = useState();
  // Loading State start

  // Handle funtion start
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  // Email validation start
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  // Submit button start
  const handleRegistration = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your name");
    }
    if (!email) {
      setErrEmail("Enter your email");
      setErrFirebase("");
    } else {
      if (!emailValidation(email)) {
        setErrEmail("Enter a valid email");
      }
    }
    if (!password) {
      setErrPassword("Enter your password");
    } else {
      if (password.length < 6) {
        setErrPassword("Passwords must be at least 6 characters");
      }
    }
    if (!cPassword) {
      setErrCPassword("Confirm your password");
    } else {
      if (cPassword !== password) {
        setErrCPassword("Password not matched");
      }
    }

    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password.length >= 6 &&
      cPassword &&
      cPassword === password
    ) {
      setLoading(true);

      //Firebase authentication
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
          });
          // Signed up
          const user = userCredential.user;
          setLoading(false);
          setSuccessMsgLoad("Account has been created successfully");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;
          if (errorCode.includes("auth/email-already-in-use")) {
            setErrFirebase("Email is already in use, try having another one");
          }

          // ..
        });

      setClientName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setErrCPassword("");
      setErrFirebase("");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[370px] mx-auto flex flex-col items-center">
          <Link to="/">
            <img className="w-16" src={walmartLogo} alt="walmartLogo" />
          </Link>
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="flex items-center justify-center font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Your name</p>
                <input
                  onChange={handleName}
                  value={clientName}
                  type="text"
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">
                  Email or mobile phone number
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  type="email"
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                />
                {errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errEmail}
                  </p>
                )}
                {errFirebase && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errFirebase}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  value={password}
                  onChange={handlePassword}
                  type="password"
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Re-enter Password</p>
                <input
                  onChange={handleCPassword}
                  value={cPassword}
                  type="password"
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                />
                {errCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errCPassword}
                  </p>
                )}
              </div>
              <button
                onClick={handleRegistration}
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#1bafef] to-[#94ebff] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                Continue
              </button>
              {loading && (
                <div>
                  <RotatingLines
                    className="flex justify-center"
                    visible={true}
                    height="50"
                    width="50"
                    color="blue"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              )}
              {successMsgLoad && (
                <div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-700 px-2 text-center "
                  >
                    {successMsgLoad}
                  </motion.p>
                </div>
              )}
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By Continuing, you agree to Walmart's{" "}
              <span className="text-blue-600">Conditions of Use </span>and{" "}
              <span className="text-blue-600">Privace Notice.</span>
            </p>
            <div>
              <p className="text-xs text-black">
                Already have an account?{" "}
                <Link to="/signin">
                  <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                    Sign in{" "}
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
              </p>
              <p className="text-xs text-black -mt-2">
                Buying for work?{" "}
                <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                  Create a free business account
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-6">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2023, ReactBd.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Signup;
