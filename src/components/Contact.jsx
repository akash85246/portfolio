import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/slices/authSlice";
import { setUser, clearUser } from "../redux/slices/userSlice";
import React, { useEffect } from "react";
import Chat from "../utils/Chat.jsx";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import socket from "../socket.js";


function Contact() {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const admin = import.meta.env.VITE_ADMIN_GMAIL;
  // const isAdmin = user.email === admin;
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
  }, [user,isAuthenticated]);

  return (
    <section className="next-section contact p-5" id="contact">
      <h1 className="section-heading">GET IN TOUCH</h1>
      <div className="grid grid-cols-3 items-center justify-center mt-8 gap-6">

        {isAuthenticated ? (<>
       
          <Chat />
          </>

        ) : (
          <div className="bg-white/5 col-span-2 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10 flex flex-col flex-1 items-center justify-center gap-10 relative min-h-[60vh] transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
            <div className="flex flex-col items-center text-center gap-5">
              <h2 className="text-2xl text-white font-semibold">
                Let’s Connect!
              </h2>
              <p className="text-white/70 text-sm max-w-[28ch]">
                Want to reach out? Sign in and start a direct chat with me — no
                forms, just a real conversation.
              </p>
            </div>

            <div className="flex flex-col gap-5 w-full max-w-xs">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 w-full px-5 py-3 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all duration-200 shadow-md"
              >
                <GoogleIcon className="text-lg" />
                Login with Google
              </button>

              <button
                onClick={handleGithubLogin}
                className="flex items-center justify-center gap-3 w-full px-5 py-3 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-900 rounded-xl transition-all duration-200 shadow-md"
              >
                <GitHubIcon className="text-lg" />
                Login with GitHub
              </button>
            </div>
          </div>
        )}
        <div></div>
      </div>
    </section>
  );
}

export default Contact;
