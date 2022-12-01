import styled from "styled-components";

export const TableTop = styled.div`
    justify-content: end;
    display: ${({ hidden }) => (hidden ? `none` : `flex`)};
    padding-bottom: 5px;
    height: 40px;
`;

export const Chip = styled.div`
    border-radius: 50px;
    background: ${({ active }) => (active ? "#0057D9" : "red")};
    white-space: nowrap;
    /* padding: 12px 30px; */
    color: ${({ dark }) => (dark ? "#010606" : "#fff")};
    font-style: ${({ fontBig }) => (fontBig ? "20px" : "#16px")};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    font-size: 10px;
    width: 55px;
    padding: 5px;
    font-weight: bold;
`;

export const Table = styled.table``;
export const TBody = styled.tbody``;

export const TRow = styled.tr``;

export const THead = styled.thead``;

export const TCell = styled.th``;

export const Td = styled.td``;
