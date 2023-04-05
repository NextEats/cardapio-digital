import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { supabase } from "../server/api";
import CreateUser from "./criar-usuario";

// Mock the Supabase signUp function
jest.mock("../server/api", () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

describe("CreateUser", () => {
  it("renders input fields and submit button", () => {
    render(<CreateUser />);

    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByText("Send");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("submits the form with valid email and password", async () => {
    render(<CreateUser />);

    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByText("Send");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password123");
    fireEvent.click(submitButton);

    // Check if signUp function has been called with the right values
    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("does not submit the form with missing email or password", () => {
    render(<CreateUser />);

    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByText("Send");

    userEvent.type(emailInput, "test@example.com");
    fireEvent.click(submitButton);

    expect(supabase.auth.signUp).not.toHaveBeenCalled();

    userEvent.clear(emailInput);
    userEvent.type(passwordInput, "password123");
    fireEvent.click(submitButton);

    expect(supabase.auth.signUp).not.toHaveBeenCalled();
  });
});
