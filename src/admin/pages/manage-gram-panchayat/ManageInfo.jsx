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
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import { PhotoCamera, Save, Edit, Delete, ChevronLeft, ChevronRight, Add } from '@mui/icons-material';

// Firebase imports
import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Cloudinary Uploader
import CloudinaryUploader from '../../components/CloudinaryUploader';

const ManageInfo = () => {
  const [formData, setFormData] = useState({
    details: '',
    photos: [], // Changed from 'photo' to 'photos' array
  });
  const [gpName, setGpName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [photoName, setPhotoName] = useState('');
  const [showUploader, setShowUploader] = useState(false);

  // Auto slideshow effect
  useEffect(() => {
    if (formData.photos && formData.photos.length > 1 && !isEditing) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % formData.photos.length);
      }, 3000); // Change slide every 3 seconds
      
      return () => clearInterval(interval);
    }
  }, [formData.photos, isEditing]);

  // Fetch existing data
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

        // Fetch Main Info Details and Photos
        const infoDocRef = doc(db, 'grampanchayat', 'mainInfo');
        const infoSnap = await getDoc(infoDocRef);
        if (infoSnap.exists()) {
          const data = infoSnap.data();
          // Handle backward compatibility - convert old 'photo' to 'photos' array
          if (data.photo && !data.photos) {
            setFormData({
              details: data.details || '',
              photos: [{ url: data.photo, name: 'Photo 1' }]
            });
          } else {
            setFormData({
              details: data.details || '',
              photos: data.photos || []
            });
          }
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

  const handlePhotoUpload = (imageUrl) => {
    const newPhoto = {
      url: imageUrl,
      name: photoName || `Photo ${formData.photos.length + 1}`,
      uploadedAt: new Date().toISOString()
    };
    
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, newPhoto]
    }));
    
    setPhotoName('');
    setShowUploader(false);
    setNotification({ open: true, message: 'फोटो यशस्वीरित्या अपलोड झाला!', severity: 'success' });
  };

  const handleDeletePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
    setNotification({ open: true, message: 'फोटो हटवला गेला!', severity: 'success' });
  };

  const handleUpdatePhotoName = (index, newName) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.map((photo, i) => 
        i === index ? { ...photo, name: newName } : photo
      )
    }));
  };

  const handleSubmit = async () => {
    if (!formData.details) {
      setNotification({ open: true, message: 'कृपया संपूर्ण माहिती भरा.', severity: 'warning' });
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, 'grampanchayat', 'mainInfo');
      const dataToSave = {
        details: formData.details,
        photos: formData.photos,
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % formData.photos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + formData.photos.length) % formData.photos.length);
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
          <Typography variant="h4">माहिती व्यवस्थापन</Typography>
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
              फोटो गॅलरी
            </Typography>
            
            {/* Slideshow View (when not editing) */}
            {!isEditing && formData.photos.length > 0 && (
              <Box sx={{ position: 'relative', height: 350 }}>
                <Box
                  sx={{
                    border: '2px solid #eee',
                    borderRadius: 2,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundImage: `url(${formData.photos[currentSlide]?.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Photo Name Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      color: 'white',
                      p: 2,
                    }}
                  >
                    <Typography variant="h6">{formData.photos[currentSlide]?.name}</Typography>
                    <Typography variant="caption">
                      {currentSlide + 1} / {formData.photos.length}
                    </Typography>
                  </Box>

                  {/* Navigation Arrows */}
                  {formData.photos.length > 1 && (
                    <>
                      <IconButton
                        onClick={prevSlide}
                        sx={{
                          position: 'absolute',
                          left: 10,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: 'rgba(255,255,255,0.8)',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                        }}
                      >
                        <ChevronLeft />
                      </IconButton>
                      <IconButton
                        onClick={nextSlide}
                        sx={{
                          position: 'absolute',
                          right: 10,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: 'rgba(255,255,255,0.8)',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                        }}
                      >
                        <ChevronRight />
                      </IconButton>
                    </>
                  )}

                  {/* Slide Indicators */}
                  {formData.photos.length > 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 60,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 1,
                      }}
                    >
                      {formData.photos.map((_, index) => (
                        <Box
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            )}

            {/* No Photos Message */}
            {!isEditing && formData.photos.length === 0 && (
              <Box
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography color="text.secondary">कोणतेही फोटो उपलब्ध नाहीत</Typography>
              </Box>
            )}

            {/* Edit Mode - Photo Grid */}
            {isEditing && (
              <Box>
                <Grid container spacing={2}>
                  {formData.photos.map((photo, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={photo.url}
                          alt={photo.name}
                        />
                        <CardContent sx={{ pb: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            value={photo.name}
                            onChange={(e) => handleUpdatePhotoName(index, e.target.value)}
                            placeholder="फोटोचे नाव"
                          />
                        </CardContent>
                        <CardActions>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeletePhoto(index)}
                          >
                            <Delete />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Add New Photo Button */}
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => setShowUploader(!showUploader)}
                  sx={{ mt: 2 }}
                >
                  नवीन फोटो जोडा
                </Button>

                {/* Photo Uploader */}
                {showUploader && (
                  <Box sx={{ mt: 2, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="फोटोचे नाव"
                      value={photoName}
                      onChange={(e) => setPhotoName(e.target.value)}
                      sx={{ mb: 2 }}
                      placeholder="उदा. ग्रामपंचायत इमारत"
                    />
                    <CloudinaryUploader
                      folder="grampanchayat_images/info"
                      onUpload={handlePhotoUpload}
                    />
                  </Box>
                )}
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
              disabled={saving}
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
