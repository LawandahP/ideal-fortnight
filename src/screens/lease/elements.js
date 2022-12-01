import { TiArrowSync } from "react-icons/ti";
import styled from "styled-components";
import { spacing, shadows, colors } from "../../styles/variables";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 10px;

    @media screen and (max-width: 600px) {
        grid-template-columns: auto;
    }
`;

export const RadioButtonLabel = styled.label`
    position: absolute;
    top: 25%;
    left: 8px;
    width: 24px;
    height: 24px;
    border-radius: 20%;
    background: white;
    border: 1px solid #ccc;
`;

export const NgDivider = styled.div`
    height: 1px;
    background: ${({ theme }) => theme.bg3};
    margin: 5px 0px 10px 0px;
`;

export const RefreshButton = styled(TiArrowSync)`
    font-size: 1.5rem;
    cursor: pointer;
    color: grey;

    &:hover {
        color: ${colors.primary};
    }
`;

export const PayDate = styled.p`
    font-size: 12px;
    margin-right: 15px;
`;

export const LeaseStatus = styled.div`
    background: ${({ Open, Active, InProcess, Expired }) =>
        Open
            ? `#0d1a4f`
            : Active
            ? `#0057D9`
            : InProcess
            ? `#43d1f7`
            : Expired
            ? `#ccc`
            : `#fff`};
    /* border: ${({ Open, Active, InProcess, Expired }) =>
        Open
            ? `1px solid #ff0000`
            : Active
            ? `1px solid green`
            : InProcess
            ? `1px solid #00c8ff`
            : Expired
            ? `1px solid grey`
            : `#fff`};
  color:  ${({ Open, Active, InProcess, Expired }) =>
        Open
            ? `#ff0000`
            : Active
            ? `#0057D9`
            : InProcess
            ? `#00c8ff`
            : Expired
            ? `grey`
            : ""};; */
    color: #fff;
    padding: 3px;
    text-align: center;
    border-radius: 50px;
    width: 100px;
`;

export const RentContainer = styled.div`
    display: flex;
    align-content: center;
`;

export const RentInlineContainer = styled.div`
    display: inline-block;
    margin: 5px 5px 8px 5px;
`;

export const RentAmount = styled.p`
    font-size: 20px;
    font-weight: 700;
    margin: 5px 0px 0px 0px;
    color: ${colors.primary};
`;
export const RentHeader = styled.div`
    text-align: center;
    margin-bottom: 10px;
`;
export const RentSummary = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    /* grid-row-gap: 8px; */
    grid-gap: 5px;
`;

export const RText = styled.p`
    color: ${({ head, body }) => (head ? "" : `#0057D9`)};
    font-size: ${({ head, body }) => (head ? "10px" : `400`)};
    font-weight: ${({ head, body }) => (head ? "" : `400`)};
`;

export const RTPaper = styled.div`
    background: ${({ theme }) => theme.bg};
    /* display: flex; */
    border-radius: 5px;
    /* height: 350px; */
    padding: 10px;
    box-shadow: ${shadows.card_shadow};
    width: 100% !important;
    overflow: auto;
`;

// Tenant Screen Styles

export const TLeaseContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 10px;

    @media screen and (max-width: 414px) {
        grid-template-columns: auto;
    }
`;

export const InlineWrapper = styled.div`
    display: block;
    /* text-align: center; */
`;

export const TLeaseCard = styled.div`
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    background: ${({ theme }) => theme.bg};
    padding: 1rem;
    margin-bottom: 10px;
`;

export const TLeaseFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background: ${({ theme }) => theme.bg}; */
    /* padding: 1rem;
    margin-bottom: 10px; */
`;
