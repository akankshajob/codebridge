/ pages/Register.js
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register1 = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(form)
        axios.post('http://localhost:5000/register', form)
        .then((res) => {
            console.log(res.data);
            toast.success('Registration successful!');
            navigate('/'); // redirect to login
        })
        .catch((err) => {
            toast.error(err.response?.data?.message || 'Registration failed');
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
            />
            <button type="submit">Register</button>
            <p>already have an account? <Link to="/login">Login</Link></p>
        </form>
    );
};

export default Register1;