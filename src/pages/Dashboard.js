import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import the Sidebar component
import './Dashboard.css'; // Assuming you have a CSS file for layout

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // If no token is found, redirect to login page
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* Render Sidebar here */}
      
      <div className="dashboard-content">
        <h1>مرحبًا بك في لوحة التحكم</h1>

        {/* Statistics Section */}
        <div className="stats-container">
          <div className="stat-box">
            <h3>إجمالي المستخدمين</h3>
            <p>150</p>
          </div>
          <div className="stat-box">
            <h3>عدد المدرسين</h3>
            <p>30</p>
          </div>
          <div className="stat-box">
            <h3>عدد الفصول</h3>
            <p>12</p>
          </div>
          <div className="stat-box">
            <h3>إجمالي المدفوعات</h3>
            <p>$10,000</p>
          </div>
        </div>

        {/* Add other dashboard content */}
        <div className="recent-activity">
          <h2>النشاط الأخير</h2>
          <ul>
            <li>تسجيل جديد: محمد علي</li>
            <li>تحديث الفصل: 2A</li>
            <li>تم تعيين مدرس جديد: أ. فاطمة</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
