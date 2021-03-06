import logo from './logo.svg';
import './App.css';
import ColorBox from './components/ColorBox';
import ColorContext from './contexts/color';
import { ColorProvider } from './contexts/color'
import SelectColors from './components/SelectColors';

function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox/>
      </div>
    </ColorProvider>
    // <ColorContext.Provider value={{ color : 'red' }}>
    //   <div>
    //     <ColorBox />
    //   </div>
    // </ColorContext.Provider>
  );
}

export default App;
