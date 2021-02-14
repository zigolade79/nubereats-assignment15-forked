/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleSubscriptionInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: subscribeToPodcast
// ====================================================

export interface subscribeToPodcast_subscribeToPodcast {
  __typename: "ToggleSubscriptionOutput";
  ok: boolean;
  error: string | null;
  result: string | null;
}

export interface subscribeToPodcast {
  subscribeToPodcast: subscribeToPodcast_subscribeToPodcast;
}

export interface subscribeToPodcastVariables {
  input: ToggleSubscriptionInput;
}
