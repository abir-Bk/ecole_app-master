import React, { useState } from 'react';
import './Login.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear messages
    setErrorMessage('');
    setSuccessMessage('');

    // Add basic validation
    if (username === '' || email === '' || password === '') {
      setErrorMessage('يرجى ملء جميع الحقول');
      return;
    }

    try {
      const response = await fetch('http://localhost:9091/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('تم التسجيل بنجاح!');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage(data.message || 'حدث خطأ أثناء التسجيل');
      }
    } catch (error) {
      setErrorMessage('فشل الاتصال بالخادم');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>تسجيل حساب جديد</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">اسم المستخدم</label>
          <input
            id="username"
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            id="email"
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <label htmlFor="password">كلمة المرور</label>
          <input
            id="password"
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">تسجيل</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="extra-text">
          <p>
            هل لديك حساب بالفعل؟ <a href="/login">تسجيل الدخول</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
