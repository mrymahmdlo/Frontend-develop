import { SvgIcon, SxProps, Typography } from '@mui/material';
import { IconsListType, icons } from './iconLists';

interface IntProps {
  name: IconsListType;
  w?: number;
  h?: number;
  style?: SxProps;
  view?: string;
  text?: string;
}

export default function Icon({
  name,
  w = 24,
  h = 24,
  style,
  view = '0 0 24 24',
  text
}: IntProps) {
  return (
    <div style={{ display: 'flex' }}>
      <SvgIcon
        sx={{ width: `${w}px`, height: `${h}px`, ...style }}
        viewBox={view}
      >
        {icons[name]}
      </SvgIcon>
      {text ? (
        <Typography color='#fff' fontSize={12}>
          {text}
        </Typography>
      ) : null}
    </div>
  );
}
