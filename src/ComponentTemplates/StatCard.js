import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { theme } from "../theme";

export default function StatCard(props) {
    return <Box>
        <Card variant="outlined">
            <CardContent>
            <Typography variant="h4" style={{fontSize: 28, fontStyle: "italic"}}>{props.name}</Typography>
            <Typography variant="h4" style={{fontSize: 36, width: "100%", textAlign: "center"}}>{props.content}</Typography>
            </CardContent>
        </Card>
    </Box>
};