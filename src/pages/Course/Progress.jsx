import { LinearProgress } from "@mui/material";

const Progress = ({value}) => {
  return (
    <div className="relative">
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          padding: "10px",
          borderRadius: "4px",
          ".MuiLinearProgress-bar": {
            backgroundColor: "#5458BE",
          },
          ".MuiLinearProgress-root": {
            backgroundColor: "#C5C7EA",
          },
        }}
      />
      <p className="absolute top-[2px] left-2 text-white text-xs font-semibold">
        {value}%
      </p>
    </div>
  );
}

export default Progress;
