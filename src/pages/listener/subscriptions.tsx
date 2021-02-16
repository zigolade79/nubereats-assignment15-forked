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
import { seeSubscribtions, seeSubscribtionsVariables } from "../../__type_graphql__/seeSubscribtions";

export const SEE_SUBSCRIPTION_PODCAST_QUERY = gql`
  query seeSubscribtions($input: SeeSubscriptionInput!) {
    seeSubscribtions(input: $input) {
      ok
      error
      subscriptions {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const Subscriptions = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery<seeSubscribtions, seeSubscribtionsVariables>(
    SEE_SUBSCRIPTION_PODCAST_QUERY,
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
        <title>Subscriptions | podcasts</title>
      </Helmet>
      <div className="container divide-y divide-gray-100">
        <nav className="p-4">
          <ul className="flex space-x-2">
          <NavItem href="/" >Podcasts</NavItem>
          <NavItem href="/Recent">Recent</NavItem>
          <NavItem href="/Subscriptions" isActive>Subscriptions</NavItem>
          </ul>
        </nav>
        <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl grid md:grid-cols-2  gap-7">
        {data?.seeSubscribtions.subscriptions?.map((podcast) => (
          <PodcastCard 
          linkTo={`/podcasts/${podcast.id}`}
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
