'use client';

import { Box } from '@mui/material';
import RuleChecker from '../RuleChecker';
import { useTranslations } from 'next-intl';
import { patterns } from '@/utils/validations/validationMessageHandler';

export default function PasswordRuleChecker({
  password
}: {
  password: string;
}) {
  const t = useTranslations();

  return (
    <Box>
      <RuleChecker
        isChecked={password.length >= 8 && password.length <= 32}
        label={t('Password characters')}
      />
      <RuleChecker
        isChecked={password ? password.indexOf(' ') === -1 : false}
        label={t('No space')}
      />
      <RuleChecker
        isChecked={patterns.strongPassword.test(password)}
        label={t('At least character')}
      />
    </Box>
  );
}
