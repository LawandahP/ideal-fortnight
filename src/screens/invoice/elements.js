import { padding } from "@mui/system";
import { TiArrowSync } from "react-icons/ti";
import styled from "styled-components";
import { borderColors, colors, invoiceStatus } from "../../styles/variables";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 10px;

    @media screen and (max-width: 600px) {
        grid-template-columns: auto;
    }
`;

export const NgDivider = styled.div`
    height: 1px;
    background: ${({ theme }) => theme.bg3};
    margin: 5px 0px 10px 0px;
`;

export const PayDate = styled.p`
    font-size: 12px;
    margin-right: 15px;
`;

export const InvoiceStatus = styled.div`
    background: ${({ overdue, fully_paid, partially_paid, open }) =>
        overdue
            ? `${invoiceStatus.overdue}`
            : fully_paid
            ? `${invoiceStatus.fully_paid}`
            : partially_paid
            ? `${invoiceStatus.partially_paid}`
            : open
            ? `${invoiceStatus.open}`
            : `#fff`};
    color: #fff;
    padding: 3px;
    text-align: center;
    border-radius: 50px;
    width: 100px;
    /* text-transform: uppercase; */
`;

export const InvoiceContainer = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: 3.5fr 1fr;
    grid-gap: 5px;
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
    height: 350px;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    width: 100% !important;
    overflow: auto;
`;

export const InvoiceSummaryContainer = styled.div`
    text-align: center;
    position: sticky;
    /* height: 100vh; */
    overflow: auto;
    /* right: 1 */
`;

export const InvoiceInlineContainer = styled.div`
    display: inline-block;
    text-align: center;
`;

export const TotalInvoice = styled.p`
    font-size: 1.2rem;
    font-weight: 700;
`;

export const InvoiceChart = styled.div`
    width: auto;
    display: flex;
    height: auto;
`;

export const InvoiceFilterContainer = styled.div`
    display: inline-block;
    width: 175px;
    text-align: center;
    object-fit: cover;
`;
export const InvoiceListFilterContainer = styled.div`
    display: flex;
`;

export const InvoiceStatusFilter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 3px;

    &:hover {
        background: ${({ overdue, fully_paid, partially_paid, open }) =>
            overdue
                ? `${invoiceStatus.overdue_light}`
                : fully_paid
                ? `${invoiceStatus.fully_paid_light}`
                : partially_paid
                ? `${invoiceStatus.partially_paid_light}`
                : open
                ? `${invoiceStatus.open_light}`
                : ""};
        border-radius: 5px;
    }
`;

export const TextInvoiceSummary = styled.p`
    text-align: start;
    font-size: ${({ cash }) => (cash ? `0.8rem` : `0.6rem`)};
    font-weight: ${({ cash }) => (cash ? `500` : "")};
    color: ${({ overdue, fully_paid, partially_paid, open }) =>
        overdue
            ? `${invoiceStatus.overdue}`
            : fully_paid
            ? `${invoiceStatus.fully_paid}`
            : partially_paid
            ? `${invoiceStatus.partially_paid}`
            : open
            ? `${invoiceStatus.open}`
            : ""};
`;

export const ClearFilterBtn = styled.button`
    cursor: pointer;
    padding: 3px;
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    /* -webkit-appearance: none; */

    &:hover {
        background: ${({ theme }) => theme.bg};
    }
`;

// #Invoice Styling

export const InvoiceDetailContainer = styled.div`
    color: #000;
`;

export const InvoiceHeader = styled.div`
    background: ${({ overdue, fully_paid, partially_paid, open }) =>
        overdue
            ? `${invoiceStatus.overdue_light}`
            : fully_paid
            ? `${invoiceStatus.fully_paid_light}`
            : partially_paid
            ? `${invoiceStatus.partially_paid_light}`
            : open
            ? `${invoiceStatus.open_light}`
            : ""};
    display: grid;
    color: #000;
    grid-template-columns: auto auto auto auto;
    padding: 10px;
    margin-bottom: 10px;
    /* justify-content: space-evenly; */
    align-items: center;

    @media screen and (max-width: 820px) {
        grid-template-columns: auto auto;
    }
    @media screen and (max-width: 768px) {
        grid-template-columns: auto auto;
    }
    @media screen and (max-width: 500px) {
        grid-template-columns: auto;
    }
`;

export const InvoiceDetailStatus = styled.div`
    transform: rotate(10deg);
    /* width: 30%; */
    display: inline-block;
    /* justify-content: flex-start; */
    border: 2px solid #fff;
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ overdue, fully_paid, partially_paid, open }) =>
        overdue
            ? `${invoiceStatus.overdue}`
            : fully_paid
            ? `${invoiceStatus.fully_paid}`
            : partially_paid
            ? `${invoiceStatus.partially_paid}`
            : open
            ? `${invoiceStatus.open}`
            : ""};

    border: ${({ overdue, fully_paid, partially_paid, open }) =>
        overdue
            ? `${invoiceStatus.overdue_border}`
            : fully_paid
            ? `${invoiceStatus.fully_paid_border}`
            : partially_paid
            ? `${invoiceStatus.partially_paid_border}`
            : open
            ? `${invoiceStatus.open_border}`
            : ""};

    @media screen and (max-width: 600px) {
        /* display: inline-block; */
        transform: none;
    }
