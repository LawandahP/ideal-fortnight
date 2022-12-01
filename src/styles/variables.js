import { css } from "styled-components";

export const colors = {
    primary: `#0057D9`,
    warning: `#ffcc00`,
    info: `#03d3fc`,
    danger: `#ff0000`,
};

export const lightColors = {
    danger: `#f7cbcb`,
    primary: `#bcebd7`,
    partially_paid_light: `#baeaf7`,
    open_light: `#97a4db`,
};

export const borderColors = {
    primary: `1px solid #0057D9`,
    warning: `1px solid #ffcc00`,
    info: `1px solid #03d3fc`,
    danger: `1px solid #ff0000`,
};

export const spacing = {
    sidebarWidth: `250px`,
    sidebarWidthSm: `20px`,

    leftSideBarSm: `230px`,
    leftSideBarLg: `450px`,

    xsSpacing: `4px`,
    smSpacing: `8px`,
    mdSpacing: `12px`,
    lgSpacing: `24px`,
    xlSpacing: `32px`,
    xxlSpacing: `48px`,
    borderRadius: `6px`,
    ngMainSmSpacing: `4px`,
};

export const navBarStyles = {
    xsSpacing: `2px`,
    smSpacing: `4px`,
    height: `60px`,
    background: ``,
};

export const btnReset = css`
    font-family: inherit;
    outline: none;
    border: none;
    background: none;
    letter-spacing: inherit;
    color: inherit;
    font-size: inherit;
    text-align: inherit;
    padding: 0;
`;

export const fontSize = {
    smSideBar: `.85rem`,
    mdSideBar: `1rem`,
    sm: `12px`,
};

export const borderRadius = {
    sm: `5px`,
    md: `10px`,
    large: `50%`,
};

// #f7cbcb

export const invoiceStatus = {
    overdue: `#ff0000`,
    fully_paid: `#0057D9`,
    partially_paid: `#02c2f5`,
    open: `#0d1a4f`,

    overdue_light: `#f7cbcb`,
    fully_paid_light: `#bcebd7`,
    partially_paid_light: `#baeaf7`,
    open_light: `#97a4db`,

    overdue_border: `1px solid #ff0000`,
    fully_paid_border: `1px solid #0057D9`,
    partially_paid_border: `1px solid #02c2f5`,
    open_border: `1px solid #0d1a4f`,
};

export const transitions = {
    short: `all 200ms ease-in-out`,
    long: `all 500ms ease-in-out`,
};

export const shadows = {
    card_shadow: `0 1px 3px rgba(0, 0, 0, 0.02)`,
};
