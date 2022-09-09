import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Streams from "../Streams/Streams";
import Navbar from "./Navbar";

type ContextType = {
  streams: Stream[] | null;
  setStreams: React.Dispatch<React.SetStateAction<Stream[] | null>>;
};

export const Base = () => {
  // This determines if the user wants to use real-time updates with SSE or poll every 5 minutes.
  const [streams, setStreams] = useState<Stream[] | null>(null);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState<boolean>(false);

  // Tab navigation
  const [value, setValue] = useState(
    localStorage.getItem("tab") !== null
      ? parseInt(localStorage.getItem("tab")!)
      : 0
  );

  return (
    <Container maxWidth={false} sx={{ width: "90%", height: "100%" }}>
      <Navbar
        setValue={setValue}
        value={value}
        settingsDialogOpen={settingsDialogOpen}
        setSettingsDialogOpen={setSettingsDialogOpen}
      />
      <Container maxWidth={false} sx={{ width: "100%", height: "100%" }}>
        <Stack direction="column" spacing={0}>
          {value === 0 ? (
            <Streams />
          ) : (
            <Outlet context={{ streams, setStreams }} />
          )}
        </Stack>
      </Container>
    </Container>
  );
};

export function useStreams() {
  return useOutletContext<ContextType>();
}
