import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";
import { colors } from "../../styles/variables";

export const Container = styled.div`
    height: 100vh;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 20;
    overflow: hidden;
    background: ${colors.primary};
`;

export const NgFormWrapper = styled.div`
    max-width: 700px;
    background: #fff;
    height: auto;
    overflow: auto;
    /* width: 100%; */
    z-index: 1;
    display: grid;
    border-radius: 20px;
    /* margin: 0 auto; */
    padding: 40px 32px 40px 40px;
    /* border-right: 4px; */
    /* box-shadow: 0 1px 3px rgba(0,0,0,0.9); */

    @media screen and (max-width: 400px) {
        padding: 32px 32px;
    }
`;

export const FormWrapper = styled.div`
    height: 100%;
    display: flex;
    /* flex-direction: column; */
    /* background: blue; */
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 80%;
    }
`;

export const Icon = styled(LinkRouter)`
    margin-left: 32px;
    margin-top: 42px;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 32px;
    cursor: pointer;

    @media screen and (max-width: 480px) {
        margin-left: 16px;
        margin-top: 8px;
    }
`;

export const FormContent = styled.div`
    height: 100%;
    /* background: ${colors.primary}; */
    display: grid;
    margin-top: -40px;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    padding: 0px 40px 0px 40px;

    @media screen and (max-width: 480px) {
        padding: 10px;
    }
`;

export const FormH1 = styled.h1`
    margin-bottom: 20px;
    color: #101010;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
`;

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
`;

export const FormInput = styled.input`
    padding: 16px 16px;
    margin: 0px 0px 15px 6px;
    border: none;
    display: grid;
    grid-template-columns: auto auto;
    border-radius: 4px;
`;

export const FormButtonWrapper = styled.div`
    /* width: 100%; */
    /* display: flex; */
    /* flex-direction: start; */
    justify-content: center;
    /* align-content: center; */
    margin-top: 10px;
`;

export const FormButton = styled.button`
    background: ${({ outline }) => (outline ? `#fff` : `#0057D9`)};
    padding: 10px 10px;
    border: none;
    border-radius: 4px;
    color: ${({ outline }) => (outline ? `#0057D9` : `#fff`)};
    cursor: pointer;
    text-align: center;
    border: 1px solid ${colors.primary};

    &:hover {
        background: ${({ outline }) => (outline ? `#0057D9` : `#fff`)};
        color: ${({ outline }) => (outline ? `#fff` : `#0057D9`)};
        transition: 0.3s ease-in-out;
    }
`;

export const Text = styled.div`
    /* text-align: center; */
    margin-top: ${({ spacing }) => (spacing ? `24px` : "")};
    color: #101010;
    font-size: 14px;
`;
