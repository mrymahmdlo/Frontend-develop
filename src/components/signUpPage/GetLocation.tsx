import { useTranslations } from 'next-intl';
import { CustomTextField, Icon, SubmitButton } from '@/components/General';
import {
  Box,
  CircularProgress,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
  debounce
} from '@mui/material';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/context';
import { hideModal } from '@/context/slices/modalSlice';

type CountryType = {
  country_code: string;
  country_name: string;
  regions: {
    subdivision_name: string;
  }[];
};

export default function GetLocation({
  onChange,
  onSearch,
  isLoading,
  updateLocation,
  defaultSearch
}: {
  onChange: (v: string) => void;
  onSearch: (v: string) => void;
  isLoading: boolean;
  updateLocation: (p: number) => void;
  defaultSearch: string;
}) {
  const dispatch = useAppDispatch();
  // Get countries from redux
  const countries = useAppSelector((state) => state.locations.value);
  const t = useTranslations();
  // Search field value
  const [search, setSearch] = useState('');
  // Handle spinner
  const [toggleProgress, setToggleProgress] = useState(false);
  // Selected state
  const [selectedState, setSelectedState] = useState('');
  // Scrollable element ref
  const scrollableRef = useRef();

  // Handle on submit form
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Send date to parent
    onChange(selectedState);
    // Close modal
    dispatch(hideModal());
  };

  // Handle search
  const onSearchHandler = (value: string) => {
    // Set selected null
    setSelectedState('');
    // Update search state
    setSearch(value);
    // Send data to parent
    onSearch(value);
    // Show spinner
    setToggleProgress(true);
  };

  // Is bottom state
  const [isBottom, setIsBottom] = useState(false);

  // Handle on scroll
  const handleScroll = useCallback(() => {
    if (scrollableRef.current && countries) {
      if (countries.length < 249) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;

        if (scrollTop + clientHeight === scrollHeight) {
          setIsBottom(true);
        }
      }
    }
  }, [scrollableRef, countries]);

  useEffect(() => {
    if (scrollableRef.current) {
      const div = scrollableRef.current as HTMLDivElement;
      div.addEventListener('scroll', handleScroll);
      return () => div.removeEventListener('scroll', handleScroll);
    }
  }, [scrollableRef, handleScroll]);

  // Set false is bottom after countries update
  useEffect(() => {
    setIsBottom(false);
    // Hide spinner
    setToggleProgress(false);
  }, [countries]);

  useEffect(() => {
    // Get new data
    if (isBottom && countries && search === '') {
      if (countries?.length < 249) updateLocation(countries.length / 50 + 1);
    }
  }, [isBottom]);

  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      data-test-id='location-modal'
      sx={{ height: '31rem', overflowY: 'hidden' }}
    >
      <Box
        ref={scrollableRef}
        sx={{ height: '26rem', overflowY: 'auto' }}
        pb='3rem'
      >
        <Box px='0.25rem'>
          <div data-test-id='search-container'>
            <CustomTextField
              defaultValue={defaultSearch}
              placeholder={t('Search')}
              borderRadius='99999px'
              inputWidth='26.25rem'
              onChange={debounce(
                (value) => onSearchHandler(value.target.value),
                1000
              )}
              InputProps={{
                sx: {
                  '& input': {
                    p: '0.688rem 0.25rem',
                    paddingTop: '0.75rem'
                  }
                },
                startAdornment: (
                  <Icon name='search' w={16} h={16} view='0 0 16 16' />
                )
              }}
            />
          </div>

          <Stack className='location-contianer' gap='0.5rem'>
            {toggleProgress ? (
              <Stack justifyContent='center' flexDirection='row' width='100%'>
                <CircularProgress />
              </Stack>
            ) : countries ? (
              countries.map((country: CountryType, index: number) => (
                <Box key={index}>
                  <Stack justifyContent='space-between' flexDirection='row'>
                    {/* #TODO add flag */}
                    <Stack flexDirection='row' gap='0.5rem'>
                      <Typography className='location-country'>
                        {country.country_name}
                      </Typography>
                    </Stack>

                    <Typography className='location-country'>
                      {country.country_code}
                    </Typography>
                  </Stack>

                  <div>
                    <MenuList>
                      {country.regions.map((state, index) => (
                        <MenuItem
                          selected={selectedState.includes(
                            state.subdivision_name
                          )}
                          key={`state-${index}`}
                          onClick={() =>
                            setSelectedState(
                              `${state.subdivision_name}, ${country.country_name}`
                            )
                          }
                          data-test-id={
                            state.subdivision_name === 'Tehran'
                              ? 'tehran-state'
                              : 'state'
                          }
                        >
                          <ListItemText className='location-state'>
                            {state.subdivision_name}
                          </ListItemText>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </div>
                </Box>
              ))
            ) : (
              <Typography className='location-country'>
                {t('No match found')}
              </Typography>
            )}

            {isBottom && !toggleProgress && (
              <Stack justifyContent='center' flexDirection='row' width='100%'>
                <CircularProgress />
              </Stack>
            )}
          </Stack>
        </Box>
      </Box>

      {/* Submit btn */}
      <Box bgcolor='white' p='1.5rem' width='100%'>
        <SubmitButton
          disabled={selectedState === '' ? true : false || isLoading}
        >
          <Typography fontWeight={600}>{t('Confirm')}</Typography>
        </SubmitButton>
      </Box>
    </Box>
  );
}
