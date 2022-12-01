import styled from 'styled-components'
import { colors, transitions } from '../../styles/variables';

import { Link as RouterLink } from 'react-router-dom';
import { MdTaskAlt } from 'react-icons/md';

export const Link = styled(RouterLink)`
    text-decoration: none;
    color: inherit;
`;

export const Container = styled.div`
    margin-top: 5px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;

    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 414px) {
        grid-template-columns: 1fr;
    }
`
export const PropertyCard = styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background: ${({ theme }) => theme.bg};
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 5px;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        transition: ${transitions.long};
    }
`;

export const PropertyName = styled.div`
    font-size: 1rem;
    font-weight: 600;
`;

export const ImageContainer = styled.div`
    width: inherit;
`
export const ImageWrapper = styled.div`
    width: 250px;
    height: auto;
`;

export const Image = styled.img`
    object-fit: fill;
    height: 100%;
    width: 100%;
    border-radius: 5px 5px 0px 0px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

export const AmenityWrapper = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`
export const Amenity = styled.li`
    display: inline;
    margin-right: 2px;
    background: grey;
    text-align: center;
    font-size: 10px;
    color: #fff;
    border-radius: 20px;
    padding: 0px 4px 0px 4px;
`

export const BodyContainer = styled.div`
    padding: 0rem 0.5rem 0.5rem 0.5rem;
`

export const Text = styled.p`
    font-size: ${({ header }) => (header ? `10px` : `9px`)};
    color: ${({ header }) => (header ? `` : `grey`)};
    font-weight: ${({ header }) => (header ? `500` : ``)};
    padding-bottom: ${({ header }) => (header ? `` : `4px`)};
`


export const PageHeading = styled.div`
    font-size: 14px;
    font-weight: 600;
`
export const AmenitiesList = styled.li`
    list-style: none;
    display: flex;
    align-content: center;
    
    margin-bottom: 5px;
    font-size: 14px;
`

export const AmenityIcon = styled(MdTaskAlt)`
    margin-right: 5px;
    color: ${colors.primary};
`