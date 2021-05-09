import React, { useContext } from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import { AppContext } from './components/app-context';
import Header from './components/header';
import Canvas from './components/canvas';
import Control from './components/control';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const appContext = useContext(AppContext);
  const {
    state: {
      canvasSizeX,
      canvasSizeY,
      canvasData,
      activeColor,
    },
    handlers: {
      handleSizeXChange,
      handleSizeYChange,
    },
  } = appContext;
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header />
        <main>
          <div className='main'>
            <Control 
              sizeX={canvasSizeX} 
              sizeY={canvasSizeY}
              handleSizeXChange={handleSizeXChange}
              handleSizeYChange={handleSizeYChange}
            />
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