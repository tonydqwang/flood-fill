import './control.css'
import Card from '@material-ui/core/Card';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const Controls = (props) => {
  const { 
    sizeX, 
    sizeY,
    handleSizeXChange,
    handleSizeYChange,
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
    </Card>
  );
}

export default Controls;