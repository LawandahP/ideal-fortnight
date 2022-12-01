import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        box-sizing: border-box;
    }
    body {
        background: ${({theme}) => theme.bg2};
        color: ${({theme}) => theme.text};
        font-family: 'Poppins' sans-serif;
        letter-spacing: 0.6px;

        @media screen and (max-width: 768px) {
            font-size: 12px;
            /* background: ${({theme}) => theme.bg2}; */
        }
    }

`;

