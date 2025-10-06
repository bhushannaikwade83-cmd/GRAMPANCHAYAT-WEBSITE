import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress, 
  Alert, 
  Paper,
  LinearProgress
} from '@mui/material';
import { CloudUpload, Refresh, PhotoCamera, Delete } from '@mui/icons-material';

const CloudinaryUploader = ({ 
  onUploadSuccess, 
  onUploadError, 
  memberId, 
  currentImageUrl = null,
  disabled = false,
  title = 'सदस्य फोटो' 
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      const errorMsg = 'कृपया फक्त इमेज फाइल निवडा';
      setError(errorMsg);
      onUploadError?.(errorMsg);
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      const errorMsg = 'फाइलचा आकार 10MB पेक्षा कमी असावा';
      setError(errorMsg);
      onUploadError?.(errorMsg);
      return;
    }

    // Validate file name (remove special characters)
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    if (sanitizedFileName !== file.name) {
      console.warn('File name sanitized:', file.name, '->', sanitizedFileName);
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      // NOTE: Cloudinary unsigned preset name must be exact; if it is actually
      // 'unsigned_preset' uncomment the next line and remove the grampanchayat preset.
      formData.append('upload_preset', 'grampanchayat');
      formData.append('folder', 'grampanchayat/members');
      
      // Generate unique public_id
      const publicId = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      formData.append('public_id', publicId);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      console.log('Uploading to Cloudinary with data:', {
        file: file.name,
        size: file.size,
        type: file.type,
        publicId: publicId,
        preset: 'grampanchayat',
        folder: 'grampanchayat/members'
      });

      const response = await fetch('https://api.cloudinary.com/v1_1/ddgojykpf/image/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Cloudinary response error:', response.status, errorText);
        
        // Try to parse error response
        let errorMessage = `Upload failed: ${response.status} - ${response.statusText}`;
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error && errorData.error.message) {
            errorMessage = errorData.error.message;
          }
        } catch (parseError) {
          console.warn('Could not parse error response:', parseError);
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Cloudinary upload success:', data);
      
      if (!data.secure_url) {
        throw new Error('No secure URL returned from Cloudinary');
      }
      
      setUploadedImage(data);
      setUploading(false);
      setUploadProgress(0);
      
      // Call success callback with the image URL
      onUploadSuccess?.(data.secure_url, data);
      
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      const errorMsg = `अपलोड अयशस्वी: ${err.message}`;
      setError(errorMsg);
      setUploading(false);
      setUploadProgress(0);
      onUploadError?.(errorMsg);
    }
  };

  const handleReupload = () => {
    setUploadedImage(null);
    setError(null);
    setUploadProgress(0);
    // Use always-mounted ref
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setError(null);
    setUploadProgress(0);
    // Call success callback with empty string to remove image
    onUploadSuccess?.('', null);
  };

  const displayImage = uploadedImage?.secure_url || currentImageUrl;

  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      {/* Always-mounted hidden file input so re-upload works reliably */}
      <input
        ref={fileInputRef}
        id={`cloudinary-file-input-${memberId || 'default'}`}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        disabled={disabled}
      />
      
      {uploading && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <CircularProgress size={20} />
            <Typography variant="body2">अपलोड होत आहे... कृपया प्रतीक्षा करा</Typography>
          </Box>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!displayImage && !uploading && (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Box sx={{ 
            border: '2px dashed #ccc', 
            borderRadius: 2, 
            p: 3, 
            mb: 2,
            backgroundColor: 'grey.50'
          }}>
            <PhotoCamera sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              कोणताही फोटो निवडलेला नाही
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<PhotoCamera />}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            disabled={uploading || disabled}
            sx={{ borderRadius: 2 }}
          >
            फोटो निवडा
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
            Cloudinary: ddgojykpf | Preset: grampanchayat
          </Typography>
        </Box>
      )}

      {displayImage && (
        <Box>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img
              src={displayImage}
              alt="Member Photo"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                objectFit: 'cover'
              }}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              इमेज URL:
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                wordBreak: 'break-all', 
                backgroundColor: 'grey.100', 
                p: 1, 
                borderRadius: 1,
                fontFamily: 'monospace',
                fontSize: '0.75rem'
              }}
            >
              {displayImage}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<Refresh />}
              onClick={handleReupload}
              disabled={uploading || disabled}
              sx={{ borderRadius: 2 }}
            >
              पुन्हा अपलोड करा
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Delete />}
              onClick={handleRemoveImage}
              disabled={uploading || disabled}
              sx={{ borderRadius: 2, color: 'error.main', borderColor: 'error.main' }}
            >
              फोटो हटवा
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default CloudinaryUploader;