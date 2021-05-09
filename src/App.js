import React, { useContext } from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import Header from './components/header';
import Canvas from './components/canvas';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const genData = (sizeX, sizeY) => {
    const data = Array(sizeX, sizeY)
    for (var y = 0; y < sizeY; y++) {
      for (var x = 0; x < sizeX; x++) {
        data[y * sizeX + x] = { x, y, color: '#ffffff' };
      }
    }
    return data;
  }

  const canvasSizeX = 5;
  const canvasSizeY = 5;
  const activeColor = '#ffffff';
  const canvasData = genData(canvasSizeX, canvasSizeY);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header />
        <main>
          <div className='main'>
            <Canvas 
              data={canvasData} 
              sizeX={canvasSizeX} 
              sizeY={canvasSizeY}
              color={activeColor}
            />
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;