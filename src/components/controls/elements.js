import styled from "styled-components";
import { colors } from "../../styles/variables";

export const InputFieldWrapper = styled.div`
    width: 100%;
    justify-content: start;
`;

export const LoadingText = styled.p`
    color: lightblue;
`;
export const SuccessText = styled.p`
    color: green;
`;

export const DateInputPicker = styled.input`
    width: 100%;
    height: 50px;
    margin-bottom: 8px;
    padding: 10px;
`;

export const HelperText = styled.p`
    font-size: 9px;
    color: grey;
    margin-top: -5px;
`;

export const SelectInputContainer = styled.div`
    position: relative;
    width: 100%;
`;
export const SelectInputField = styled.select`
    border-radius: 5px;
    border: 1px solid ${colors.primary};
    cursor: pointer;
    background: ${({ theme }) => theme.bg3};
    color: grey;
    width: 54px;

    &:focus {
        outline: none;
        box-shadow: 0 0 5px -1px ${colors.primary};
    }
`;
export const SelectInputLabel = styled.p``;
export const SelectOption = styled.option`
    border-radius: 50px;
    background: ${({ theme }) => theme.bg3};
    color: grey;
    cursor: pointer;

    &:hover {
        background: ${colors.primary};
    }
`;

export const TextInput = styled.input`
    width: 70px;
    padding: 0px 0px 0px 8px;
    border-radius: 50px;
    border: 1px solid ${colors.primary};
    -webkit-appearance: none;

    &:focus {
        outline: none;
        box-shadow: 0 0 5px -1px ${colors.primary};
    }
`;
