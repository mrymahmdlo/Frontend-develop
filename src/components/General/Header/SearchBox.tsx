'use client';

// mui imports
import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

// local imports
import { Icon } from '@/components/General';

const Search = styled('div')(({ theme }) => ({
  borderRadius: '30px',
  backgroundColor: theme.palette.gray[100],
  width: '100%',
  padding: '4px',
  position: 'relative'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 2, 2, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '360px'
  }
}));

export default function SearchBox() {
  // todo
  // add logic

  return (
    <Search>
      <SearchIconWrapper>
        <Icon name='search' view='0 0 21 21' />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}
