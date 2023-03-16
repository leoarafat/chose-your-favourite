import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  // const [success, setSuccess] = useState('');
  const { signIn, updateUser, googleSignUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((res) => {
        const user = res.user;
        // setSuccess('Successfully LogedIn')
        toast.success("Successfully LogIn");
        // console.log(user);
        navigate(from, { replace: true });
        const userInfo = {
          displayName: name,
        };
        updateUser(userInfo).then(() => {});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode, errorMessage);
        toast.error(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    googleSignUp()
      .then((res) => {
        const user = res.user;
        // console.log(user);

        toast.success("Successfully Login!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode, errorMessage);
      });
  };
  return (
    <div>
      <div className="relative py-16">
        <div className="container relative m-auto px-6 text-gray-500 md:px-12 xl:px-40">
          <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="rounded-3xl border border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 backdrop-blur-2xl">
              <div className="p-8 py-12 sm:p-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">
                  Sign in to your account
                </h2>
                <button
                  onClick={handleGoogleLogin}
                  className="w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700 mb-3"
                >
                  <div className="w-max mx-auto flex items-center justify-center space-x-4">
                    <FcGoogle className="w-8 h-8" />
                    <span className="block w-max text-sm font-semibold tracking-wide text-cyan-700 dark:text-white">
                      With Google
                    </span>
                  </div>
                </button>
                <form onSubmit={handleLogIn} action="" className="space-y-8">
                  <div className="space-y-2">
                    <label
                      for="email"
                      className="text-gray-600 dark:text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autocomplete="username"
                      className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        for="pwd"
                        className="text-gray-600 dark:text-gray-300"
                      >
                        Password
                      </label>
                      <button className="-mr-2 p-2" type="reset">
                        <span className="text-sm text-primary">
                          Forgot your password ?
                        </span>
                      </button>
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autocomplete="current-password"
                      className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                  </div>
                  {error}
                  <button
                    type="submit"
                    className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                  >
                    <span className="relative text-base font-semibold text-white dark:text-dark">
                      LogIn
                    </span>
                  </button>

                  <p className="border-t border-gray-100 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account ?
                    <Link to="/register" className="text-primary">
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="space-x-4 text-center text-gray-500">
              <span>&copy; Plan N Design</span>
              <Link href="#" className="text-sm hover:text-primary">
                Contact
              </Link>
              <Link href="#" className="text-sm hover:text-primary">
                Privacy & Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
