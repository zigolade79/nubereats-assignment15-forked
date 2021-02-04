import { render, waitFor } from "../../test-utils";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { getByPlaceholderText, getByRole, RenderResult } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import userEvent from "@testing-library/user-event";
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from "../create-account";
import { UserRole } from "../../__type_graphql__/globalTypes";

describe("<CreateAccount />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Create Account | Nuber-podcasts")
    });
  });
  it("display email validation error", async () => {
    const {getByPlaceholderText,  getByRole } =renderResult;
    const email = getByPlaceholderText("E-mail");
    const password = getByPlaceholderText(/password/i);
    
    await waitFor(() => {
      userEvent.type(email,"test@test");
      userEvent.click(password);
    });
    let errorMessage = getByRole("alert");
    
    expect(errorMessage).toHaveTextContent(/Email address invalid/i);
   
  });
  it("display email required error", async () => {
    const {getByPlaceholderText,  getByRole } =renderResult;
    const email = getByPlaceholderText("E-mail");
    const password = getByPlaceholderText(/password/i);
    
    await waitFor(() => {
      userEvent.type(email,"test@test");
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
    const password = getByPlaceholderText(/password/i);
    const confirm = getByPlaceholderText(/confirm/i);
    const submitBtn = getByRole("button");
    await waitFor(() => {
      userEvent.type(password, "abcdefghij");
      userEvent.type(confirm, "abcdefghijk");
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Password not matched/i);
  });

  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/e-mail/i);
    const password = getByPlaceholderText(/password/i);
    const confirm = getByPlaceholderText(/confirm/i);
    const submitBtn = getByRole("button");
    const formData = {
      email: "real@test.com",
      password: "12345678910",
      role: UserRole.Host,
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,          
          error: "mutation-error",
        },
      },
    });
    mockedClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, mockedMutationResponse);
    jest.spyOn(window, "alert").mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.type(confirm, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      createAccountInput: {
        email: formData.email,
        password: formData.password,
        role:formData.role,
      },
    });
    expect(window.alert).toHaveBeenCalledWith("Account Created! Log in now!");
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/mutation-error/i);
  });

});