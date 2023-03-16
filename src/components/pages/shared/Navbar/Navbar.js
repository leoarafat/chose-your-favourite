import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };
  return (
    <div className="">
      <header className=" top-0 left-0 w-full flex justify-center">
        <nav className=" w-full">
          <div className="relative z-30">
            <div className="container m-auto md:px-12 lg:py-0 lg:px-10">
              <div className="flex flex-wrap items-center justify-between py-4 gap-6 md:gap-0">
                <input
                  type="checkbox"
                  name="toggle_nav"
                  id="toggle_nav"
                  className="peer hidden"
                />
                <div className="w-full px-6 flex justify-between md:w-max md:px-0 z-30">
                  <Link to="/" className="flex items-center" aria-label="logo">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/001/191/986/original/circle-logo-png.png"
                      className="w-10 dark:hidden"
                      alt="Chose Yours"
                      width="144"
                      height="68"
                    />
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/001/191/986/original/circle-logo-png.png"
                      className="w-10 hidden dark:block"
                      alt="Chose Yours"
                      width="144"
                      height="68"
                    />
                    <p className="ml-1 text-xl font-semibold">Plan N Design </p>
                  </Link>

                  <div className="flex items-center md:hidden max-h-10">
                    <label
                      role="button"
                      for="toggle_nav"
                      aria-label="humburger"
                      id="hamburger"
                      className="relative p-2"
                    >
                      <div
                        id="line"
                        className="m-auto h-0.5 w-6 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
                      ></div>
                      <div
                        id="line2"
                        className="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
                      ></div>
                    </label>
                  </div>
                </div>
                <label
                  for="toggle_nav"
                  className="hidden peer-checked:block fixed w-full h-full left-0 top-0 z-10 bg-green-200 bg-opacity-30 backdrop-blur backdrop-filter"
                ></label>
                <div
                  className="hidden z-40 peer-checked:flex w-11/12 mx-auto md:mx-0 flex-col 
                            justify-end items-center gap-y-8 p-6 
                            rounded-xl bg-white dark:bg-gray-800 md:flex md:w-8/12 
                            md:gap-y-0 md:gap-x-4 md:divide-x md:p-0 
                            md:flex-row md:bg-transparent lg:w-7/12"
                >
                  <div className="block w-full md:w-max">
                    <ul
                      className="gap-y-6 tracking-wide 
                                    text-gray-500 dark:text-gray-300 font-medium flex flex-col md:flex-row md:gap-y-0"
                    >
                      <li>
                        <Link to="/" className="block md:px-4">
                          <div
                            className="relative text-green-600 dark:text-green-400
                                                            before:absolute before:-bottom-2 md:before:-bottom-7 before:w-full before:h-1 before:mx-auto before:mt-auto before:rounded-t-full before:bg-green-500"
                          >
                            <span>Home</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <a href="#/" className="block md:px-4 group">
                          <div
                            className="relative group
                                                            before:absolute before:-bottom-2 md:before:-bottom-7 before:w-full before:h-0.5 before:origin-left before:mt-auto before:rounded-full before:bg-green-800 before:transition before:scale-x-0 group-hover:before:scale-x-100"
                          >
                            <span className="group-hover:text-green-500">
                              Services
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#/" className="block md:px-4 group">
                          <div
                            className="relative group
                                                            before:absolute before:-bottom-2 md:before:-bottom-7 before:w-full before:h-0.5 before:origin-left before:mt-auto before:rounded-full before:bg-green-800 before:transition before:scale-x-0 group-hover:before:scale-x-100"
                          >
                            <span className="group-hover:text-green-500">
                              About
                            </span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="w-full pl-2
                                sm:w-max gap-4 flex min-w-max flex-col sm:flex-row"
                  >
                    {user?.email ? (
                      <button
                        onClick={handleLogOut}
                        type="button"
                        title="Start buying"
                        className="w-full py-3 px-6 rounded-xl text-center transition bg-green-600 hover:bg-green-700 active:bg-green-800 focus:bg-green-500 sm:w-max"
                      >
                        <span className="block text-white font-semibold">
                          Logout
                        </span>
                      </button>
                    ) : (
                      <Link to={"/login"}>
                        {" "}
                        <button
                          type="button"
                          title="Start buying"
                          className="w-full py-3 px-6 rounded-xl text-center transition bg-green-600 hover:bg-green-700 active:bg-green-800 focus:bg-green-500 sm:w-max"
                        >
                          <span className="block text-white font-semibold">
                            Login
                          </span>
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="container h-4 -mt-6 mx-auto bg-green-600/30 dark:bg-green-900/30 blur md:-mt-4"
          ></div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
