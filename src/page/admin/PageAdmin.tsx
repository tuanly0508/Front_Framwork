import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { userController } from '../../controllers/UserController';
import Categorys from './category/Category';

import MenuOrder from './order/MenuOrder';
import OrderAdmin from './order/Pending';
import ProductAdmin from './ProductAdmin';
import User from './users/User';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component='span'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function PageAdmin() {
  const userContext = useContext(UserContext)
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    userController.getMe().then (res => {
      userContext.changeUser(res)
    })
  },[])

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'grid', gridTemplateColumns: ' 12% 88%', height: '100vh' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value} 
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Product Manager" {...a11yProps(0)} />
        <Tab label="Order Manager" {...a11yProps(1)} />
        <Tab label="User Manager" {...a11yProps(2)} />
        <Tab label="Category Manager" {...a11yProps(3)} />

      </Tabs>
      <TabPanel value={value} index={0}>
        <ProductAdmin />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MenuOrder />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <User />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Categorys/>
      </TabPanel>
    </Box>
  );
}
