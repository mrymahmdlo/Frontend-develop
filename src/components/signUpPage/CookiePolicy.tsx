import { Box } from '@mui/material';

export default function CookiePolicy({ body }: { body: TrustedHTML }) {
  return (
    <Box className='policy-box' data-test-id='cookie-policy'>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
    </Box>
  );
}
