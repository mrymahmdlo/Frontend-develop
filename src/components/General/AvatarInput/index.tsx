import { Avatar } from '@mui/material';

interface AvatarProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function AvatarComponent(props: AvatarProps) {
  return (
    <div>
      <Avatar
        src={props.file ? URL.createObjectURL(props.file) : ''}
        alt='Avatar'
        style={{ width: '3em', height: '3em' }}
      />
      <input
        type='file'
        onChange={(e) =>
          props.onChange(e.target.files ? e.target.files[0] : null)
        }
      />
    </div>
  );
}
