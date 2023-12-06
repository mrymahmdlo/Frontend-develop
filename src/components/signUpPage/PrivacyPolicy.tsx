import { Box } from '@mui/material';

export default function PrivacyPolicy({ body }: { body: TrustedHTML }) {
  return (
    <Box className='policy-box' data-test-id='privacy-policy'>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
    </Box>
  );
}
