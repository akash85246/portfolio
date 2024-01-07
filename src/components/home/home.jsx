import { useState, useEffect } from "react";
import Footer from "../../utils/footbar/footbar";
import Navbar from "../../utils/navbar/navbar";
import ProfilePhoto from "../../utils/profilePhoto/photo";

import Popout from "react-popout";
import About from "../about/about";
import Education from "../Education/education";
import Skills from "../skills/skills";
import Resume from "../resume/resume";
import Service from "../service/service";
import Contact from "../contacts/contact";

export default function Home() {
  return (
    <div className="bg-black flex justify-between w-screen flex-col text-white overflow-x-hidden">
      <Navbar></Navbar>
      <section id="home">
        <div
          className=" h-screen flex justify-between items-center px-32 rounded-3xl
      "
        >
          <div>
            <ProfilePhoto />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold p-10">
              Hello ! I am Akash Rajput
            </h3>
            <h1 className="text-4xl font-bold p-10 pt-0 ">
              <span className="flex">
                As a &nbsp;
                <span className="text-blue-500"> front-end storyteller</span>,
              </span>
              I weave narratives through pixels and code. Let&apos;s create a
              digital saga that unfolds seamlessly, where each interaction is a
              plot twist, and every page turn leads to a captivating user
              journey.
            </h1>
          </div>
        </div>
      </section>
      <section className=" h-screen" id="about">
        <About></About>
      </section>
      <section className=" h-screen" id="education">
        <Education></Education>
      </section>
      <section className=" h-screen" id="skill">
        <Skills></Skills>
      </section>
      <section className=" h-screen" id="work">
        hello
      </section>

      <section className=" h-screen" id="resume">
        <Resume></Resume>
      </section>
      <section className=" h-screen" id="service">
        <Service></Service>
      </section>
      <footer className=" h-screen" id="contact">
        <Contact></Contact>
      </footer>
    </div>
  );
}
