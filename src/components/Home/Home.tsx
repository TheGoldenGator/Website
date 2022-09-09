import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const Home = () => {
  return (
    <>
      <Box>
        <Stack direction="column">
          <Typography variant="h5" sx={{ paddingBottom: 1 }}>
            Upcomming Events
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default Home;
