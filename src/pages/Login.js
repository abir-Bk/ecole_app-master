import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Static admin credentials
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin123';

    // Check if the entered credentials match the admin credentials
    if (email === adminEmail && password === adminPassword) {
      // Store some dummy token to mimic successful login
      localStorage.setItem('token', 'admin-token');
      navigate('/dashboard');
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>تسجيل الدخول</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">تسجيل الدخول</button>
        </form>

        <div className="extra-text">
          <p>
            نسيت كلمة المرور؟ <Link to="/forgot-password">إعادة تعيين</Link>
          </p>
          <p>
            جديد هنا؟ <Link to="/register">أنشئ حسابًا</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
