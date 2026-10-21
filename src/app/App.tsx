import React from 'react';

// @ts-ignore
import '../css/app.css';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function App() {
  return (
    <Container maxWidth="sm">
      <Stack direction="column">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h4">
            Create React App on TypeScript with REDUX
          </Typography>
        </Box>
        <Button variant="contained">Contained</Button>
      </Stack>
    </Container>
  );
}

export default App;