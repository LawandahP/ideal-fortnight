import React, { useState, createContext } from 'react'
import { ThemeProvider } from 'styled-components';
import './App.css';
import Layout from './components/layout/Layout';
import Routes from './routes';
import { GlobalStyle } from './styles/globalStyles';
import { darkTheme, greenTheme, lightTheme } from './styles/theme';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ThemeContext = createContext(null);

const App = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme'))
    const themeStyle = theme === 'light' ? lightTheme : 'dark' ? darkTheme : 'green' ? greenTheme : ''

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ThemeContext.Provider value={{setTheme, theme}}>
                <ThemeProvider theme={themeStyle}>
                    <GlobalStyle />
                    <Layout>
                        <Routes />
                    </Layout>
                </ThemeProvider>
            </ThemeContext.Provider>

        </>
               
    )
}

export default App

