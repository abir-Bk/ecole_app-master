import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call pour envoyer un email de réinitialisation (ajuster l'URL selon ton backend)
      await axios.post('http://localhost:9091/api/auth/forgot-password', { email });
      setMessage('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
    } catch (error) {
      setMessage('حدث خطأ، الرجاء المحاولة مرة أخرى');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>إعادة تعيين كلمة المرور</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">إرسال رابط إعادة التعيين</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
