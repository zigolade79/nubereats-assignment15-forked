import { gql, useApolloClient, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { PODCAST_FRAGMENT } from "../../fragments";
import { myPodcasts } from "../../__type_graphql__/myPodcasts";

export const MY_PODCASTS_QUERY = gql`
  query myPodcasts {
    myPodcasts {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const MyPodcasts = () => {
  const { data } = useQuery<myPodcasts>(MY_PODCASTS_QUERY);
  console.log(data);
  return (
    <div className="h-screen flex flex-col items-center  bg-gray-50">
      <Helmet>
        <title>My Podcasts | Nuber-podcasts</title>
      </Helmet>
      <div className="container mt-32 ">
        <h2 className="text-4xl font-medium mb-10">My Podcasts</h2>
        <Link className=" text-blue-500 hover:underline" to="/add-Podcast">
          Create one &rarr;
        </Link>
        {data?.myPodcasts.ok && data.myPodcasts.podcasts?.length === 0 && (
          <>
            <h4 className="text-xl mb-5">You have no Podcast.</h4>
          </>
        )}
      </div>
      <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl grid md:grid-cols-2 xl:grid-cols-4 gap-7">
        {data?.myPodcasts.podcasts?.map((podcast) => (
          <Link
            to={`/mypodcast/${podcast.id}`}
            key={podcast.id}
            className="relative group"
          >
            <div className="p-8 border-2 border-blue-400 rounded-md h-full">
              <div
                style={{ backgroundImage: `url(${podcast.thumbnail})` }}
                className="bg-cover w-32 h-32 m-auto rounded-md"
              ></div>
              <h3 className="mt-2 font-medium text-xl border-b text-center pb-2 font-bold text-blue-500">
                {podcast.title}
              </h3>
              <div className="text-gray-500 text-center pt-2">
                {podcast.category}
              </div>
            </div>
            <div className="p-8 rounded-md bg-opacity-90 bg-gray-400 absolute top-0 left-0 h-full w-full hidden group-hover:block flex flex-col items-center justify-center">
              <h3 className="font-medium text-xl text-center  font-bold text-blue-300">
                {podcast.title}
              </h3>
              <span className="overflow-hidden mt-3 overflow-ellipsis break-words truncate-4-lines h-28 border-t pt-3 text-gray-200">
                {podcast.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
