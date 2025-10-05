import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Button, Paper, CircularProgress, Snackbar, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton,
  List, ListItem, ListItemAvatar, Avatar, ListItemText,
  LinearProgress, Select, MenuItem, FormControl, InputLabel, FormHelperText,
  Card, CardContent, Fade, Grow
} from '@mui/material';
import { Add, Edit, Delete, PhotoCamera, Person } from '@mui/icons-material';
import { db, storage } from '../../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

const initialMemberState = { name: '', designation: '', photoURL: '', order: 0 };

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(initialMemberState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const membersCollectionRef = collection(db, 'members');
  const fixedRoles = ["सरपंच", "उपसरपंच", "ग्राम सेवक"];

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(membersCollectionRef, orderBy("order", "asc"));
      const data = await getDocs(q);
      setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("सदस्य आणण्यात त्रुटी: ", error);
      setNotification({ open: true, message: `सदस्य आणण्यात अयशस्वी: ${error.message}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const getAvailableRoles = useCallback(() => {
    const existingRoles = members.map(m => m.designation);
    if (isEditing) {
      const otherRoles = existingRoles.filter(r => r !== currentMember.designation);
      return [...fixedRoles.filter(fr => !otherRoles.includes(fr)), "सदस्य"];
    }
    return [...fixedRoles.filter(fr => !existingRoles.includes(fr)), "सदस्य"];
  }, [members, isEditing, currentMember.designation, fixedRoles]);

  const handleOpen = (member = null) => {
    setImageFile(null);
    setUploadProgress(0);
    if (member) {
      setIsEditing(true);
      setCurrentMember(member);
    } else {
      setIsEditing(false);
      const nextOrder = members.length > 0 ? Math.max(...members.map(m => m.order)) + 1 : 1;
      setCurrentMember({ ...initialMemberState, order: nextOrder });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(currentMember.photoURL || '');
        return;
      }

      const storageRef = ref(storage, `members/${file.name}_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentMember.name || !currentMember.designation) {
      setNotification({ open: true, message: 'नाव आणि पद आवश्यक आहे.', severity: 'warning' });
      return;
    }
    setSaving(true);
    try {
      let photoURL = currentMember.photoURL;
      if (imageFile) {
        if (isEditing && currentMember.photoURL) {
          try {
            await deleteObject(ref(storage, currentMember.photoURL));
          } catch (error) {
            if (error.code !== 'storage/object-not-found') console.warn("जुना फोटो हटवण्यात अयशस्वी:", error);
          }
        }
        photoURL = await uploadImage(imageFile);
      }

      const dataToSave = { ...currentMember, photoURL };

      if (isEditing) {
        const memberDoc = doc(db, 'members', currentMember.id);
        await updateDoc(memberDoc, dataToSave);
      } else {
        await addDoc(membersCollectionRef, dataToSave);
      }
      
      setNotification({ open: true, message: `सदस्य यशस्वीरित्या ${isEditing ? 'अपडेट' : 'जोडला'}!`, severity: 'success' });
      fetchMembers();
      handleClose();
    } catch (error) {
      setNotification({ open: true, message: `त्रुटी: ${error.message}`, severity: 'error' });
    } finally {
      setSaving(false);
    }
  };
  
  const handleDelete = async (id, photoURL) => {
    if (window.confirm("तुम्हाला खात्री आहे? ही क्रिया पूर्ववत केली जाऊ शकत नाही.")) {
      try {
        await deleteDoc(doc(db, 'members', id));
        if (photoURL) {
          await deleteObject(ref(storage, photoURL));
        }
        setNotification({ open: true, message: 'सदस्य यशस्वीरित्या हटवला.', severity: 'success' });
        fetchMembers();
      } catch (error) {
        setNotification({ open: true, message: `सदस्य हटवण्यात त्रुटी: ${error.message}`, severity: 'error' });
      }
    }
  };
  
  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">सदस्य व्यवस्थापन</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()} sx={{ borderRadius: 2, boxShadow: 'none' }}>नवीन सदस्य</Button>
        </Box>
        {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box> : (
          <List sx={{ p: 0 }}>
            {members.length > 0 ? members.map((member, index) => (
              <Grow in={true} key={member.id} timeout={300 * (index + 1)}>
                <Card variant="outlined" sx={{ 
                  mb: 2,
                  transition: 'box-shadow 0.3s, transform 0.3s',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-4px)'
                  }
                }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={member.photoURL} alt={member.name} sx={{ width: 56, height: 56, mr: 2 }}>
                        {!member.photoURL && <Person />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={<Typography variant="h6" component="div">{member.name}</Typography>} 
                      secondary={member.designation} 
                    />
                    <Box>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(member)}><Edit /></IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(member.id, member.photoURL)}><Delete /></IconButton>
                    </Box>
                  </ListItem>
                </Card>
              </Grow>
            )) : <Typography sx={{ textAlign: 'center', p: 4, color: 'text.secondary' }}>सदस्य आढळले नाहीत. "नवीन सदस्य" वर क्लिक करून सुरुवात करा.</Typography>}
          </List>
        )}
      </Paper>
      
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" TransitionComponent={Fade}>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 'bold' }}>{isEditing ? 'सदस्य संपादित करा' : 'नवीन सदस्य जोडा'}</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="नाव" fullWidth required variant="outlined" value={currentMember.name} onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })} sx={{ mb: 2 }} />
            <FormControl fullWidth margin="dense" required sx={{ mb: 2 }}>
              <InputLabel>पद</InputLabel>
              <Select value={currentMember.designation} label="पद" onChange={(e) => setCurrentMember({ ...currentMember, designation: e.target.value })}>
                {getAvailableRoles().map(role => (<MenuItem key={role} value={role}>{role}</MenuItem>))}
              </Select>
            </FormControl>
            <TextField margin="dense" label="क्रम" type="number" fullWidth required variant="outlined" value={currentMember.order} onChange={(e) => setCurrentMember({ ...currentMember, order: Number(e.target.value) })} helperText="कमी क्रमांक आधी दिसेल." sx={{ mb: 2 }} />
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button variant="outlined" component="label" startIcon={<PhotoCamera />} disabled={uploadProgress > 0}>
                फोटो अपलोड करा <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </Button>
              {imageFile && <Typography variant="body2" noWrap>{imageFile.name}</Typography>}
            </Box>
            {uploadProgress > 0 && <LinearProgress variant="determinate" value={uploadProgress} sx={{ mt: 1 }} />}
            {!imageFile && currentMember.photoURL && <FormHelperText sx={{ mt: 1 }}>सध्याचा फोटो सेट आहे. बदलण्यासाठी नवीन फोटो अपलोड करा.</FormHelperText>}
          </DialogContent>
          <DialogActions sx={{ p: '16px 24px' }}>
            <Button onClick={handleClose}>रद्द करा</Button>
            <Button type="submit" variant="contained" disabled={saving || uploadProgress > 0}>{saving ? 'सेव्ह होत आहे...' : 'सेव्ह करा'}</Button>
          </DialogActions>
        </form>
      </Dialog>
      
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={() => setNotification({ ...notification, open: false })}>
        <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} sx={{ width: '100%', boxShadow: 6 }}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageMembers;