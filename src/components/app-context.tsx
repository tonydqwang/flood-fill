import React, { useState, useEffect, ChangeEvent } from 'react';
import { Point } from '../common/types';
import { Tools } from '../common/enums';
import { AppCtxInterface } from './app-context.d';

type AppCtxProps = {
  children: JSX.Element,
}

const initState = {
  canvasSizeX: 10,
  canvasSizeY: 10,
  activeTool: Tools.Pencil,
  activeColor: '#ffffff',
  canvasData: Array<Point>(),
}

const AppContext = React.createContext<AppCtxInterface>({
  state: initState,
  handlers: {
    handleSizeXChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {},
    handleSizeYChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {},
    handleToolChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {},
    handleColorChange: (obj: { value?: string; }) => {},
    handleClick: (x: number, y: number) => {},
  }
});

const AppCtxProvider = (props: AppCtxProps) => {
  const [state, setState] = useState(initState);

  useEffect(() => {
    const canvasData = genData(state.canvasSizeX, state.canvasSizeY);
    
    setState({
      ...state,
      canvasData,
    })
  }, [])

  const genData = (sizeX: number, sizeY: number): Point[] => {
    const data = Array(sizeX * sizeY)
    for (var y = 0; y < sizeY; y++) {
      for (var x = 0; x < sizeX; x++) {
        data[y * sizeX + x] = { x, y, color: '#ffffff' };
      }
    }
    return data;
  }

  const handleSizeXChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newX = Number(event.target.value);
    if (newX < 1 || newX > 20) return;
    const newData = genData(newX, state.canvasSizeY);
    setState({
      ...state,
      canvasSizeX: newX,
      canvasData: newData,
    })
  }

  const handleSizeYChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newY = Number(event.target.value);
    if (newY < 1 || newY > 50) return;
    const newData = genData(state.canvasSizeX, newY);
    setState({
      ...state,
      canvasSizeY: newY,
      canvasData: newData,
    })
  }

  const handleToolChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setState({
      ...state,
      activeTool: event.target.value === 'pencil' ? Tools.Pencil : Tools.FloodTool,
    })
  }

  const handleColorChange = ({ value }: { value?: string}) => {
    value && setState({
      ...state,
      activeColor: value,
    })
  }

  const handleClick = (x: number, y: number) => {
    const cell = state.canvasData.find(datum => datum.x === x && datum.y === y)
    if (!cell || cell.color === state.activeColor) {
      return
    }

    if (state.activeTool === Tools.Pencil) {
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
  const fillConnected = (x: number, y: number, searchSpace: Point[]) => {
    const currentCell = state.canvasData.find(cell => cell.x === x && cell.y === y);
    if (!currentCell) {
      return
    }
    const currentColor = currentCell.color;
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