import './control.css'
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ColorBox from 'devextreme-react/color-box';
import { Tools } from '../common/enums';
import { ChangeEvent } from 'react';
import constants from '../common/constants.json';

type ControlProps = {
  sizeX: number,
  sizeY: number,
  tool: Tools,
  color: string,
  handleSizeXChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  handleSizeYChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  handleToolChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  handleColorChange: (obj: { value?: string; }) => void,
}

const Controls = (props: ControlProps) => {
  const { 
    sizeX, 
    sizeY,
    tool,
    color,
    handleSizeXChange,
    handleSizeYChange,
    handleToolChange,
    handleColorChange,
  } = props;
  
  return (
    <Card className='control'>
      <div className="dx-fieldset">
        <div className="dx-fieldset-header">Canvas Size</div>
        <p className="control--width-height--subtitle">Enter amount or adjust with keyboard arrow key</p>
        <TextField
          id="control--width"
          label={`Width (max ${constants.sizeXMax})`}
          type="number"
          InputLabelProps={{ shrink: true }}
          onChange={handleSizeXChange}
          value={sizeX}
        />
        <TextField
          id="control--height"
          label={`Height (max ${constants.sizeYMax})`}
          type="number"
          InputLabelProps={{ shrink: true }}
          onChange={handleSizeYChange}
          value={sizeY}
        />
      </div>

      <div className="dx-fieldset">
        <div className="dx-fieldset-header">Paint Tools</div>
        <FormControl className='control--tools' component="fieldset">
          <FormLabel component="legend">Tools</FormLabel>
          <RadioGroup aria-label="tool" name="tool" value={tool} onChange={handleToolChange}>
            <FormControlLabel value={Tools.Pencil} control={<Radio />} label="Pencil" />
            <FormControlLabel value={Tools.FloodTool} control={<Radio />} label="Fill tool" />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="dx-fieldset">
        <div className="dx-fieldset-header">Colours</div>
        <ColorBox 
          className='control--color-picker' 
          defaultValue={color}
          applyValueMode="instantly"
          onValueChanged={handleColorChange}
        />
      </div>
    </Card>
  );
}

export default Controls;