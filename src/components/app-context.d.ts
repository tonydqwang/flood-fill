import { ChangeEvent } from 'react';
import { Point } from '../common/types';
import { Tools } from '../common/enums';

interface AppCtxInterface {
  state: AppState;
  handlers: AppHandlers; 
}

interface AppState {
  canvasSizeX: number;
  canvasSizeY: number;
  activeTool: Tools;
  activeColor: string;
  canvasData: Array<Point>;
}

interface AppHandlers {
  handleSizeXChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  handleSizeYChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  handleToolChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  handleColorChange: (obj: { value?: string; }) => void,
  handleClick: (x: number, y: number) => void,
}

export {
  AppCtxInterface,
  AppState,
  AppHandlers,
}