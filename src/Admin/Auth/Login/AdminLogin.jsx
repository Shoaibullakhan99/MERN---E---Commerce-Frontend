import React, { useEffect, useState } from 'react'
import { Avatar, BUtton, Checkbox, CssBaseline, FormControlLabel } from '@mui/material';
import {Box, Container} from "@mui/system";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        key: ""
    })
    const [showPasswrd, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPasswrd);
    };
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value})
    }
    useEffect(() => {
        let auth = localStorage.getItem('Authorization');
        if(auth) {
            navigate('/')
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        try {
            if(!credentials.email && !credentials.password) {
                toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
            }
            else if (!emailRegex.test(credentials.email)){
                toast.error("Please enter a valid email", {autoclose: 500, theme: 'colored' })
            }
            else if (credentials.password.length < 5){
                toast.error("Please enter a valid password", { autoClose: 500, theme: 'colored' })
            }
            else if (credentials.email && credentials.password) {
                const sendAuth = await axios.post(process.env.REACT_APP_ADMIN_LOGIN,
                    {
                        email: credentials.email,
                        password: credentials.password,
                        key: credentials.key
                    })
                const recieve = await sendAuth.data 
                if(recieve.success === true) {
                    toast.success("Login Successfull", { autoclose: 500, theme: 'colored' })
                    localStorage.setItem('Authorization', recieve.authToken)
                    navigate('/admin/home')
                } else {
                    toast.error("Invalid Credentials", { autoclose: 500, theme: 'colored' })
                }
            }
        } 
        catch (error) {
            toast.error("Invalid Credentials", { autoclode: 500, theme: 'colored' })
        }
    }

    return (
        <Container component="main" maxWidht="xs">

        </Container>
    )
}

export default AdminLogin