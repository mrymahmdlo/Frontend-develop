import * as React from 'react';

// mui imports
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

// local imports
import Icon from '@/components/General/Icon';
import { useAppDispatch, useAppSelector } from '@/context';
import { hideAlert } from '@/context/slices/alertSlice';

// styles
import theme from '@/lib/ThemeRegistery/theme';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AletContainer() {
  const open = useAppSelector((state) => state.alert.alertState);
  const children = useAppSelector((state) => state.alert.alertContent);
  const title = useAppSelector((state) => state.alert.alertHeaderTitle);
  const maxWidth = useAppSelector((state) => state.alert.alertMaxWidth);
  const alertBackFunction = useAppSelector(
    (state) => state.alert.alertBackIconFunction
  );
  const showAlertClose = useAppSelector(
    (state) => state.alert.alertBackIconFunction
  );
  const appendActionSheet = useAppSelector(
    (state) => state.alert.alertAppendActionSheet
  );

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(hideAlert());
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-app'
      maxWidth={maxWidth}
      fullScreen={appendActionSheet}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'center', p: 1 }}
        onClick={handleClose}
      >
        <Box
          sx={{
            width: '36px',
            height: '6px',
            backgroundColor: theme.palette.gray[100],
            borderRadius: '16px',
            cursor: 'pointer'
          }}
        ></Box>
      </Box>
      <DialogTitle
        sx={{
          m: 0,
          p: title ? 1.2 : 0,
          width: '100%',
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center'
        }}
        data-test-id='universal-alert-app'
      >
        {alertBackFunction ? (
          <IconButton aria-label='back' onClick={alertBackFunction}>
            <Icon name='arrowLeft' w={20} h={20} view='0 0 30 30' />
          </IconButton>
        ) : (
          <Box sx={{ width: '30px' }}></Box>
        )}
        {title}
        {showAlertClose ? (
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ width: '30px' }}
          >
            <Icon name='closeCircle' w={28} h={28} view='0 0 40 40' />
          </IconButton>
        ) : (
          <Box sx={{ width: '30px' }}></Box>
        )}
      </DialogTitle>
      <DialogContent sx={{ minWidth: '250px', p: 2 }}>{children}</DialogContent>
    </Dialog>
  );
}
