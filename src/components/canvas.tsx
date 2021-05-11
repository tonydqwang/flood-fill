import './canvas.css'
import Card from '@material-ui/core/Card';
import { Point } from '../common/types';

type CanvasProps = {
  sizeX: number,
  sizeY: number,
  data: Array<Point>,
  handleClick: (x: number, y: number) => void,
}

const Canvas = (props: CanvasProps): JSX.Element => {
  const { 
    sizeX, 
    sizeY, 
    data,
    handleClick,
  } = props;
  const rows = sizeX && sizeY && data?.reduce((rows, datum) => {
    const rowNumber = datum.y;
    if (!rows[rowNumber]) {
      const currentRow = rows[rowNumber] || Array<Point>(sizeX)
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
            { row && row.map((cell: Point) => 
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