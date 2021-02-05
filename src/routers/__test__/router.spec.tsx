import { render, waitFor } from "../../test-utils";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { getByPlaceholderText, getByRole, RenderResult, getByText, act } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { UserRole } from "../../__type_graphql__/globalTypes";
import { ME_QUERY } from "../../hooks/useMe";
import { LoggedInRouter } from "../logged-in-router";
import { LoggedOutRouter } from "../logged-out-router";

const userData = {
    data:{me: {
        id:1,
        email:"test@test.com",
        role:UserRole.Host    
    }
  }
}

describe('<LoggedInRouter />', () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
      const handler = () => Promise.resolve(userData);
      mockedClient.setRequestHandler(ME_QUERY, handler);
      await act( () => new Promise((resolve) => setTimeout(resolve, 0)))
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <LoggedInRouter />
        </ApolloProvider>
      );
    });
  });

  it('renders OK go to not found', async () => {
    const { debug, getByText } = renderResult;
    await waitFor(() => {
    getByText("Page Not Found");
    });
  });


  afterAll(() => {
    jest.clearAllMocks();
  });
});



describe('<LoggedOutRouter />', () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <LoggedOutRouter />
        </ApolloProvider>
      );
    });
  });
  it('renders OK go to Login page', async () => {
    const { debug, getByText } = renderResult;
    await waitFor(() => {
    getByText("Login");
    });
    debug();
  });
  

  afterAll(() => {
    jest.clearAllMocks();
  });
});
