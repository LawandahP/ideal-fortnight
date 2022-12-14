
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}


// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Avatar from '@mui/material/Avatar';
// import Badge from '@mui/material/Badge';
// import Box from '@mui/material/Box';

export default function CustomAvatar(name) {
    return {
        sx: {bgcolor: stringToColor(name),},
        children: `${name?.split(' ')?.[0]?.[0]}${name?.split(' ')?.[1]?.[0]}`,
    };
}

