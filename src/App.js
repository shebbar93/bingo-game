import Bingo from './Components/Bingo'
import entries from './Data/BingoEntries'

function App() {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const generateRandomGrid = (values, size) => {
    const randomizedValues = shuffleArray(values);
    let grid = [];
    for (let row = 0; row < size; row++) {
      grid[row] = [];
      for (let col = 0; col < size; col++) {
        let id = col + (row * size);
        grid[row][col] = {
          value: randomizedValues[id],
          id: id
        }
      }
    }
    return grid;
  }
  return (
    <>
      <div className='min-h-screen bg-gradient-to-r from-blue-50 to-green-50 md:p-10'>
        <div className='flex items-center justify-center px-10 py-10'>
          <h1 className='text-xs md:text-4xl font-black'> Bored of meetings 😅..? Bingo 🎲 !!!</h1>
        </div>
        <Bingo grid={generateRandomGrid(entries, 5)} centre={parseInt(entries.length / 2)} size={5} />

      </div>
    </>

  );
}

export default App;
