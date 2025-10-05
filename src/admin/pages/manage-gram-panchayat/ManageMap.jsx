import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { Save, Edit } from '@mui/icons-material';

// Firebase imports
import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Cloudinary Uploader
import CloudinaryUploader from '../../components/CloudinaryUploader';

const ManageMap = () => {
  const [mapUrl, setMapUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchMapUrl = async () => {
      const docRef = doc(db, 'grampanchayat', 'map');
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().url) {
          setMapUrl(docSnap.data().url);
        } else {
          setMapUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54341.629057809354!2d76.61788526233583!3d19.83610522179175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd08819f1637b71%3A0x6bf6293dc668def3!2sKapadsingi%2C%20Maharashtra%20431542!5e0!3m2!1sen!2sin!4v1757271708585!5m2!1sen!2sin');
        }
      } catch (error) {
        console.error("Error fetching map URL: ", error);
        setNotification({ open: true, message: `नकाशा URL लोड करू शकत नाही: ${error.message}`, severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchMapUrl();
  }, []);

  const handleMapUpload = (imageUrl) => {
    setMapUrl(imageUrl);
    setNotification({ open: true, message: 'नकाशा यशस्वीरित्या अपलोड झाला!', severity: 'success' });
  };

  const handleSubmit = async () => {
    if (!mapUrl.trim()) {
      setNotification({ open: true, message: 'नकाशा URL रिकामे असू शकत नाही.', severity: 'warning' });
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, 'grampanchayat', 'map');
      await setDoc(docRef, { url: mapUrl });
      setNotification({ open: true, message: 'नकाशा URL यशस्वीरित्या अपडेट झाला!', severity: 'success' });
      setIsEditing(false);
    } catch (error) {
      setNotification({ open: true, message: 'नकाशा URL अपडेट करण्यात अयशस्वी!', severity: 'error' });
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
        <Typography sx={{ ml: 2 }}>नकाशा डेटा लोड होत आहे...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          नकाशा व्यवस्थापन (Map Management)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          येथे ग्रामपंचायतीच्या नकाशाचा URL टाका. हा नकाशा वेबसाईटवर दिसेल.
        </Typography>

        {isEditing ? (
          <CloudinaryUploader
            folder="grampanchayat_images/maps"
            onUpload={handleMapUpload}
          />
        ) : (
          <TextField
            fullWidth
            label="Google Maps URL"
            name="mapUrl"
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
            variant="outlined"
            disabled={!isEditing}
            helperText="Google Maps वरून 'Embed a map' option निवडून URL कॉपी करा आणि येथे पेस्ट करा."
          />
        )}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={saving ? <CircularProgress size={20} /> : <Save />}
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              startIcon={<Edit />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </Box>
      </Paper>

      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Add error boundary wrapper
const ManageMapWithErrorBoundary = () => {
  try {
    return <ManageMap />;
  } catch (error) {
    console.error('Error in ManageMap component:', error);
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" color="error">
          Error loading Map Management
        </Typography>
        <Typography variant="body1">
          {error.message}
        </Typography>
      </Box>
    );
  }
};

export default ManageMapWithErrorBoundary;
