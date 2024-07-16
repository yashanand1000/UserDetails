import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const initialValues = {
        name: "",
        email: "",
        age: "",
        place: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState(""); // New state for success/error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:5000/api/users', formValues);
                if (response.data == 'User details updated successfully') {
                    setFormValues(initialValues); // Clear the form fields
                    setIsSubmit(false); // Reset submit state
                    setMessage('User details updated successfully'); // Set success message
                }
                if (response.data == 'User is Created successfully') {
                  setFormValues(initialValues); // Clear the form fields
                  setIsSubmit(false); // Reset submit state
                  setMessage('User is Created successfully'); // Set success message
              }
              
            } catch (error) {
                console.error('Error submitting user details:', error);
                setMessage('There was an error submitting your details. Please try again.');
            }
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 2000); // Clear the message after 2 seconds

            return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "Name is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        }
        if (!values.age) {
            errors.age = "Age is required!";
        }
        if (!values.place) {
            errors.place = "Place is required!";
        }
        return errors;
    };

    return (
        <>
            <div className="bgImg"></div>
            <div className="container">
                {message && (
                    <div className={`ui message ${message.includes("successfully") ? "success" : "error"}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <h1>User Details</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formValues.name}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.name}</p>
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.email}</p>
                        <div className="field">
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formValues.age}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.age}</p>
                        <div className="field">
                            <label>Place</label>
                            <input
                                type="text"
                                name="place"
                                placeholder="Place"
                                value={formValues.place}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.place}</p>
                        <button className="fluid ui button blue">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default App;
