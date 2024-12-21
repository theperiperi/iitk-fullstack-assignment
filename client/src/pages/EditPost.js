import { useState, useEffect } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  CircularProgress 
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getPost, updatePost } from '../services/api';

function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await getPost(id);
      const { title, content } = response.data;
      setTitle(title);
      setContent(content);
    } catch (error) {
      setError('Error fetching post');
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await updatePost(id, { title, content });
      navigate(`/post/${id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Post
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
          error={!!error}
        />
        
        <Box sx={{ mt: 2, mb: 2 }}>
          <ReactQuill 
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            style={{ height: '300px', marginBottom: '50px' }}
          />
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ mt: 6 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            sx={{ mr: 2 }}
          >
            {saving ? <CircularProgress size={24} /> : 'Update Post'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/post/${id}`)}
            disabled={saving}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default EditPost; 