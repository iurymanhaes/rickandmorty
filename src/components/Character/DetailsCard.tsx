import { Box, Divider, Typography } from "@mui/material";
import { robotoFont } from "@src/styles/fonts";

type Props = {
  title: string;
  subtitle?: string;
};

export const DetailsCard = ({ title, subtitle }: Props) => {
  return (
    <Box sx={{ width: "100%", height: "64px" }}>
      <Typography fontWeight={700} className={robotoFont.className}>
        {title}
      </Typography>
      <Typography variant="caption" className={robotoFont.className}>
        {subtitle == "" ? "N/A" : subtitle}
      </Typography>
      <Divider />
    </Box>
  );
};
