// ...existing code...
import { Routes, Route } from 'react-router-dom';
import { AppShell, Box, Group, Anchor } from '@mantine/core';
import Posts from './pages/Posts';

export default function App() {
  return (
    <AppShell>
      <AppShell.Header h={60} p="xs">
        <Box component="div" h={60} p="xs">
          <Group>
            <Anchor href="/">Home</Anchor>
            <Anchor href="/posts">Posts</Anchor>
          </Group>
        </Box>
      </AppShell.Header>
      <Routes>
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </AppShell>
  );
}