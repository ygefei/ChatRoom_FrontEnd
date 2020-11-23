import './App.css';
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import Navigation from './router';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider as ChatThemeProvider } from '@livechat/ui-kit'


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
          <ChatThemeProvider>
            <Navigation />
          </ChatThemeProvider>
        </ThemeProvider>
    </Provider>
  );
}

export default App;
