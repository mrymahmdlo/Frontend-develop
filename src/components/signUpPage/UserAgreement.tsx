import { Box } from '@mui/material';

export default function UserAgreement({ body }: { body: TrustedHTML }) {
  return (
    <Box className='policy-box' data-test-id='user-agreement'>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
    </Box>
  );
}
