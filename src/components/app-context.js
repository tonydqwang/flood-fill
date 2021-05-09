import React, { useState, useEffect } from 'react';
const AppContext = React.createContext();

const initState = {
  canvasSizeX: 8,
  canvasSizeY: 10,
  activeTool: 'pencil',
  activeColor: '#ffffff',
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
    const data = Array(sizeX * sizeY)
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

  const handleToolChange = (event) => {
    setState({
      ...state,
      activeTool: event.target.value,
    })
  }

  const handleColorChange = ({ value }) => {
    setState({
      ...state,
      activeColor: value,
    })
  }

  const handleClick = (x, y) => {
    if (state.activeTool === 'pencil') {
      const cell = state.canvasData.find(cell => cell.x === x && cell.y === y)
      cell.color = state && state.activeColor;
    } else {
      fillConnected(x, y, state.canvasData);
    }
    setState({
      ...state,
      canvasData: state.canvasData,
    })
  }

  /**
   * recursively find and fill neighbours of the same colour
   * 
   * @param {*} x 
   * @param {*} y 
   * @param {*} searchSpace 
   */
  const fillConnected = (x, y, searchSpace) => {
    const currentCell = state.canvasData.find(cell => cell.x === x && cell.y === y);
    const currentColor = currentCell.color;
    console.log('filling ' + x + ', '+ y)

    const neighboursAddrsTheoretical = [
      { x, y: y-1 },
      { x: x-1, y },
      { x: x+1, y },
      { x: x, y: y+1 },
    ]
    const xMax = state.canvasSizeX;
    const yMax = state.canvasSizeY;
    const neighbourAddrs = neighboursAddrsTheoretical.filter(pt => pt.x >=0 && pt.x < xMax && pt.y >= 0 && pt.y < yMax);
    const neighbours = searchSpace.filter(cell => neighbourAddrs.find(addr => addr.x === cell.x && addr.y === cell.y ));
    const neighboursSameColor = neighbours.filter(cell => cell.color === currentColor);
    const narrowedSearchSpace = searchSpace.filter(cell => cell !== currentCell && !neighboursSameColor.some(nc => nc === cell));
    neighboursSameColor.forEach(neighbour => fillConnected(neighbour.x, neighbour.y, narrowedSearchSpace));
    console.log('filled ' + x + ', ' + y)
    currentCell.color = state && state.activeColor;
  }

  return (
    <AppContext.Provider value={{ 
      state,
      handlers: {
        handleSizeXChange,
        handleSizeYChange,
        handleToolChange,
        handleColorChange,
        handleClick,
      }
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppCtxProvider };