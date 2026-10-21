import React from 'react';

// @ts-ignore
import '../css/app.css';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { RippleBadge } from './MaterialTheme/styled';

function App() {
  return (
    <Container sx={{ background: "orange"}}>
      <Stack direction="column">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h4">
            Create React App on TypeScript with REDUX
          </Typography>
        </Box>
          <Box>
            <RippleBadge badgeContent={4}>
              <Button variant='contained'>Contained</Button>
            </RippleBadge>
          </Box>
      </Stack>
    </Container>
  );
}

export default App;