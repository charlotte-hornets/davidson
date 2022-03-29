import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";

type Props = {
  name: string,
  content: HTMLElement
}

const StatCard = ({name, content} : Props) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow:
          "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px",
        background: "#FFF",
        pl: 2.5,
        pr: 2.5,
        pt: 1.5,
        pb: 1.5,
      }}
    >
      <Typography variant="h4" style={{ fontSize: 28, fontStyle: "italic" }}>
        {name}
      </Typography>
      <Typography
        variant="h4"
        style={{ fontSize: 36, width: "100%", textAlign: "center" }}
      >
        {content}
      </Typography>
    </Box>
  );
}

export default StatCard;