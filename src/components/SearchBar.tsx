import { Box, TextField } from '@mui/material';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <Box>
      <TextField
        label="Search Images"
        variant="outlined"
        fullWidth
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
