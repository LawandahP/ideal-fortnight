
import React, { useState } from 'react'
import styled from 'styled-components';

import Tooltip from '@mui/material/Tooltip';
import { FiX, FiPlus, FiFilter } from 'react-icons/fi';
import { colors } from '../../styles/variables';
import { useSelector } from 'react-redux';


export const CloseIcon = styled(FiX)`
    font-size: 1.2rem;
    position: absolute;
    color: #6b6b6b;
    top: ${({flt}) => (flt ? `` : `1.4rem`)};
    right: ${({flt}) => (flt ? `4px` : `1.5rem`)};
    cursor: pointer;
    &:hover {
        transition: all 0.3s ease-in-out;
        filter: brightness(0.5)
        
    }
`
export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    font-size: 1.5rem;
    
    cursor: pointer;
    outline: none;

    &:hover {
        transition: all ease-in-out;
        background: #ff7c7c;
    }
`;

export const Button = styled.div`
    outline: none;
    border-radius: 5px;
    background: ${colors.primary}; 
    color: #fff;
    padding: 5px 30px 5px 30px;
    font-size: ${({fontBig}) => (fontBig ? '20px' : '12px')};
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all ease-in-out;
    }
`;




















export const ActionButtonWrapper = styled.div`
    display: flex;
    align-items: flex-start;
`;


export const ButtonAction = styled.div`
    
    color: ${({edit}) => (edit ? '#12acac' : '#ff0000')};
    cursor: pointer;
    margin-left: 5px;
    &:hover {
        transition: all ease-in-out;
        color: ${({edit}) => (edit ? '#53ffff' : '#ff7c7c')};
    }
`;



export const CancelButton = ({onClick, flt}) => {
    return (
        <CloseIcon flt={flt} onClick={onClick} />
    )
}


export const AddButton = ({onClick}) => {
    const [ hover, setHover ] = useState(false);
    const readProfile = useSelector((state) => state.readProfile);
    const { profile } = readProfile;

    const roles = profile?.groups;
    const onHover = () => {
        setHover(!hover)
    }

    return (
        <>
            {roles?.includes("REALTOR") && (
                <Button
                    onClick={onClick}
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}>
                    Add { hover ? <FiPlus /> : ""}
                </Button>
            )}
        </>
        
    )
}


export const ActionButton = ({onClick, children, edit, title}) => {
    return (
        <Tooltip title={title} placement="top-start">
            <ButtonAction
                edit={edit}
                onClick={onClick}>
                {children}
            </ButtonAction>
        </Tooltip>
        
        
    )
}


