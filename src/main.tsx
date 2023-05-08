import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { myTHEME } from './Constants/Constants.ts';
import './index.css'
import DataContext from './context/context.tsx';


const theme = createTheme(myTHEME)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <DataContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </DataContext>
 </ThemeProvider> 
)
