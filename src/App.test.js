import { render, screen, act } from '@testing-library/react';
import App from './App';

globalThis.fetch = jest.fn(() =>
Promise.resolve({
  json: () =>
   Promise.resolve({
     api_url: "https://api.unsplash.com/photos?",
     value: "Fetch test"
   })
})
);

beforeEach(() => {
  fetch.mockClear();
});

describe("App", () => {
  it("loads the test on mount", async () => {
    await act(async() => render(<App/>))
    expect(screen.getByText("Fetch test")).toBeInTheDocument()
    })
})
