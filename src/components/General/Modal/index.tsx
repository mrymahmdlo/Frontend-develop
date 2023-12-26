// mui imports
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton
} from '@mui/material';

// local imports
import Icon from '@/components/General/Icon';
import { useAppDispatch, useAppSelector } from '@/context';
import { hideModal } from '@/context/slices/modalSlice';

// DOCUMENT
// how to use modal in app
// first call useAppDispatch
// then call showModal with requiered parameters
// for hiding the modal, call hideModal without parameters
//
// const dispatch = useAppDispatch();
// dispatch(showModal({...ModalState(watch in context/slices/modalSlice)}));
// dispatch(hideModal());

export default function UniversalModalContainer() {
  const open = useAppSelector((state) => state.modal.modalState);
  const children = useAppSelector((state) => state.modal.modalContent);
  const actions = useAppSelector((state) => state.modal.modalActions);
  const title = useAppSelector((state) => state.modal.modalHeaderTitle);
  const disableUserCloseAct = useAppSelector(
    (state) => state.modal.modalDisableClose
  );
  const maxWidth = useAppSelector((state) => state.modal.modalMaxWidth);
  const modalBackIconFunction = useAppSelector(
    (state) => state.modal.modalBackIconFunction
  );
  const appendActionSheet = useAppSelector(
    (state) => state.modal.modalAppendActionSheet
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (!disableUserCloseAct) dispatch(hideModal());
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='universal-modal-app'
      open={open}
      disableEscapeKeyDown={disableUserCloseAct}
      maxWidth={maxWidth}
      fullScreen={appendActionSheet}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2.4,
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {modalBackIconFunction ? (
          <IconButton
            aria-label='back'
            onClick={() => {}}
            sx={{ p: 0, width: '30px' }}
          >
            <Icon name='arrowLeft' w={20} h={20} view='0 0 24 24' />
          </IconButton>
        ) : (
          <Box sx={{ width: '30px' }}></Box>
        )}
        {title ?? <Icon name='logo' w={110} h={26} view='0 0 110 29' />}
        {!modalBackIconFunction ? (
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ width: '30px', p: 0 }}
          >
            <Icon name='closeCircle' w={28} h={28} view='0 0 40 40' />
          </IconButton>
        ) : (
          <Box sx={{ width: '30px' }}></Box>
        )}
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ minWidth: '250px', p: 2 }}>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}
