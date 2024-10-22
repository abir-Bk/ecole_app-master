import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People'; // Icon for Teachers
import ClassIcon from '@mui/icons-material/Class'; // Icon for Classes
import PersonIcon from '@mui/icons-material/Person'; // Icon for Users
import SchoolIcon from '@mui/icons-material/School'; // Icon for Students (Eleves)
import './Sidebar.css'; // Assuming you have a separate CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>لوحة القيادة</h3>
      <List>
        <ListItem button component={Link} to="/teachers">
          <ListItemIcon>
            <PeopleIcon style={{ color: 'white' }} /> {/* Icon for Teachers */}
          </ListItemIcon>
          <ListItemText primary="المدرسين" />
        </ListItem>
        <ListItem button component={Link} to="/classes">
          <ListItemIcon>
            <ClassIcon style={{ color: 'white' }} /> {/* Icon for Classes */}
          </ListItemIcon>
          <ListItemText primary="الفصول" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemIcon>
            <PersonIcon style={{ color: 'white' }} /> {/* Icon for Users */}
          </ListItemIcon>
          <ListItemText primary="المستخدمين" />
        </ListItem>
        {/* Add the new ListItem for Eleves */}
        <ListItem button component={Link} to="/eleve">
          <ListItemIcon>
            <SchoolIcon style={{ color: 'white' }} /> {/* Icon for Students (Eleves) */}
          </ListItemIcon>
          <ListItemText primary="الطلاب" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
