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

type ControlProps = {
  sizeX: number,
  sizeY: number,
  tool: Tools,
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
    handleSizeXChange,
    handleSizeYChange,
    handleToolChange,
    handleColorChange,
  } = props;
  
  return (
    <Card className='control'>
      <div className="dx-fieldset">
        <div className="dx-fieldset-header">Canvas Size</div>
        <TextField
          id="control--width"
          label="Width"
          type="number"
          InputLabelProps={{ shrink: true }}
          onChange={handleSizeXChange}
          value={sizeX}
        />
        <TextField
          id="control--height"
          label="Height"
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
            <FormControlLabel value="pencil" control={<Radio />} label="Pencil" />
            <FormControlLabel value="fill-tool" control={<Radio />} label="Fill tool" />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="dx-fieldset">
        <div className="dx-fieldset-header">Colours</div>
        <ColorBox 
          className='control--color-picker' 
          defaultValue="#ffffff"
          applyValueMode="instantly"
          onValueChanged={handleColorChange}
        />
      </div>
    </Card>
  );
}

export default Controls;