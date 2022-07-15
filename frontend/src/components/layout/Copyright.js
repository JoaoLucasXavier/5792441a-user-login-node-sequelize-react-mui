import React from 'react';
import { Typography, Link, Box } from '@mui/material';

const Copyright = () => {
  return (
    <Box paddingTop={2}>
      <Typography variant='body2' color='textSecondary' align='center'>
        <Link
          color='inherit'
          href='https://www.gov.br/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Presidência da República Federativa do Brasil
        </Link>
        {' — '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default Copyright;
