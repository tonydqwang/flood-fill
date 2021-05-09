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

  const handleSizeXChange = (event) => {
    const newX = event.target.value;
    if (newX < 1 || newX > 15) return;
    const newData = genData(newX, state.canvasSizeY);
    setState({
      ...state,
      canvasSizeX: newX,
      canvasData: newData,
    })
  }

  const handleSizeYChange = (event) => {
    const newY = event.target.value;
    if (newY < 1 || newY > 15) return;
    const newData = genData(state.canvasSizeX, newY);
    setState({
      ...state,
      canvasSizeY: newY,
      canvasData: newData,
    })
  }

  return (
    <AppContext.Provider value={{ 
      state,
      handlers: {
        handleSizeXChange,
        handleSizeYChange,
      }
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppCtxProvider };