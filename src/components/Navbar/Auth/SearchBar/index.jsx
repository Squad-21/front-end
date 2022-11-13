import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBar() {
  return (
    <form>
      <TextField
        id="search-bar"
        label="Digite aqui"
        variant="outlined"
        placeholder="Pesquisar..."
        size="small"
        sx={{
          backgroundColor: "white",
          borderRadius: "4px 0 0 4px",
          "& label.Mui-focused": {
            color: "#FE2F01",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "blue",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FE2F01",
            },
          },
        }}
      />
      <IconButton
        type="submit"
        aria-label="search"
        sx={{
          backgroundColor: "white",
          borderRadius: "0 4px 4px 0",
          "&.MuiButtonBase-root:hover": {
            backgroundColor: "white",
          },
        }}
      >
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>
  );
}
