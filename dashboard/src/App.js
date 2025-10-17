import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { debounce } from 'lodash';
import { fetchError, fetchStart, fetchSuccess, setText } from './store';
import { mockSentimentAPI } from './api';
import { Box, CircularProgress, Container, Paper, TextField, Typography } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const {text, result, loading, error} = useSelector((state) => state.sentiment);

  const analyzeText = useCallback(
    debounce(async (input) => {
      if(!input.trim()) return;
      dispatch(fetchStart())

      try {
        const data = await mockSentimentAPI(input);
        dispatch(fetchSuccess(data))
      }catch(err){
        dispatch(fetchError(err.message))
      }
    },500), []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setText(value));
    analyzeText(value)
  };

  return (
    <Container sx={{mt: 4}}>
      <Typography variant='h4' gutterBottom>AI Sentiment Dashboard</Typography>
      <Box display="flex" flexDirection={{
        xs: 'column', md: 'row'
      }} gap={2}>
        <Paper sx={{flex: 1, p: 2}}>
          <Typography variant='h6'>Text Panel</Typography>
          <TextField fullWidth multiline rows={4} value={text}
          onChange={handleChange} 
          placeholder='type here' inputProps={{ 
            "aria-label": "Text input"
          }}></TextField>
        </Paper>
        <Paper sx={{flex: 1, p: 2}}>
          <Typography variant='h6'>Analysis Panel</Typography>
          {loading && <CircularProgress/>}
          {error && <Typography color="error"></Typography>}
          {result && (
            <Typography>
              Sentiment: <strong>{result.label}</strong>(confidence: {
                result.probabilil
              })
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  )
}

export default App;
