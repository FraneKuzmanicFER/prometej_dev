import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea } from "@mui/material";

interface Props {
  name: string;
  authorName: string;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function QuizContainer(props: Props) {
  return (
    <Card>
      <CardActionArea>
        <CardHeader
          title={<Typography variant="h6">{props.name}</Typography>}
        />
        <CardContent
          sx={{ display: "flex", alignItems: "center", marginTop: 4 }}
        >
          <Avatar sx={{ bgcolor: stringToColor(props.authorName) }}>
            {props.authorName[0].toUpperCase()}
          </Avatar>
          <Typography
            sx={{ marginLeft: 1.5, fontSize: 14 }}
            gutterBottom
            variant="h6"
            component="div"
          >
            {props.authorName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
