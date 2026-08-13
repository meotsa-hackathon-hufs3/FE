import { Outlet } from "react-router";
import './LoginLayout.css';
import logo from '../assets/logo.png'
import LoginButton from "../components/LoginButton/LoginButton";

export default function LoginLayout() {
    return (
        <div className="loginLayout">
            <div className="loginLayoutBar">
                <img src={logo} alt="" />
            </div>
            <Outlet />
        </div>
    )
}