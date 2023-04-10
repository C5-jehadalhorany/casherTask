import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, role } from "../../redux/reducers/auth/index"
import { useNavigate } from "react-router-dom";
import("./style.css")


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { token, roles } = useSelector((state) => {
        return {
            token: state.auth.token,
            roles: state.auth.roles
        };
    });

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(false);

    const loginForall = async () => {
        axios.post("http://localhost:5000/login", {
            email,
            password
        }).then((result) => {
            if (roles === "admin") {
                setMessage("");
                setStatus(true);
                navigate("/admin")
                dispatch(login(result.data.token))
                dispatch(role(result.data.role))
            } else {
                setMessage("");
                setStatus(true);
                navigate("/")
                dispatch(login(result.data.token))
                dispatch(role(result.data.role))
            }
        }).catch((err) => {
            setStatus(false);
            return setMessage(err.response.data.message);
        })
    }



    return (<div className="continer">
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <div className="login">
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="text" className="login__input" placeholder="User name / Email"
                                onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password" className="login__input" placeholder="Password"
                             onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="button login__submit"
                            onClick={() => {
                                loginForall()
                            }}
                        >
                            <span className="button__text">Log In Now</span>
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

export default Login;