
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
          "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px",
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