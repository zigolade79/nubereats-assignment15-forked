import { gql, useApolloClient, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { PodcastCard } from "../../components/podacst-card";
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
          <PodcastCard 
          id={podcast.id} 
          thumbnail={podcast.thumbnail||""}
          title={podcast.title}
          category={podcast.category}
          host={podcast.host.email}
          rating={podcast.rating}
          description={podcast.description||""}
        />
        ))}
      </div>
    </div>
  );
};
