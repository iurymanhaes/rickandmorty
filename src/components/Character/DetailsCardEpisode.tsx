import { Box, Typography, Divider } from "@mui/material";

import dayjs from "dayjs";

import {
  robotoFont,
  robotoFontNormal,
} from "@src/styles/fonts";


type Props = {
  episode: IEpisode;
};

export const DetailsCardEpisode = ({ episode }: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography className={robotoFont.className} component="p">
        {episode.episode}
      </Typography>
      <Typography
        variant="subtitle1"
        className={robotoFontNormal.className}
        component="p"
      >
        {episode.name}
      </Typography>
      <Typography
        variant="overline"
        className={robotoFont.className}
        component="p"
      >
        {dayjs(episode.air_date).format("DD/MM/YYYY")}
      </Typography>
      <Divider />
    </Box>
  );
};
