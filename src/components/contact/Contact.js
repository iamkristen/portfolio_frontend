import React, { useState, useCallback } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im"; // Import spinner icon
import Title from "../home/Title";
import { useContactData } from "../../context/contact";

const Contact = () => {
  const {
    address,
    email: contactEmail,
    phone,
    freelance,
    openTo,
  } = useContactData();

  const [formData, setFormData] = useState({
    clientName: "",
    inputEmail: "",
    messages: "",
  });

  const [errors, setErrors] = useState({
    clientName: false,
    inputEmail: false,
    messages: false,
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const emailValidation = useCallback((inputEmail) => {
    return String(inputEmail)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const { clientName, inputEmail, messages } = formData;

    const newErrors = {
      clientName: !clientName,
      inputEmail: !inputEmail || !emailValidation(inputEmail),
      messages: !messages,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false); // Stop loading on validation error
      return;
    }

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
        setFormData({ clientName: "", inputEmail: "", messages: "" });
      } else {
        setErrorMsg("Failed to send the message. Please try again later.");
        console.error("Failed to send message:", response.data.error);
      }
    } catch (error) {
      setErrorMsg("Error sending message. Please try again later.");
      console.error("Error sending message:", error);
    } finally {
      setLoading(false); // Stop loading after request is complete
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
          <form className="p-6 flex flex-col gap-6">
            <div className="w-full flex flex-col lgl:flex-row gap-4 lgl:gap-10 justify-between">
              <input
                name="clientName"
                onChange={handleChange}
                value={formData.clientName}
                className={`${
                  errors.clientName
                    ? "border-red-600 focus-visible:border-red-600"
                    : "border-zinc-600 focus-visible:border-designColor"
                } w-full bg-transparent border-2 px-4 py-2 text-base text-gray-200 outline-none duration-300`}
                type="text"
                placeholder="Full Name"
              />
              <input
                name="inputEmail"
                onChange={handleChange}
                value={formData.inputEmail}
                className={`${
                  errors.inputEmail
                    ? "border-red-600 focus-visible:border-red-600"
                    : "border-zinc-600 focus-visible:border-designColor"
                } w-full bg-transparent border-2 px-4 py-2 text-base text-gray-200 outline-none duration-300`}
                type="email"
                placeholder="Email Address"
              />
            </div>
            <textarea
              name="messages"
              onChange={handleChange}
              value={formData.messages}
              className={`${
                errors.messages
                  ? "border-red-600 focus-visible:border-red-600"
                  : "border-zinc-600 focus-visible:border-designColor"
              } w-full bg-transparent border-2 px-4 py-2 text-base text-gray-200 outline-none duration-300 resize-none`}
              placeholder="Your Message"
              rows="4"
            ></textarea>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <button
              onClick={handleSend}
              className="text-base w-44 flex items-center gap-2 justify-center text-gray-200 hover:text-designColor duration-200"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <>
                  <ImSpinner2 className="animate-spin" /> {/* Spinner icon */}
                  Sending...
                </>
              ) : (
                <>
                  Send Message{" "}
                  <span className="mt-1 text-designColor">
                    <FiSend />
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
