import React, { useState, useEffect } from 'react';
const AppContext = React.createContext();

const initState = {
  canvasSizeX: 8,
  canvasSizeY: 10,
}

const AppCtxProvider = (props) => {
  const [state, setState] = useState(initState);

  useEffect(() => {
    const canvasData = genData(state.canvasSizeX, state.canvasSizeY);
    
    setState({
      ...state,
      canvasData,
    })
  }, [])

  const genData = (sizeX, sizeY) => {
    const data = Array(sizeX, sizeY)
    for (var y = 0; y < sizeY; y++) {
      for (var x = 0; x < sizeX; x++) {
        data[y * sizeX + x] = { x, y, color: '#ffffff' };
      }
    }
    return data;
  }

  return (
    <AppContext.Provider value={{ state }}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppCtxProvider };