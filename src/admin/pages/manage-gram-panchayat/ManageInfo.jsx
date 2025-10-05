import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  LinearProgress,
  Snackbar,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { PhotoCamera, Save, Edit } from '@mui/icons-material';

// Firebase imports
import { db, storage } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ManageInfo = () => {
  const [formData, setFormData] = useState({
    details: '',
    photo: '',
  });
  const [gpName, setGpName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Fetch existing data for both profile (for the name) and mainInfo
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Gram Panchayat Name
        const profileDocRef = doc(db, 'grampanchayat', 'profile');
        const profileSnap = await getDoc(profileDocRef);
        if (profileSnap.exists() && profileSnap.data().title) {
          setGpName(profileSnap.data().title);
        } else {
          setGpName('N/A');
        }

        // Fetch Main Info Details and Photo
        const infoDocRef = doc(db, 'grampanchayat', 'mainInfo');
        const infoSnap = await getDoc(infoDocRef);
        if (infoSnap.exists()) {
          // Make sure not to overwrite with a non-existent title
          const { title, ...restData } = infoSnap.data();
          setFormData(restData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setNotification({ open: true, message: 'Data could not be loaded!', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `info_section/${file.name}_${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setNotification({ open: true, message: 'Photo upload failed!', severity: 'error' });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, photo: downloadURL }));
          setUploadProgress(0);
          setNotification({ open: true, message: 'Photo uploaded successfully!', severity: 'success' });
        });
      }
    );
  };

  const handleSubmit = async () => {
    if (!formData.details) {
        setNotification({ open: true, message: 'कृपया संपूर्ण माहिती भरा.', severity: 'warning' });
        return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, 'grampanchayat', 'mainInfo');
      // Ensure 'title' is not part of the object being saved here
      const dataToSave = {
        details: formData.details,
        photo: formData.photo,
      };
      await setDoc(docRef, dataToSave, { merge: true });
      setNotification({ open: true, message: 'माहिती यशस्वीरित्या सेव्ह झाली!', severity: 'success' });
      setIsEditing(false);
    } catch (error) {
      setNotification({ open: true, message: 'माहिती सेव्ह करण्यात अयशस्वी!', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4">
              माहिती व्यवस्थापन
            </Typography>
            {!isEditing && (
                <Button variant="contained" startIcon={<Edit />} onClick={() => setIsEditing(true)}>
                    Edit
                </Button>
            )}
        </Box>
        
        <Chip label={`ग्रामपंचायत: ${gpName}`} color="primary" sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <TextField
              fullWidth
              multiline
              rows={14}
              label="संपूर्ण माहिती"
              name="details"
              value={formData.details || ''}
              onChange={handleInputChange}
              variant="outlined"
              disabled={!isEditing}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography variant="h6" gutterBottom>
              फोटो
            </Typography>
            <Box
              sx={{
                border: isEditing ? '2px dashed #ccc' : '2px solid #eee',
                borderRadius: 2,
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${formData.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {!formData.photo && <Typography color="text.secondary">फोटो येथे दिसेल</Typography>}
            </Box>
            {isEditing && (
                <Box>
                    <Button
                        fullWidth
                        variant="outlined"
                        component="label"
                        startIcon={<PhotoCamera />}
                        sx={{ mt: 2 }}
                        disabled={uploadProgress > 0}
                    >
                        फोटो बदला
                        <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                    </Button>
                    {uploadProgress > 0 && <LinearProgress variant="determinate" value={uploadProgress} sx={{ mt: 2 }} />}
                </Box>
            )}
          </Grid>
        </Grid>
        
        {isEditing && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={saving || uploadProgress > 0}
                startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
                onClick={handleSubmit}
              >
                {saving ? 'सेव्ह होत आहे...' : 'माहिती सेव्ह करा'}
              </Button>
            </Box>
        )}
      </Paper>
      
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageInfo;

