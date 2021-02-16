import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { EPISODE_FRAGMENT, PODCAST_FRAGMENT } from "../../fragments";
import {
  getEpisodes,
  getEpisodesVariables,
  getEpisodes_getPodcast_podcast,
} from "../../__type_graphql__/getEpisodes";
import {
  subscribeToPodcast,
  subscribeToPodcastVariables,
} from "../../__type_graphql__/subscribeToPodcast";
import ReactPlayer from "react-player";

const TOGGLE_SUBSCRIBE_MUTATION = gql`
  mutation subscribeToPodcast($input: ToggleSubscriptionInput!) {
    subscribeToPodcast(input: $input) {
      ok
      error
      result
    }
  }
`;

export const GET_EPISODES_QUERY = gql`
  query getEpisodes(
    $podcastSearchInput: PodcastSearchInput!
    $getEpisodesInput: GetEpisodesInput!
  ) {
    getPodcast(input: $podcastSearchInput) {
      ok
      error
      podcast {
        ...PodcastParts
      }
    }
    getEpisodes(input: $getEpisodesInput) {
      ok
      error

      episodes {
        ...EpisodeParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
  ${EPISODE_FRAGMENT}
`;

interface IEpisodeParams {
  id: string;
}

export const Episodes = () => {
  const params = useParams<IEpisodeParams>();
  const onSyle =
    "border-2 border-purple-400 rounded-full px-4 w-28 font-semibold bg-purple-400 text-gray-50 transition-colors focus:outline-none";
  const offStyle =
    "border-2 border-purple-400 rounded-full px-4 w-28 text-purple-400 font-semibold focus:outline-none";
  const [subscribeState, setsubscribeState] = useState(false);

  const onSubscribeComplet = (data: subscribeToPodcast) => {
    console.log(data);
    if (data?.subscribeToPodcast.ok) {
      //구독 성공
      window.alert(data.subscribeToPodcast.result);
      setsubscribeState(!subscribeState);
    }
  };

  const [
    toggleSubscription,
    { data: toggleSubscriptionResult, loading: subscritionLoading },
  ] = useMutation<subscribeToPodcast, subscribeToPodcastVariables>(
    TOGGLE_SUBSCRIBE_MUTATION,
    {
      variables: {
        input: { podcastId: +params.id },
      },
      onCompleted: onSubscribeComplet,
      refetchQueries: [
        {
          query: GET_EPISODES_QUERY,
          variables: {
            podcastSearchInput: {
              id: +params.id,
            },
            getEpisodesInput: {
              podcastId: +params.id,
            },
          },
        },
      ],
    }
  );

  const onCompleted = () => {
    setsubscribeState(data?.getPodcast.podcast?.isOnSubscribe || false);
  };
  const { data, loading, error } = useQuery<getEpisodes, getEpisodesVariables>(
    GET_EPISODES_QUERY,
    {
      variables: {
        podcastSearchInput: {
          id: +params.id,
        },
        getEpisodesInput: {
          podcastId: +params.id,
        },
      },
      onCompleted,
    }
  );
  console.log(data);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  const onClickSubscribe = () => {
    if (!subscritionLoading) {
      toggleSubscription();
    }
    //console.log(subscribeState);
    //setsubscribeState(!subscribeState);
  };

  return (
    <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl">
      <Helmet>
        <title>Episode List | Nuber-podcasts</title>
      </Helmet>
      <div className="flex justify-center my-8">
        <div className="flex flex-col justify-center px-3 md:px-12 w-3/4">
          <h1 className="text-purple-400 font-semibold text-3xl">
            {data?.getPodcast.podcast?.title}
          </h1>
          <h2 className="py-3 text-md font-light">
            {data?.getPodcast.podcast?.description}
          </h2>
          <button
            className={subscribeState ? offStyle : onSyle}
            onClick={onClickSubscribe}
          >
            {subscribeState ? "Subscribed" : "Subscribe"}
          </button>
        </div>
        <div
          style={{
            backgroundImage: `url(${data?.getPodcast.podcast?.thumbnail})`,
          }}
          className="bg-cover w-32 h-32 md:w-48 md:h-48 rounded-md"
        ></div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {data?.getEpisodes.episodes?.map((episode) => (
          <div
          key={episode.title}
          className="w-full border-2 border-blue-400 rounded-lg px-4 md:px-16 py-3 "
        >
          <div className="flex justify-between items-center">
              <div className="mr-2 md:mr-8">
                <h2 className="font-semibold font-lg">{episode.title}</h2>
                <h3 className="font-md"> - {episode.description}</h3>
              </div>
              
              
              </div>
              <div >
                    <ReactPlayer
                   
                    url={episode.fileUrl||""}
                    playing={false}
                    controls={true}
                    width="80%"
                    height="2rem"
                />
              </div>
        </div>
        ))}
      </div>
    </div>
  );
};
