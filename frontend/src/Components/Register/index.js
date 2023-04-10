import React, { useState } from "react";
import axios from "axios"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import("./style.css");


const Register = () => {
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector((state) => {
        return {
            isLoggedIn: state.auth.isLoggedIn,
        };
    });

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const role_id = 2
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);

    const registerforuser = async () => {
        axios.post("http://localhost:5000/register", {
            userName,
            email,
            password,
            role_id
        }).then((result) => {
            if (result.data.success) {
                setStatus(true);
                navigate("/");
                return setMessage(result.data.massage);
            }
        }).catch((err) => {
            setStatus(false);
            return setMessage(err.response.data.massage);
        })
    }

    return (
    //     <>
    //     <div className="Form2">
    //         {!isLoggedIn ? (
    //             <div className="AllForm">
    //                 <p className="Title">Register:</p>
    //                 <div className="InputAndButton">
    //                     <input className="loginInput2"
    //                         type="text"
    //                         placeholder="First Name"
    //                         onChange={(e) => setFirstName(e.target.value)}
    //                     />
    //                     <br />
    //                     <input className="loginInput2"
    //                         type="email"
    //                         placeholder="Email"
    //                         onChange={(e) => setEmail(e.target.value)}
    //                     />
    //                     <br />
    //                     <input className="loginInput2"
    //                         type="password"
    //                         placeholder="Password"
    //                         onChange={(e) => setPassword(e.target.value)}
    //                     />
    //                     <br />
    //                     <button className="buttonlogin2" onClick={() => {
    //                         registerforuser()
    //                     }}>Register</button>
    //                 </div>
    //                 {status ? message && <div >{message}</div> : message && <div >{message}</div>}
    //             </div>
    //         ) : (
    //             <p>Logout First</p>
    //         )}
    //     </div>
    // </>
        
        <div className="continer">
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <div className="login">
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input type="text" className="login__input" placeholder="Username"
                                    onChange={(e) => setUserName(e.target.value)} />
                                <input type="text" className="login__input" placeholder=" Email"
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input type="password" className="login__input" placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="button login__submit"
                                onClick={() => {
                                    registerforuser()
                                }}
                            >
                                <span className="button__text">register</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                        </div>
                        <div className="message__login">
                            {status ? message && <div  >{message}</div> : message && <div >{message}</div>}
                        </div>

                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
