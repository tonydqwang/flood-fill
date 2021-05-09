import './canvas.css'
import Card from '@material-ui/core/Card';

const Canvas = (props) => {
  const { 
    sizeX, 
    sizeY, 
    data,
    handleClick,
  } = props;
  const rows = sizeX && sizeY && data && data.reduce((rows, datum) => {
    const rowNumber = datum.y;
    if (!rows[rowNumber]) {
      const currentRow = rows[rowNumber] || Array(sizeX)
      currentRow[datum.x] = datum
      rows[rowNumber] = currentRow
    } else {
      rows[rowNumber][datum.x] = datum
    }
    return rows
  }, Array())

  return (
    <Card className='canvas'>
      { rows && rows.map(row => {
        return (
          <div className='canvas--row' key={row[0].y}>
            { row && row.map(cell => 
                <div 
                  className='canvas--cell' 
                  key={`${cell.x},${cell.y}}`}
                  style={{ backgroundColor: `${cell.color}` }}
                  onMouseDown={() => handleClick(cell.x, cell.y)}
                />
              )
            }
          </div>
        )
      })}
    </Card>
  );
}

export default Canvas;