`;

export const InvoiceActionContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 20px 80px 0px 80px;
    overflow: auto;

    @media screen and (max-width: 600px) {
        padding: 10px 10px 0px 10px;
        width: 100%;
        justify-content: center;
        display: block;
    }
`;

export const InvoiceActionWrapper = styled.div`
    display: flex;
    padding: 0px 5px 0px 0px;

    @media screen and (max-width: 600px) {
        padding: 0px 10px 0px 0px;
        width: 100%;
    }
`;

export const InvoiceTableContainer = styled.div`
    padding: 0px 100px 0px 100px;
    color: grey;
    overflow: auto;
    margin-top: 20px;

    @media screen and (max-width: 600px) {
        padding: 0px 0px 0px 0px;
        width: 100%;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin-bottom: 20px;

    th,
    td {
        text-align: left;
        padding: 20px 0px 20x 0px;
    }

    td.item,
    td.desc {
        vertical-align: top;
    }

    td {
        font-size: 0.7em;
    }

    tr.total {
        margin-top: 5px;
    }
`;

export const Th = styled.th`
    padding: 4px 0px 4x 0px;
    /* padding: 5px 20px; */
    font-size: 0.8em;
    color: #5d6975;
    border-bottom: 1px solid #c1ced9;
    white-space: nowrap;
    font-weight: normal;
`;
export const Td = styled.td`
    /* padding: ${({ info }) =>
        info ? `0px 0px 0px 8px` : `0px 8px 0px 0px`}; */
    color: ${({ balance, paid }) => (balance ? `red` : paid ? `green`: ``)};
    font-weight: ${({ balance }) => (balance ? `600` : "")};
    padding: 2px 0px 2px 0px;
    text-align: right;
    /* border: none; */
`;
export const IconButton = styled.div`
    margin: 0px 5px 0px 5px;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
`;
export const InvoiceButton = styled.button`
    margin: 3px;
    border-radius: 5px;
    background: ${({ primary, warning, info, danger }) =>
        primary
            ? `${colors.primary}`
            : warning
            ? `${colors.warning}`
            : info
            ? `${colors.info}`
            : danger
            ? `${colors.danger}`
            : "none"};

    border: ${({
        primary,
        warning,
        info,
        danger,
        primary_outline,
        warning_outline,
        info_outline,
        danger_outline,
    }) =>
        primary
            ? `${borderColors.primary}`
            : warning
            ? `${borderColors.warning}`
            : info
            ? `${borderColors.info}`
            : danger
            ? `${borderColors.danger}`
            : primary_outline
            ? `${borderColors.primary}`
            : warning_outline
            ? `${borderColors.warning}`
            : info_outline
            ? `${borderColors.info}`
            : danger_outline
            ? `${borderColors.danger}`
            : "#010606"};

    padding: ${({ big }) => (big ? `14px 18px` : `5px 10px 5px 10px`)};

    color: ${({
        dark,
        primary_outline,
        warning_outline,
        info_outline,
        danger_outline,
    }) =>
        dark
            ? "#010606"
            : primary_outline
            ? `${colors.primary}`
            : warning_outline
            ? `${colors.warning}`
            : info_outline
            ? `${colors.info}`
            : danger_outline
            ? `${colors.danger}`
            : "#fff"};

    font-size: ${({ fontBig }) => (fontBig ? "20px" : "11px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 500ms ease-in-out;
        background: ${({
            dark,
            primary_outline,
            warning_outline,
            info_outline,
            danger_outline,
        }) =>
            dark
                ? "#010606"
                : primary_outline
                ? `${colors.primary}`
                : warning_outline
                ? `${colors.warning}`
                : info_outline
                ? `${colors.info}`
                : danger_outline
                ? `${colors.danger}`
                : "none"};

        color: ${({ primary, warning, info, danger }) =>
            primary
                ? `${colors.primary}`
                : warning
                ? `${colors.warning}`
                : info
                ? `${colors.info}`
                : danger
                ? `${colors.danger}`
                : "#fff"};

        border: ${({
            primary,
            warning,
            info,
            danger,
            primary_outline,
            warning_outline,
            info_outline,
            danger_outline,
        }) =>
            primary
                ? `${borderColors.primary}`
                : warning
                ? `${borderColors.warning}`
                : info
                ? `${borderColors.info}`
                : danger
                ? `${borderColors.danger}`
                : primary_outline
                ? `${borderColors.primary}`
                : warning_outline
                ? `${borderColors.warning}`
                : info_outline
                ? `${borderColors.info}`
                : danger_outline
                ? `${borderColors.danger}`
                : "#010606"};
    }
`;

export const ListItem = styled.div``;
