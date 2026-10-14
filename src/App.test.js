import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { AppProvider } from "./context/context";

test("renders the admin login page", () => {
  render(
    <MemoryRouter initialEntries={["/auth/login"]}>
      <AppProvider>
        <App />
      </AppProvider>
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /login/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});
