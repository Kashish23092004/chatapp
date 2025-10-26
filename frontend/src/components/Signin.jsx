import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const mainBg = '#565f70';
const cardBg = '#f9fbfd';
const accent = '#5a6b85';
const primaryBtn = '#4a5a77';
const buttonPulse = '#304160';
const inputBorder = '#d3d7df';
const textColor = '#1d2936';
const linkColor = '#5a6b85';

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  borderRadius: '6px',
  border: `1px solid ${inputBorder}`,
  background: cardBg,
  color: textColor,
  fontSize: '16px'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '6px',
  background: primaryBtn,
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  fontSize: '16px',
  marginTop: '10px',
  cursor: 'pointer',
  transition: 'transform 0.18s cubic-bezier(.17,.67,.83,.67), background 0.18s'
};

const buttonAnimateStyle = {
  ...buttonStyle,
  background: buttonPulse,
  transform: 'scale(1.07)'
};

const buttonHoverStyle = {
  background: buttonPulse
};

const Signin = () => {
  const [form, setForm] = useState({
    Email: '',
    Password: ''
  });

  const [animate, setAnimate] = useState(false);
  const [hover, setHover] = useState(false);
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 300);

    const UserInfo = {
      Email: form.Email,
      Password: form.Password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3100/api/test/login",
        UserInfo,
        { withCredentials: true }
      );
      
      console.log('Login response:', response.data);
      
      const userData = {
        _id: response.data._id,
        Email: response.data.Email,
        Fullname: response.data.Fullname
      };
      
      localStorage.setItem('lonelyu', JSON.stringify(userData));
      setAuthUser(userData);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        alert(`${error.response.data.message}`);
      } else {
        alert('Login failed. Please try again.');
      }
    }
  };

  let dynamicButtonStyle = buttonStyle;
  if (animate) {
    dynamicButtonStyle = buttonAnimateStyle;
  } else if (hover) {
    dynamicButtonStyle = { ...buttonStyle, ...buttonHoverStyle };
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: mainBg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: cardBg,
          borderRadius: '10px',
          padding: '32px 36px',
          minWidth: '340px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.09)',
        }}
      >
        <h2 style={{ color: accent, marginBottom: '20px', fontWeight: 700, fontSize: 26 }}>
          Login
        </h2>
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={form.Email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={form.Password}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={{ margin: '10px 0', fontSize: 15 }}>
          Don't have an account? <a href="/signup" style={{ color: linkColor, textDecoration: 'underline' }}>Signup</a>
        </div>
        <button
          type="submit"
          style={dynamicButtonStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Signin;