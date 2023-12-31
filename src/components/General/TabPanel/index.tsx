import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number | string;
  value: number | string;
  style?: object;
}

export default function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`tab-panel-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `tab-panel-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
