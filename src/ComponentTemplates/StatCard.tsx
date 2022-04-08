
import { Box, Typography } from "@mui/material";

type Props = {
  name: string,
  content: HTMLElement
  theme: any
}

const StatCard = ({name, content, theme} : Props) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow:
          10,
        background: theme.palette.secondary.main,
        pl: 2.5,
        pr: 2.5,
        pt: 1.5,
        pb: 1.5,
      }}
    >
      <Typography variant="h4" sx={{ fontSize: 28, fontStyle: "italic", color: theme.palette.text.primary }}>
        {name}
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontSize: 36, width: "100%", textAlign: "center", color: theme.palette.text.primary }}
      >
        {content}
      </Typography>
    </Box>
  );
}

export default StatCard;