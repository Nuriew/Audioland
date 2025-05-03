import React from 'react';
import './ContactUs.css';
import './ContactRes.css';

const ContactUs = () => {
    return (
        <div className="contact-container">
            <div className="contact-form"> 
            <h1>Contact Us</h1>
            <p>Please feel free to contact us with any questions or feedback.</p>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="name" id="name" name="name" />
                    <br></br>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                    <br></br>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message"></textarea>

                    <button type="submit">Submit</button>
                </div>  
            </div>
        </div>
    );
}

export default ContactUs;
