import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountEditForm from './editForm';
import AuditScreen from './audit';
import { NgPageContainer } from '../../components/display/elements';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <p>{children}</p>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <NgPageContainer>
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
        <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
          <Tab label={<p>Account Settings</p>} {...a11yProps(0)} />
          {/* <Tab label={<p>Audit</p>} {...a11yProps(1)} /> */}
          {/* <Tab label="Item Three" {...a11yProps(2)} />  */}
        </Tabs>
      {/* </Box> */}

      <TabPanel value={value} index={0}>
        <AccountEditForm />
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <AuditScreen />
      </TabPanel> */}
    </NgPageContainer>
  );
}
