'use client';

import FavoriteMarketModalHandler from '@/components/DashboardPage/FavoriteMarketModalHandler';
import { AuthContainer } from '@/components/General';

export default function Dashboard() {
  return (
    <AuthContainer>
      <FavoriteMarketModalHandler />
    </AuthContainer>
  );
}
