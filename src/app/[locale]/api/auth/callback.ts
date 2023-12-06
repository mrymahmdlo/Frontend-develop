// pages/api/auth/callback.js

import { apiHandler } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function callbackHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { code, state } = req.query;

    // Ensure that the state matches what was initially sent during the OAuth initiation

    try {
      // Call your API handler to complete the OAuth flow
      const result = await apiHandler('/api/auth/callback/', 'POST', {
        code,
        state
      });

      // Handle the result as needed
      if (result.errors) {
        // Handle error
        const error = result.errors[0];
        console.log('error', error);
        res.status(500).json({ error: 'OAuth callback error' });
      } else {
        // Redirect or respond as required
        res.status(200).json({ message: 'OAuth callback successful' });
      }
    } catch (error) {
      console.error('An error occurred', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
