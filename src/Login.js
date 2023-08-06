import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Button, TextField, Link } from "@material-ui/core";

const baseUrl = process.env.REACT_APP_URL;

export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("savedUser");
        if (savedUser) {
            const { username, password } = JSON.parse(savedUser);
            setUser({ username, password });
            login(username, password);
        }
    }, []);

    const onChange = (event) => {
        event.persist();
        setUser((user) => {
            return {
                ...user,
                [event.target.name]: event.target.value,
            };
        });
    };

    const login = (username, password) => {
        axios
            .post(baseUrl + "/login", {
                username,
                password,
            })
            .then((response) => {
                // Clear previous user details in local storage
                localStorage.removeItem("savedUser");
                // Save new user details in local storage
                localStorage.setItem("savedUser", JSON.stringify({ username, password }));
                navigate("/dashboard");

                Swal.fire({
                    title: 'You are Logged In',
                    text: 'Successfully Logged In',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                });
            })
            .catch((error) => {
                Swal.fire({
                    text: "Wrong Username or Password",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000
                });
            });
    };

    const handleLogin = () => {
        const { username, password } = user;
        if (username && password) {
            login(username, password);
        }
    };

    const inputStyle = { WebkitBoxShadow: "0 0 0 1000px white inset" };



    return (
        <div style={{ marginTop: "100px" }}>
            <div>
                <h2 style={{ color: "#1C6758" }}>LOGIN</h2>
                <br />
            </div>

            <div>
                <TextField
                    id="standard-basic"
                    type="text"
                    autoComplete="off"
                    name="username"
                    value={user.username}
                    onChange={onChange}
                    placeholder="Username"
                    required
                    variant="outlined"
                    size="small"
                    inputProps={{ style: inputStyle }}
                />
                <br />
                <br />
                <TextField
                    size="small"
                    id="standard-basic"
                    type="password"
                    autoComplete="off"
                    name="password"
                    variant="outlined"
                    value={user.password}
                    onChange={onChange}
                    placeholder="Password"
                    required
                    inputProps={{ style: inputStyle }}
                />
                <br />
                <br />
                <Button
                    className="button_style"
                    variant="contained"
                    color="primary"
                    size="normal"
                    onClick={handleLogin}
                    style={{ backgroundColor: "#1C6758", color: "white" }}
                >
                    Login
                </Button>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link href="/register" size="normal" style={{ color: "#1C6758" }}>
                    Register
                </Link>
            </div>
        </div>
    );
}
