import React, { useState } from "react";
import { AppShell, Box } from "@mantine/core";
import { UniverseLanding } from "./pages/UniverseLanding/UniverseLanding";
import UniverseLanding3 from "./pages/UniverseLanding3/UniverseLanding3";
import { HeaderNav } from "./components/HeaderNav/HeaderNav";

type Page = "landing" | "landing3";

const App = () => {
  const [page, setPage] = useState<Page>("landing");

  return (
    <AppShell m="0" p="0">
      <AppShell.Header h={60} p="xs">
        <Box component="div" h={60} p="xs">
          <HeaderNav onNavigate={(p: Page) => setPage(p)} />
        </Box>
      </AppShell.Header>

      <AppShell.Main style={{ padding: 0 }}>
        {page === "landing" && <UniverseLanding />}
        {page === "landing3" && <UniverseLanding3 />}
      </AppShell.Main>
    </AppShell>
  );
};

export default App;