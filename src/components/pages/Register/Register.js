import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const Register = () => {
  const { createUser, updateUser, googleSignUp } = useContext(AuthContext);
  const naviGate = useNavigate();
  const [error, setError] = useState("");
  //   const [userEmail, setUserEmail] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        form.reset();
        setError("");
        const userInfo = {
          displayName: name,
        };
        updateUser(userInfo).then(() => {});
        // setSuccess('Successfully registered')
        toast.success("Successfully Register!");
        naviGate("/");
        console.log(user);
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        setError(errorCode, errorMessage);
        toast.error(errorMessage);
      });
  };

  const handleGoogleSignUp = () => {
    googleSignUp()
      .then((result) => {
        const user = result.user;
        naviGate("/");
        console.log(user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
        <div className="mx-auto h-full sm:w-max">
          <div className="m-auto  py-12">
            <div className="space-y-4"></div>
            <div className="mt-12 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
                Please SignUp
              </h3>
              <div className="mt-12 flex flex-wrap">
                <button
                  onClick={handleGoogleSignUp}
                  className="w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700 mb-3"
                >
                  <div className="w-max mx-auto flex items-center justify-center space-x-4">
                    <FcGoogle className="w-8 h-8" />
                    <span className="block w-max text-sm font-semibold tracking-wide text-cyan-700 dark:text-white">
                      With Google
                    </span>
                  </div>
                </button>
                <button className="w-full h-11 rounded-full bg-gray-900 px-6 transition hover:bg-gray-800 focus:bg-gray-700 active:bg-gray-600 dark:bg-gray-700 dark:border dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700">
                  <div className="w-max mx-auto flex items-center justify-center space-x-4 text-white">
                    <AiFillGithub className="w-8 h-8" />
                    <span className="block w-max text-sm font-semibold tracking-wide text-white">
                      With Github
                    </span>
                  </div>
                </button>
              </div>

              <form
                onSubmit={handleRegister}
                action=""
                className="mt-10 space-y-8 dark:text-white"
              >
                <div>
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id="name"
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id="password"
                      type="password"
                      placeholder="Your Password"
                      className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                    />
                  </div>
                  {error}
                  <button type="reset" className="-mr-3 w-max p-3"></button>
                </div>

                <div>
                  <button className="w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                    <span className="text-base font-semibold text-white dark:text-gray-900">
                      SignUp
                    </span>
                  </button>
                  <button href="#" type="reset" className="-ml-3 w-max p-3">
                    <span className="text-sm tracking-wide text-sky-600 dark:text-sky-400">
                      Already have an account?
                      <Link to={"/login"}>
                        {" "}
                        <span className="underline">SignIn</span>
                      </Link>
                    </span>
                  </button>
                </div>
              </form>
            </div>
            <div className="border-t pt-12 text-gray-500 dark:border-gray-800">
              <div className="space-x-4 text-center">
                <span>&copy; streamTube</span>
                <Link
                  href="#"
                  className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
                >
                  Contact
                </Link>
                <Link
                  href="#"
                  className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
                >
                  Privacy & Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
