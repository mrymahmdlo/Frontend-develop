import { Stack } from '@mui/material';

interface IntProps {
  children: React.ReactNode;
  color: string;
  isMini?: boolean;
  isNft?: boolean;
}

export default function SmoothSliderCard({
  children,
  color,
  isMini = false,
  isNft = false
}: IntProps) {
  return (
    <Stack
      sx={{
        background: color,
        borderRadius: '0.5rem',
        justifyContent: isNft ? 'end' : 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: '92px',
        height: isMini ? '58px' : '117px'
      }}
    >
      {children}
    </Stack>
  );
}
