import React, { useState } from "react";
import './FAQ.css'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const faqData = [
    {
      question: "Is it legal to use this site?",
      answer: "If you can't download the audio files for your own personal use, that's okay. You should be careful with copyrighted content.",
    },
    {
      question: "Do I need to register while downloading?",
      answer: "No. You do not need to register to use it.",
    },
    {
      question: "Is this service paid?",
      answer: "No, it is completely free.",
    },
  ];

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div key={index} onClick={() => toggle(index)} className="faq-item">
          <h3 className="faq-question">
            {item.question}
          </h3>
          {openIndex === index && <p>{item.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
