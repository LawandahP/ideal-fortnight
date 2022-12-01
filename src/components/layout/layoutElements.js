import styled from "styled-components";
import { navBarStyles, spacing } from "../../styles/variables";

export const NgLayout = styled.div`
    display: flex;
    transition: 0.3s ease-in-out;
`;

export const NgMainContainer = styled.main`
    /* padding: calc(${navBarStyles.smSpacing}); */
    transition: all 0.3s ease-in-out;
    width: 100%;
`;

export const NgMain = styled.main`
    width: 100%;
    padding: calc(${spacing.mdSpacing});

    @media screen and (max-width: 768px) {
        padding: calc(${spacing.ngMainSmSpacing});
    }
`;

// export const
