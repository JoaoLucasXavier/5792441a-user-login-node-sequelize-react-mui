import TopBar from './TopBar';
import SideBar from './SideBar';
import Content from './Content';

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

export default function Layout(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar />
      <CssBaseline />
      <SideBar />
      <Content />
    </Box>
  );
}
