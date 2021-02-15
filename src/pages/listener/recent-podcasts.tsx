import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { PodcastCard } from "../../components/podacst-card";
import { PODCAST_FRAGMENT } from "../../fragments";
import {
  getAllPodcastQuery,
  getAllPodcastQueryVariables,
} from "../../__type_graphql__/getAllPodcastQuery";
import { getRecentlyPodcast, getRecentlyPodcastVariables } from "../../__type_graphql__/getRecentlyPodcast";

export const RECENTPODCAST_QUERY = gql`
  query getRecentlyPodcast($input: GetRecentlyPodcastInput!) {
    getRecentlyPodcast(input: $input) {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const RecentPodcasts = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery<getRecentlyPodcast, getRecentlyPodcastVariables>(
    RECENTPODCAST_QUERY,
    {
      variables: {
        input: {
          page,
          pageSize: 10,
        },
      },
    }
  );
  interface INaviItemProps {
    href:string;
    isActive?:boolean;
    children:string;
  }
  function NavItem({href, isActive, children }:INaviItemProps) {
    return (
      <li>
        <a
          href={href}
          className={`block px-4 py-2 rounded-md ${isActive ? 'bg-amber-100 text-amber-700' : ''}`}
        >
          {children}
        </a>
      </li>
    )
  }
  return (
    <div>
      <Helmet>
        <title>Recent Podcasts | podcasts</title>
      </Helmet>
      <div className="container divide-y divide-gray-100">
        <nav className="p-4">
          <ul className="flex space-x-2">
          <NavItem href="/">Podcasts</NavItem>
          <NavItem href="/Recent" isActive>Recent</NavItem>
          <NavItem href="/Subscriptions">Subscriptions</NavItem>
          </ul>
        </nav>
        <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl grid md:grid-cols-2  gap-7">
        {data?.getRecentlyPodcast.podcasts?.map((podcast) => (
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
    </div>
  );
};
