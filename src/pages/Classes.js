import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import Sidebar from './Sidebar'; // Adjust the path as needed
import './Classes.css'; // Importing the CSS file

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const niveaux = ['7 أساسي', '8 أساسي', '9 أساسي'];

  useEffect(() => {
    axios
      .get('http://localhost:9091/api/classes')
      .then((response) => {
        setClasses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('خطأ في جلب الفصول');
        setLoading(false);
      });
  }, []);

  // Function to handle deleting a class by ID
  const handleDeleteClass = (id_classe) => {
    axios
      .delete(`http://localhost:9091/api/classes/${id_classe}`)
      .then(() => {
        // Update the classes list after deletion
        setClasses(classes.filter((classe) => classe.id_classe !== id_classe));
      })
      .catch((error) => {
        setError('خطأ في حذف الفصل');
      });
  };

  const handleAddClass = () => {
    if (newClass && selectedNiveau) {
      axios
        .post('http://localhost:9091/api/classes', {
          nom_classe: newClass,
          niveau_classe: selectedNiveau,
        })
        .then((response) => {
          setClasses([...classes, response.data]);
          setNewClass('');
          setSelectedNiveau('');
        })
        .catch((error) => setError('خطأ في إضافة الفصل'));
    } else {
      alert('يرجى اختيار مستوى وتقديم اسم الفصل.');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>إدارة الفصول</h1>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            <div className="input-container">
              <TextField
                label="اسم الفصل"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <FormControl style={{ minWidth: 120 }}>
                <InputLabel>المستوى</InputLabel>
                <Select
                  value={selectedNiveau}
                  onChange={(e) => setSelectedNiveau(e.target.value)}
                >
                  {niveaux.map((niveau) => (
                    <MenuItem key={niveau} value={niveau}>
                      {niveau}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddClass}
                style={{ marginLeft: '10px' }}
              >
                إضافة
              </Button>
            </div>

            <div className="classes-list">
              {niveaux.map((niveau) => (
                <div key={niveau} className="niveau-section">
                  <h3>{niveau}</h3>
                  {classes.filter((classe) => classe.niveau_classe === niveau)
                    .length > 0 ? (
                    <ul className="class-list">
                      {classes
                        .filter((classe) => classe.niveau_classe === niveau)
                        .map((classe) => (
                          <li key={classe.id_classe} className="class-item">
                          <div className="class-item-content">
                        <span>{classe.niveau_classe} {classe.nom_classe}</span>
                       <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClass(classe.id_classe)} 
                      style={{ fontSize: '12px', padding: '5px 10px' }}
                      >
                      حذف
                     </Button>
                     </div>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p>لا توجد فصول متاحة لهذا المستوى.</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Classes;
