import React, { useEffect, useMemo, useState } from 'react';
import { Box, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert, CircularProgress, Grid, MenuItem, Select, InputLabel, FormControl, IconButton, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { Add, Edit, Delete, PictureAsPdf, Image as ImageIcon } from '@mui/icons-material';
import { db } from '../../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import CloudinaryUploader from '../../components/CloudinaryUploader';

const initialState = { name: '', type: 'Other', description: '', location: '', timings: '', fee: '', imageURL: '', docURL: '' };

const ManageTourism = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState(initialState);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const colRef = useMemo(() => collection(db, 'tourism'), []);

  const fetchRows = async () => {
    setLoading(true);
    try {
      const q = query(colRef, orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setRows(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      setNotification({ open: true, message: `लोड अयशस्वी: ${e.message}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRows(); /* eslint-disable-next-line */ }, []);

  const handleOpen = (row = null) => {
    if (row) { setIsEditing(true); setCurrent(row); } else { setIsEditing(false); setCurrent(initialState); }
    setOpen(true);
  };

  const handleSave = async () => {
    if (!current.name.trim()) {
      setNotification({ open: true, message: 'स्थळाचे नाव आवश्यक आहे.', severity: 'warning' });
      return;
    }
    try {
      const payload = { 
        name: current.name,
        type: current.type || 'Other',
        description: current.description || '',
        location: current.location || '',
        timings: current.timings || '',
        fee: current.fee || '',
        imageURL: current.imageURL || '',
        docURL: current.docURL || '',
        updatedAt: serverTimestamp()
      };
      if (!isEditing) payload.createdAt = serverTimestamp();
      if (isEditing) await updateDoc(doc(db, 'tourism', current.id), payload); else await addDoc(colRef, payload);
      setNotification({ open: true, message: 'जतन झाले.', severity: 'success' });
      setOpen(false);
      fetchRows();
    } catch (e) {
      setNotification({ open: true, message: `सेव्ह अयशस्वी: ${e.message}`, severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('खात्री आहे?')) return;
    try { await deleteDoc(doc(db, 'tourism', id)); setNotification({ open: true, message: 'हटवले.', severity: 'success' }); fetchRows(); }
    catch (e) { setNotification({ open: true, message: `हटवण्यात अयशस्वी: ${e.message}`, severity: 'error' }); }
  };

  const handleUploadSuccess = (url) => setCurrent(prev => ({ ...prev, imageURL: url }));

  const handleDocChange = async (e) => {
    try {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', 'grampanchayat');
      fd.append('folder', 'grampanchayat/tourism_docs');
      const res = await fetch('https://api.cloudinary.com/v1_1/ddgojykpf/auto/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (!data.secure_url) throw new Error('Cloudinary ने URL परत केला नाही.');
      setCurrent(prev => ({ ...prev, docURL: data.secure_url }));
      setNotification({ open: true, message: 'दस्तावेज अपलोड झाला.', severity: 'success' });
    } catch (err) {
      setNotification({ open: true, message: `दस्तावेज अपलोड अयशस्वी: ${err.message}`, severity: 'error' });
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">पर्यटन स्थळे व्यवस्थापन</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>नवीन</Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>नाव</TableCell>
                  <TableCell>प्रकार</TableCell>
                  <TableCell>ठिकाण</TableCell>
                  <TableCell>वर्णन</TableCell>
                  <TableCell align="right">क्रिया</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.type || '-'}</TableCell>
                    <TableCell>{row.location || '-'}</TableCell>
                    <TableCell>{(row.description || '').slice(0, 80)}{(row.description || '').length > 80 ? '…' : ''}</TableCell>
                    <TableCell align="right">
                      {row.docURL && (
                        <Tooltip title="View Document"><IconButton size="small" component={Link} href={row.docURL} target="_blank"><PictureAsPdf /></IconButton></Tooltip>
                      )}
                      {row.imageURL && (
                        <Tooltip title="View Photo"><IconButton size="small" component={Link} href={row.imageURL} target="_blank"><ImageIcon /></IconButton></Tooltip>
                      )}
                      <IconButton size="small" onClick={() => handleOpen(row)}><Edit /></IconButton>
                      <IconButton size="small" onClick={() => handleDelete(row.id)}><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow><TableCell colSpan={5} align="center">कोणतीही नोंद नाही. "नवीन" वर क्लिक करा.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>{isEditing ? 'स्थळ संपादन' : 'नवीन स्थळ'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12} md={6}>
              <TextField label="स्थळाचे नाव" fullWidth value={current.name} onChange={(e)=>setCurrent({ ...current, name: e.target.value })} />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>प्रकार</InputLabel>
                <Select label="प्रकार" value={current.type} onChange={(e)=>setCurrent({ ...current, type: e.target.value })}>
                  <MenuItem value="Historical">Historical</MenuItem>
                  <MenuItem value="Religious">Religious</MenuItem>
                  <MenuItem value="Natural">Natural</MenuItem>
                  <MenuItem value="Cultural">Cultural</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="ठिकाण / पत्ता" fullWidth value={current.location} onChange={(e)=>setCurrent({ ...current, location: e.target.value })} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="वेळा (ऐच्छिक)" fullWidth value={current.timings} onChange={(e)=>setCurrent({ ...current, timings: e.target.value })} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="प्रवेश शुल्क (ऐच्छिक)" fullWidth value={current.fee} onChange={(e)=>setCurrent({ ...current, fee: e.target.value })} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ mb: 1 }} variant="subtitle1">फोटो</Typography>
              <CloudinaryUploader memberId={current.id || 'new'} currentImageUrl={current.imageURL} onUploadSuccess={(url)=>setCurrent(prev=>({ ...prev, imageURL: url }))} onUploadError={(m)=>setNotification({open:true,message:m,severity:'error'})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ mb: 1 }} variant="subtitle1">दस्तावेज (PDF/DOC) - ऐच्छिक</Typography>
              <Button variant="outlined" component="label" startIcon={<PictureAsPdf />}>
                दस्तावेज निवडा
                <input type="file" hidden accept=".pdf,.doc,.docx,.txt" onChange={handleDocChange} />
              </Button>
              {current.docURL && (
                <Box sx={{ mt: 1 }}>
                  <Link href={current.docURL} target="_blank" rel="noopener">अपलोड केलेला दस्तावेज पाहा</Link>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>रद्द</Button>
          <Button variant="contained" onClick={handleSave}>सेव्ह</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={notification.open} autoHideDuration={5000} onClose={() => setNotification({ ...notification, open: false })}>
        <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageTourism;


