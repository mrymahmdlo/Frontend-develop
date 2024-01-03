'use client';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

// mui imports
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Grid,
  Typography
} from '@mui/material';

// local imports
import Icon from '@/components/General/Icon';
import GrayDotSpinner from '../General/DotSpinnerGray';
import qa from './question.json'
// styles
import classes from '@/assets/styleSheets/help-center.module.scss';

type QuestionType = {
  question: string;
  text: string;
};

export default function Questions() {
  const t = useTranslations();

  const [expanded, setExpanded] = useState<string | false>(false);
  const [questions, setQuestions] = useState<QuestionType[] | undefined>();
  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const router = useRouter();

  function backPreviousPage() {
    router.back();
  }

  // use api route approach  @parna
  useEffect(() => {
   setQuestions(qa)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.HelpCenterContainer}>
      <Card className={classes.CardContainer}>
        <Grid
          container
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Grid item container className={classes.TitleContainer}>
            <Grid item xs={1} md={2} container justifyContent={'flex-start'}>
              <Button
                className={classes.BackIconButton}
                onClick={backPreviousPage}
              >
                <Icon name='arrowLeft' view='0 0 26 26' />
              </Button>
            </Grid>
            <Grid
              item
              xs={10}
              md={8}
              container
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Typography className={classes.Title}>
                {t('Help center')}
              </Typography>
            </Grid>
            <Grid item xs={1} md={2}></Grid>
          </Grid>
          <Grid item>
            {questions ? (
              questions.map((item, index) => (
                <Accordion
                  className={classes.Accordian}
                  key={index}
                  expanded={expanded === 'panel' + index}
                  onChange={handleChange('panel' + index)}
                >
                  <AccordionSummary
                    expandIcon={<Icon name='blueArrowDown' />}
                    aria-controls='panel1a-content'
                    className={classes.AccordianSummary}
                  >
                    <Typography
                      className={classes.AccordianTitle}
                      sx={{ fontSize: { xs: '14px', sm: '16px' } }}
                    >
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.AccordianDetails}>
                    <Typography sx={{ fontSize: { xs: '12px', sm: '16px' } }}>
                      {item.text}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <GrayDotSpinner />
            )}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
