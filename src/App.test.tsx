import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter } from "react-router-dom";
import { mockStore } from "./test-utils/mockStore";
import App from "./App";
import { vi } from "vitest";
import * as postsApi from "./services/postsApi";

if (typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // deprecated
      removeListener: () => {}, // deprecated
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (cb: FrameRequestCallback) =>
    setTimeout(cb, 0) as unknown as number;
}

vi.spyOn(postsApi, "useGetPostsQuery").mockReturnValue({
  data: [{ id: 1, title: "Test Post" }],
  isLoading: false,
  isFetching: false,
  error: undefined,
  refetch: vi.fn(), // just a dummy function
} as unknown as ReturnType<typeof postsApi.useGetPostsQuery>);

test("renders posts title", async () => {
  render(
    <Provider store={mockStore}>
      <MantineProvider>
        <MemoryRouter initialEntries={["/posts"]}>
          <App />
        </MemoryRouter>
      </MantineProvider>
    </Provider>,
  );

  expect(await screen.findByText(/Test Post/i)).toBeInTheDocument();
});
