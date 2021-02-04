import { render, waitFor } from "../../test-utils";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { getByPlaceholderText, getByRole, RenderResult } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { Login, LOGIN_MUTATION } from "../login";
import userEvent from "@testing-library/user-event";

describe("<Login />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Login />
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Log In | Nuber-podcasts")
    });
  });
  it("display email validation error", async () => {
    const {getByPlaceholderText,  getByRole } =renderResult;
    const email = getByPlaceholderText("E-mail");
    await waitFor(() => {
      userEvent.type(email,"test");
    });
    await waitFor(() => {
      userEvent.clear(email);
    });
    let errorMessage = getByRole("alert");
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is required/i);
  });

  it("display password validation error", async () => {
    const {getByPlaceholderText,  getByRole } =renderResult;
    const password = getByPlaceholderText(/password/i);
    await waitFor(() => {
      userEvent.type(password,"test");
    });
    let errorMessage = getByRole("alert");
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Password must be more than 10 characters/i);
  });

  it("display password required errors", async () => {
    const { getByPlaceholderText,  getByRole } = renderResult;
    const email = getByPlaceholderText("E-mail");
    const submitBtn = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "this@wont.com");
      userEvent.click(submitBtn);
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/password is required/i);
  });

  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/e-mail/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const formData = {
      email: "real@test.com",
      password: "12345678910",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "XXX",
          error: "mutation-error",
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, "setItem");
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/mutation-error/i);
    expect(localStorage.setItem).toHaveBeenCalledWith("nuber-potcasts-token", "XXX");
  });

});
