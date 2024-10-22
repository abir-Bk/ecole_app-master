import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Box, TextField, CircularProgress } from '@mui/material';
import Sidebar from './Sidebar'; // Assurez-vous d'importer le bon chemin pour Sidebar

// Modal styles
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'right', // Align text to the right for Arabic
};

const Eleve = () => {
  const [eleves, setEleves] = useState([]);
  const [open, setOpen] = useState(false); // To control modal state
  const [newEleve, setNewEleve] = useState({ nom_eleve: '', prenom_eleve: '', date_naissance: '', nom_parent: '', num_parent: '', id_classe: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the list of students
    axios.get('http://localhost:9091/api/eleves')
      .then(response => {
        setEleves(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Erreur lors de la récupération des élèves');
        setLoading(false);
      });
  }, []);

  const handleOpen = () => setOpen(true);  // Open modal
  const handleClose = () => setOpen(false); // Close modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEleve({ ...newEleve, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post new student to backend
    axios.post('http://localhost:9091/api/eleves', newEleve)
      .then(response => {
        setEleves([...eleves, response.data]); // Add new student to list
        handleClose(); // Close modal
        setNewEleve({ nom_eleve: '', prenom_eleve: '', date_naissance: '', nom_parent: '', num_parent: '', id_classe: '' }); // Reset form
      })
      .catch(error => setError('Erreur lors de la création'));
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar /> {/* Include Sidebar */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>قائمة الطلاب</h2>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          إضافة طالب جديد
        </Button>

        {/* Loading spinner or error message */}
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            {/* List of students */}
            <ul>
              {eleves.map(eleve => (
                <li key={eleve.id_eleve}>
                  {eleve.nom_eleve} {eleve.prenom_eleve}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Modal for adding new student */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <h2 id="modal-title">إضافة طالب جديد</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                label="الاسم"
                name="nom_eleve"
                value={newEleve.nom_eleve}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                inputProps={{ style: { textAlign: 'right' } }} // Text alignment for Arabic
              />
              <TextField
                label="اللقب"
                name="prenom_eleve"
                value={newEleve.prenom_eleve}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                inputProps={{ style: { textAlign: 'right' } }} // Text alignment for Arabic
              />
              <TextField
                label="تاريخ الميلاد"
                name="date_naissance"
                type="date"
                value={newEleve.date_naissance}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ style: { textAlign: 'right' } }} // Text alignment for Arabic
              />
              <TextField
                label="اسم الوالد"
                name="nom_parent"
                value={newEleve.nom_parent}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                inputProps={{ style: { textAlign: 'right' } }} // Text alignment for Arabic
              />
              <TextField
                label="رقم الوالد"
                name="num_parent"
                value={newEleve.num_parent}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                inputProps={{ style: { textAlign: 'right' } }} // Text alignment for Arabic
              />
              
              <Button type="submit" variant="contained" color="primary">
                حفظ
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Eleve;
