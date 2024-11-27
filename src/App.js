import './App.css';
import Parent from './components/Parent';
import { createTheme,ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography:{
  fontFamily:["mainFont",],
  }
})

function App() {
  return (
<ThemeProvider theme={theme}>
      <div className="App">
    <Parent/>
    </div>
</ThemeProvider>
  );
}

export default App;
