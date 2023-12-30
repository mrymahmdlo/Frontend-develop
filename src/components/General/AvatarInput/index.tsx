import { Avatar, Button, Grid } from '@mui/material';

interface AvatarProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function AvatarComponent(props: AvatarProps) {
  // const deleteFile = () => {
  //   props.file = null;
  // };

  return (
    <Grid
      container
      display={'flex'}
      justifyContent={{ xs: 'center', md: 'flex-start' }}
      alignItems='center'
    >
      <Avatar
        src={props.file ? URL.createObjectURL(props.file) : ''}
        alt='Avatar'
        style={{ width: '5em', height: '5em' }}
      />
      <Grid
        item
        display={'grid'}
        justifyItems={{ xs: 'center', md: 'flex-start', sm: 'flex-start' }}
      >
        <input
          style={{ margin: 'auto 0', marginRight: '1rem' }}
          type='file'
          onChange={(e) =>
            props.onChange(e.target.files ? e.target.files[0] : null)
          }
        />
        {props.file && (
          <Button
            style={{ color: 'red', margin: '0.3rem 0.3rem 0 0 ' }}
            onClick={() => props.onChange(null)}
          >
            حذف عکس
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
