import { Box, TextField } from '@mui/material';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box>
      <TextField
        label="Search Images"
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleOnChange}
      />
    </Box>
  );
};

export default SearchBar;
