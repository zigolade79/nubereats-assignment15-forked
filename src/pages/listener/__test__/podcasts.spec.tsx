import { render, waitFor } from "../../../test-utils";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { ALLPODCASTS_QUERY, Podcasts } from "../podcasts";
import { getByPlaceholderText, getByRole, RenderResult, getByText, act } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import userEvent from "@testing-library/user-event";
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from "../../create-account";
import { UserRole } from "../../../__type_graphql__/globalTypes";
import { PodcastParts } from "../../../__type_graphql__/PodcastParts";

describe("<Podcasts />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(async() => {
      const podcast: PodcastParts = {
        __typename: "Podcast",
        id: 1,
        thumbnailUrl:"test-url",
        category: "test-category",
        title: "test-title",
        description:"test",
        rating: 5
      }
      mockedClient = createMockClient();
      mockedClient.setRequestHandler(
        ALLPODCASTS_QUERY,
        () => Promise.resolve(
          {
            data: {
              getAllPodcasts: {
                ok: true,          
                error: "mutation-error",
                podcasts:[podcast],         
              },
            },
          }
      ));
      await act( () => new Promise((resolve) => setTimeout(resolve, 0)))
      renderResult = render(
        <ApolloProvider client={mockedClient}>
           <Podcasts />
        </ApolloProvider>
      );     
    });   
  });
  

 
  it("renders OK whit mutation", async () => {
    await waitFor(() => {
      expect(renderResult.container.getAttribute("href") ==="/podcasts/1");
    });
  });
  
});