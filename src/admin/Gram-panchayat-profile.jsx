import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Snackbar,
  Alert,
  LinearProgress,
} from '@mui/material';
import { PhotoCamera, Edit, Save, Image as ImageIcon } from '@mui/icons-material';

// Firebase imports
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const GramPanchayatProfile = () => {
  const [profile, setProfile] = useState({
    title: '',
    photo: '',
    details: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'grampanchayat', 'profile');
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log('No such document! Using initial values.');
          setProfile({
            title: 'ग्रामपंचायतीचे नाव येथे टाका',
            photo: '', // Initially no photo
            details: 'ग्रामपंचायतीची माहिती येथे टाका.',
          });
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
        setNotification({ open: true, message: 'Data fetch failed!', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `grampanchayat/profile_photo_${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        setNotification({ open: true, message: 'Photo upload failed!', severity: 'error' });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfile((prevProfile) => ({ ...prevProfile, photo: downloadURL }));
          setUploadProgress(0);
          setNotification({ open: true, message: 'Photo uploaded successfully!', severity: 'success' });
        });
      }
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, 'grampanchayat', 'profile');
      await setDoc(docRef, profile, { merge: true });
      setNotification({ open: true, message: 'Profile updated successfully!', severity: 'success' });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      setNotification({ open: true, message: 'Failed to update profile!', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ग्रामपंचायत प्रोफाइल फॉर्म
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Form Fields */}
          <Grid item xs={12} md={7}>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="ग्रामपंचायत नाव (Title)"
                name="title"
                value={profile.title}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ mb: 3 }}
                disabled={!isEditing}
              />
              <TextField
                fullWidth
                multiline
                rows={10}
                label="संपूर्ण माहिती"
                name="details"
                value={profile.details}
                onChange={handleInputChange}
                variant="outlined"
                disabled={!isEditing}
              />
            </Box>
          </Grid>

          {/* Photo Upload Section */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" gutterBottom>
              फोटो अपलोड करा
            </Typography>
            <Box
              sx={{
                border: '2px dashed #ccc',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                height: 250,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                backgroundImage: `url(${profile.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
              }}
            >
              {!profile.photo && !isEditing && (
                 <Typography color="textSecondary">फोटो उपलब्ध नाही</Typography>
              )}
               {!profile.photo && isEditing && (
                 <ImageIcon sx={{ fontSize: 60, color: '#ccc' }} />
              )}
            </Box>
            {isEditing && (
              <Box sx={{ mt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  component="label"
                  startIcon={<PhotoCamera />}
                >
                  नवीन फोटो निवडा
                  <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                </Button>
                {uploadProgress > 0 && <LinearProgress variant="determinate" value={uploadProgress} sx={{ width: '100%', mt: 2 }} />}
              </Box>
            )}
          </Grid>
        </Grid>
        
        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
              onClick={handleSubmit}
              disabled={saving || uploadProgress > 0}
            >
              {saving ? 'सेव्ह होत आहे...' : 'माहिती सेव्ह करा'}
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              startIcon={<Edit />}
              onClick={() => setIsEditing(true)}
            >
              माहिती बदला (Edit)
            </Button>
          )}
        </Box>
      </Paper>

      {/* Notification Snackbar */}
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GramPanchayatProfile;