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

export const ALLPODCASTS_QUERY = gql`
  query getAllPodcastQuery($input: GetAllPodcastsInput!) {
    getAllPodcasts(input: $input) {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const Podcasts = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery<getAllPodcastQuery, getAllPodcastQueryVariables>(
    ALLPODCASTS_QUERY,
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
        <title>Home | podcasts</title>
      </Helmet>
      <div className="container divide-y divide-gray-100">
        <nav className="p-4">
          <ul className="flex space-x-2">
          <NavItem href="/" isActive>Podcasts</NavItem>
          <NavItem href="/recent">Recent</NavItem>
          <NavItem href="/subscriptions">Subscriptions</NavItem>
          </ul>
        </nav>
        <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl grid md:grid-cols-2  gap-7">
        {data?.getAllPodcasts.podcasts?.map((podcast) => (
          <PodcastCard 
            id={podcast.id} 
            linkTo={`/podcasts/${podcast.id}`}
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
