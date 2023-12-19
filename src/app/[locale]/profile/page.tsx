'use client';

import { AuthContainer } from '@/components/General';
import Profile from '@/components/ProfilePage';

export default function onBoarding() {
  return (
    <AuthContainer fillContainer>
      <Profile />
    </AuthContainer>
  );
}
