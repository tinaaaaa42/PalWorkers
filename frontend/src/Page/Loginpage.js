import React, { useState } from 'react';
import "../CSS/login.css"
import { useNavigate } from 'react-router-dom';
import {login} from "../service/login";
import async from "async";
import {register} from "../service/register";

function Loginpage(){
    const navigate = useNavigate();
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registerUser, setRegisterUser] = useState()
    const [registerEmail, setRegisterEmail] = useState()
    const [registerPassword, setRegisterPassword] = useState()
    const handlePanelToggle = () => {
        setIsPanelActive(prevState => !prevState);
    };
    const handleLogin = async () => {
        const isAuthenticated = await login(email, password);
        if (isAuthenticated.status == 'success') {
          navigate("/kanban");
        } else {
          alert("邮箱或密码错误！");
          setEmail('');
          setPassword('');
        }
    };
    const handleRegister = async() => {
        let res = await register(registerUser,registerEmail,registerPassword);
        if (res) {
            alert("success")
        }
        else {
            alert("failed")
        }
    }

    return (
        <div className="login">
            <div className={`container ${isPanelActive ? ' panel-active' : ''}`}>
                <div className="container-form container-signup">
                    <form action="#" className="form" id="form1">
                        <h2 className="form-title">注册账号</h2>
                        <input type="text" placeholder="User"className="input" value={registerUser} onChange={(e) => setRegisterUser(e.target.value)}></input>
                        <input type="email"placeholder="Email" className="input" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)}></input>
                        <input type="password" placeholder="password" className="input" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}></input>
                        <button type="button" className="btn" onClick={handleRegister}>点击注册</button>
                    </form>
                </div>
                <div className="container-form container-signin">
                    <form action="#" className="form" id="form2">
                        <h2 className="form-title">欢迎登录</h2>
                        <input type="email"  placeholder="email"className="input" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input type="password" placeholder="password"className="input" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <a href="#" className="link">忘记密码?</a>
                        <button type="button" className="btn" onClick={handleLogin}>登录</button>
                    </form>
                </div>
                <div className="container-overlay">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <button className="btn" id="signIn" onClick={handlePanelToggle}>
                                已有账号，直接登录
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <button className="btn" id="signUp" onClick={handlePanelToggle}>
                                没有账号，点击注册
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Loginpage;