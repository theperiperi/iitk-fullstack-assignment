import { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Button, 
  CircularProgress,
  Divider 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, deletePost } from '../services/api';

function ViewPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await getPost(id);
      setPost(response.data);
    } catch (error) {
      setError('Error fetching post');
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        navigate('/');
      } catch (error) {
        setError('Error deleting post');
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography color="error">
          {error || 'Post not found'}
        </Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      
      <Typography variant="caption" display="block" sx={{ mb: 2 }}>
        Posted on: {new Date(post.createdAt).toLocaleDateString()}
      </Typography>

      <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 3 }}>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Summary
        </Typography>
        <Typography>
          {post.summary}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />
      
      <Box 
        sx={{ mb: 3 }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Box sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          onClick={() => navigate(`/edit/${post._id}`)}
          sx={{ mr: 2 }}
        >
          Edit
        </Button>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={handleDelete}
          sx={{ mr: 2 }}
        >
          Delete
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Box>
    </Paper>
  );
}

export default ViewPost; 