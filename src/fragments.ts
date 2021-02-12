import { gql } from "@apollo/client";

export const PODCAST_FRAGMENT = gql`
    fragment PodcastParts on Podcast {
        id
        title
        category
        thumbnail
        description
        rating  
        host{
            id
            email
        }
        isOnSubscribe
        numSubscriber     
    }
`;

export const EPISODE_FRAGMENT = gql`
    fragment EpisodeParts on Episode {
        id
        title
        description
        category
       
    }
`;