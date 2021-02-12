import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { EPISODE_FRAGMENT, PODCAST_FRAGMENT } from "../../fragments";
import {
  deleteEpisode,
  deleteEpisodeVariables,
} from "../../__type_graphql__/deleteEpisode";
import {
  getMyEpisodes,
  getMyEpisodesVariables,
} from "../../__type_graphql__/getMyEpisodes";

const DELETE_EPISODE_MUTATION = gql`
  mutation deleteEpisode($input: EpisodesSearchInput!) {
    deleteEpisode(input: $input) {
      ok
      error
    }
  }
`;

export const GET_MY_EPISODES_QUERY = gql`
  query getMyEpisodes(
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

interface IParams {
  id: string;
}

export const MyPodcast = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const onCompleted = (data: deleteEpisode) => {
    const {
      deleteEpisode: { ok },
    } = data;
    if (ok) {
      history.push(`mypodcast/${id}`);
    }
  };

  const [deleteEpisode, { data: deleteEpisodeResult }] = useMutation<
    deleteEpisode,
    deleteEpisodeVariables
  >(DELETE_EPISODE_MUTATION, { onCompleted });
  const onClickDeleteEpisode = (episodeId: number) => {
    if (window.confirm("really delet episode?")) {
      deleteEpisode({
        variables: {
          input: {
            podcastId: +id,
            episodeId,
          },
        },
      });
    }
  };
  const { data } = useQuery<getMyEpisodes, getMyEpisodesVariables>(
    GET_MY_EPISODES_QUERY,
    {
      variables: {
        podcastSearchInput: {
          id: +id,
        },
        getEpisodesInput: {
          podcastId: +id,
        },
      },
    }
  );
  console.log(data);

  return (
    <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl">
      <Helmet>
        <title>Episode List | Nuber-podcasts</title>
      </Helmet>
      <div className="border-green-600 flex justify-center my-8">
        <div className="flex flex-col justify-center px-3 md:px-12 w-3/4">
          <h1 className="text-blue-400 font-semibold text-3xl">
            {data?.getPodcast.podcast?.title}
          </h1>
          <h2 className="py-3 text-md font-light">
            {data?.getPodcast.podcast?.description}
          </h2>
          <Link to={`/add-episode/${id}`} key={id} className="relative group">
            <Button
              className="mt-12"
              canClick={true}
              loading={false}
              actionText="Create Episode"
            />
          </Link>
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
            key={episode.id}
            className="w-full border-2 border-blue-400 rounded-lg px-4 md:px-16 py-3 flex justify-between items-center"
          >
            <div className="mr-2 md:mr-8">
              <h2 className="font-semibold font-lg">{episode.title}</h2>
              <h3 className="font-md"> - {episode.description}</h3>
            </div>
            <div>
              <svg
                className="w-12 hover:text-blue-400 transition-colors cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <button
                className=" border-none outline-none"
                onClick={() => onClickDeleteEpisode(episode.id)}
              >
                <svg
                  className=" border-none outline-none"
                  height="40px"
                  viewBox="0 0 512 512"
                  width="40px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m256 512c-141.160156 0-256-114.839844-256-256s114.839844-256 256-256 256 114.839844 256 256-114.839844 256-256 256zm0-475.429688c-120.992188 0-219.429688 98.4375-219.429688 219.429688s98.4375 219.429688 219.429688 219.429688 219.429688-98.4375 219.429688-219.429688-98.4375-219.429688-219.429688-219.429688zm0 0" />
                  <path d="m347.429688 365.714844c-4.679688 0-9.359376-1.785156-12.929688-5.359375l-182.855469-182.855469c-7.144531-7.144531-7.144531-18.714844 0-25.855469 7.140625-7.140625 18.714844-7.144531 25.855469 0l182.855469 182.855469c7.144531 7.144531 7.144531 18.714844 0 25.855469-3.570313 3.574219-8.246094 5.359375-12.925781 5.359375zm0 0" />
                  <path d="m164.570312 365.714844c-4.679687 0-9.355468-1.785156-12.925781-5.359375-7.144531-7.140625-7.144531-18.714844 0-25.855469l182.855469-182.855469c7.144531-7.144531 18.714844-7.144531 25.855469 0 7.140625 7.140625 7.144531 18.714844 0 25.855469l-182.855469 182.855469c-3.570312 3.574219-8.25 5.359375-12.929688 5.359375zm0 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
