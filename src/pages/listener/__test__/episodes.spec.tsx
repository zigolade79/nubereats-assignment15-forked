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
import { Episodes, GET_EPISODES_QUERY } from "../episodes";
import { getEpisodes_getEpisodes_episodes } from "../../../__type_graphql__/getEpisodes";

const podcast: PodcastParts = {
  __typename: "Podcast",
  id: 1,
  thumbnailUrl:"test-url",
  category: "test-category",
  title: "test-title",
  description:"test",
  rating: 5
}

const episode: getEpisodes_getEpisodes_episodes = {
  __typename: "Podcast",  
  title: "test-title",
  description:"test",
}
const Result = {
  data: {
    getPodcast: {
      ok: true,
      error: null,
      podcast,
    },
    getEpisodes: {
      ok: true,
      error:null,
      episodes: [
        episode,
      ],
    },
  },
};
describe('<Episodes />', () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
      const handler = () => Promise.resolve(Result);
      mockedClient.setRequestHandler(GET_EPISODES_QUERY, handler);
      await act( () => new Promise((resolve) => setTimeout(resolve, 0)))
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Episodes />
        </ApolloProvider>
      );
    });
  });

  it('renders OK', async () => {
    await waitFor(() => {
    expect(document.title).toBe('Episode List | Nuber-podcasts');
    });
  });

  it("renders OK whit mutation", async () => {
    await waitFor(() => {
      expect(renderResult.container.getAttribute("href") ==="/");
    });
  });


  afterAll(() => {
    jest.clearAllMocks();
  });
});
