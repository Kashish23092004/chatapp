import React, { useState } from 'react';
import axios from 'axios';

const mainBg = '#565f70';
const cardBg = '#f9fbfd';
const accent = '#5a6b85';
const primaryBtn = '#5a6b85';
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

const Signup = () => {
  const [form, setForm] = useState({
    Fullname: '',
    Email: '',
    Password: '',
    confirmPassword: ''
  });

  const [animate, setAnimate] = useState(false);
  const [hover, setHover] = useState(false);

  const [confirmError, setConfirmError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmPassword') {
      setConfirmError('');
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (form.Password !== form.confirmPassword) {
    setConfirmError('Passwords do not match');
    return; 
  }

  setAnimate(true);
  
  setTimeout(() => {
    setAnimate(false);
  }, 300);

  const UserInfo = {
    Fullname: form.Fullname,
    Email: form.Email,
    Password: form.Password,
    confirmPassword: form.confirmPassword
  };

  axios.post('http://localhost:3500/test/signup', UserInfo)
    .then(response => {
      console.log(response.data);
      alert('Signup successful!');
      localStorage.setItem('userEmail',form.Email);
    })
    .catch(error=>{
        if(error.response){
            alert(`signup failed : ${error.response.data.message}`);
        }
    })

    
  
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
          lonelyu Signup
        </h2>
        <input
          type="text"
          name="Fullname"
          placeholder="Fullname"
          value={form.Fullname}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={form.Email}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={form.Password}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          style={inputStyle}
        />
        {confirmError && <div style={{ color: 'red', marginBottom: '15px' }}>{confirmError}</div>}
        <div style={{ margin: '10px 0', fontSize: 15 }}>
          Have an account? <a href="/login" style={{ color: linkColor, textDecoration: 'underline' }}>Login</a>
        </div>
        <button
          type="submit"
          style={dynamicButtonStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
