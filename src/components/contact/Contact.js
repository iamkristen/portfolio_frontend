import React, { useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import Title from "../home/Title";
import { useContactData } from "../../context/contact";

const Contact = () => {
  const {
    address,
    email: contactEmail,
    phone,
    freelance,
    openTo,
  } = useContactData(); // Access contact data from context

  const [clientName, setClientName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [messages, setMessages] = useState("");
  const [errClientName, setErrClientName] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errMessages, setErrMessage] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const EmailValidation = (inputEmail) => {
    return String(inputEmail)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName(false);
  };

  const handleEmail = (e) => {
    setInputEmail(e.target.value);
    setErrEmail(false);
  };

  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessage(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!clientName) {
      setErrClientName(true);
    }

    if (!inputEmail) {
      setErrEmail(true);
    } else {
      if (!EmailValidation(inputEmail)) {
        setErrEmail(true);
      }
    }

    if (!messages) {
      setErrMessage(true);
    }

    if (clientName && inputEmail && EmailValidation(inputEmail) && messages) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "api/mailbox/add",
          {
            fullName: clientName,
            email: inputEmail,
            message: messages,
          }
        );

        if (response.data.success) {
          setSuccessMsg(
            `Hello ${clientName}, your message has been sent successfully. Thank you for contacting us!`
          );

          setClientName("");
          setInputEmail("");
          setMessages("");
        } else {
          console.error("Failed to send message:", response.data.error);
          // Handle error cases if needed
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="w-full">
      <Title title="Get" subTitle="in Touch" />
      <div className="p-6 w-full flex flex-col md:flex-row justify-between gap-4 md:gap-10 lgl:gap-20">
        <div className="w-full lgl:w-1/2">
          <p className="flex gap-6 justify-between w-full text-lg text-[#ccc] py-4 border-b-[1px] border-b-zinc-800">
            <span className="bg-designColor text-gray-700 text-sm font-titleFont font-medium px-2 rounded-md flex items-center justify-center">
              Address
            </span>
            {address}
          </p>
          <p className="flex justify-between w-full text-lg text-[#ccc] py-4 border-b-[1px] border-b-zinc-800">
            <span className="bg-designColor text-gray-700 text-sm font-titleFont font-medium px-2 rounded-md flex items-center justify-center">
              Phone
            </span>
            {phone}
          </p>
        </div>
        <div className="w-full lgl:w-1/2">
          <p className="flex justify-between lgl:gap-6 w-full text-lg text-[#ccc] py-4 border-b-[1px] border-b-zinc-800">
            <span className="bg-designColor text-gray-700 text-sm font-titleFont font-medium px-2 rounded-md flex items-center justify-center">
              Email
            </span>
            {contactEmail}
          </p>
          <p className="flex justify-between w-full text-lg text-[#ccc] py-4 border-b-[1px] border-b-zinc-800">
            <span className="bg-designColor text-gray-700 text-sm font-titleFont font-medium px-2 rounded-md flex items-center justify-center">
              Freelance
            </span>
            {freelance}
          </p>
          <p className="flex justify-between w-full text-lg text-[#ccc] py-4 border-b-[1px] border-b-zinc-800">
            <span className="bg-designColor text-gray-700 text-sm font-titleFont font-medium px-2 rounded-md flex items-center justify-center">
              Open to
            </span>
            {openTo}
          </p>
        </div>
      </div>
      <div className="w-full mt-10">
        <Title title="Send" subTitle="Messages" />
        {successMsg ? (
          <p className="text-center text-base font-titleFont p-20 text-designColor">
            {successMsg}
          </p>
        ) : (
          <form
            id="form"
            action="https://getform.io/f/e18ee560-5133-4cfe-9a48-eddb6f012a9f"
            method="POST"
            className="p-6 flex flex-col gap-6"
          >
            <div className="w-full flex flex-col lgl:flex-row gap-4 lgl:gap-10 justify-between">
              <input
                onChange={handleName}
                value={clientName}
                className={`${
                  errClientName
                    ? "border-red-600 focus-visible:border-red-600"
                    : "border-zinc-600 focus-visible:border-designColor"
                } w-full bg-transparent border-2 px-4 py-2 text-base text-gray-200 outline-none duration-300`}
                type="text"
                placeholder="Full Name"
              />
              <input
                onChange={handleEmail}
                value={inputEmail}
                className={`${
                  errEmail
                    ? "border-red-600 focus-visible:border-red-600"
                    : "border-zinc-600 focus-visible:border-designColor"
                } w-full bg-transparent border-2 px-4 py-2 text-base text-gray-200 outline-none duration-300`}
                type="email"
                placeholder="Email Address"
              />
            </div>
            <textarea
              onChange={handleMessages}
              value={messages}
              className={`${
                errMessages
                  ? "border-red-600 focus-visible:border-red-600"
                  : "border-zinc-600 focus-visible:border-designColor"
              } w-full bg-transparent border-2 px-4 py-2 text-base text-gray-200 outline-none duration-300 resize-none`}
              placeholder="Your Message"
              rows="4"
            ></textarea>
            <button
              onClick={handleSend}
              className="text-base w-44 flex items-center gap-1 text-gray-200 hover:text-designColor duration-200"
            >
              Send Message{" "}
              <span className="mt-1 text-designColor">
                <FiSend />
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
