import './App.css';
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import Navigation from './router';
import { Provider } from 'react-redux';
import store from './store/store';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#DC8C5F',
      main: '#D36E35',
      accent: "#3599D3"
    },
    secondary: {
      light: '#D2D2D2',
      main: '#1F1F1F',
      dark: '#707070',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
    </Provider>
  );
}

export default App;
