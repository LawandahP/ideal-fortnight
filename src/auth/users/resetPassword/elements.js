import styled from 'styled-components';



export const AuthFormContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    @media screen and (max-width: 400px) {
        flex-direction: column;
    }
`


export const AuthFormImageContainer = styled.div`
    width: 500px;
    height: auto;

    @media screen and (max-width: 400px) {
        width: 200px;
    }
`

export const AuthImage = styled.img`
    width: 100%;
    object-fit: fill;
`

export const AuthText = styled.p`
    font-size: 3.3rem;
    margin-bottom: -12px;
    font-weight: ${({orange}) => (orange ? `500` : `400`)};
    color: ${({orange}) => (orange ? `#FFA500` : "#fff")}
`