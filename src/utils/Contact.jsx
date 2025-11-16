import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/slices/authSlice";
import { setUser, clearUser } from "../redux/slices/userSlice";
import React, { useRef, useEffect } from "react";
import Chat from "../utils/Chat.jsx";
import { Mail, CircleUser } from "lucide-react";
import github from "../assets/Icons/github.svg";
import google from "../assets/Icons/google.svg";

import axios from "axios";
import socket from "../socket.js";
import pattern from "../assets/Patterns/chatPattern.png";

import { motion, useInView } from "framer-motion";

function Contact() {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const contactRef = useRef(null);
  const isInView = useInView(contactRef, { once: true, margin: "-100px" });

  const isAuthenticated = auth.isAuthenticated;
  const jwt = auth.jwt;
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/google/signin`,
      "_blank",
      "width=500,height=600"
    );
  };

  const handleGithubLogin = async () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/github/signin`,
      "_blank",
      "width=500,height=600"
    );
  };

  useEffect(() => {
    const receiveMessage = async (event) => {
      if (event.origin !== `${import.meta.env.VITE_BACKEND_URL}`) {
        return;
      }
      const { success, token } = event.data || {};
      if (!success || !token) {
        console.warn("Invalid data received:", event.data);
        return;
      }
      dispatch(login({ jwt: token }));
    };
    window.addEventListener("message", receiveMessage);
    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, [dispatch]);

  //get user info
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const userObj = res.data.user[0];

            dispatch(setUser(userObj));
          } else {
            console.error("Failed to fetch user data:", res);
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 403) {
            dispatch(logout());
            dispatch(clearUser());
          }
          console.error("Error fetching user:", err);
        });
    }
  }, [isAuthenticated, jwt, dispatch]);

  useEffect(() => {
    if (isAuthenticated && user.id) {
      socket.connect();
      socket.emit("user_connected", user.id);
    }

    return () => {
      socket.disconnect();
    };
  }, [user, isAuthenticated]);

  return (
    <div
      className=" items-center justify-center gap-6"
      id="contact"
    >
      {isAuthenticated ? (
        <>
          <Chat />
        </>
      ) : (
        <div className="font-inter p-4 md:p-4 lg:p-8  flex flex-col flex-1  justify-center gap-10 relative transition-all duration-300 font-inter">
          <div className="flex flex-col items-center text-center gap-5">
            <h2 className="text-base md:text-xl lg:text-2xl text-white font-semibold">
              Let’s Connect!
            </h2>
            <p className="text-white/70 text-[0.8rem] sm:text-xs  md:text-sm max-w-[50ch]">
              Want to reach out? Sign in and start a direct chat with me — no
              forms, just a real conversation.
            </p>
          </div>

          <div className="flex flex-col gap-2  md:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-2">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 w-full px-4 sm:px-5 py-2.5 sm:py-3 text-lg font-medium text-black bg-[linear-gradient(90deg,#E9B0FF_0%,#4D84FA_100%)] rounded-xl hover:scale-110 transition-all duration-200 shadow-md"
              aria-label="Login with Google"
            >
              <img src={google} className=" h-8 w-8"></img>
              Login with Google
            </button>

            <div className="p-[1px] rounded-xl bg-[linear-gradient(90deg,#E9B0FF_0%,#4D84FA_100%)]  hover:scale-110">
              <button
                onClick={handleGithubLogin}
                className="flex items-center justify-center gap-2 w-full px-4 sm:px-5 py-2.5 sm:py-3 
               text-lg font-medium text-white bg-zinc-800 
               rounded-xl transition-all duration-200 shadow-md"
                aria-label="Login with GitHub"
              >
                <img src={github} className="h-8 w-8" />
                Login with GitHub
              </button>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 my-3 sm:my-4">
              <hr className="flex-grow border-t border-gray-600" />
              <p className="text-center text-gray-400 text-lg font-medium">
                or
              </p>
              <hr className="flex-grow border-t border-gray-600" />
            </div>

            <a
              href="mailto:akash.rajput.dev@gmail.com"
              className="flex items-center justify-center gap-2 w-full px-4 sm:px-5 py-2.5 sm:py-3 text-[lg font-medium text-white bg-[#4D84FA] hover:scale-110 rounded-xl transition-all duration-200 shadow-md"
              aria-label="Contact via Email"
            >
              <Mail className="text-lg" />
              Contact via Email
            </a>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
}

export default Contact;
