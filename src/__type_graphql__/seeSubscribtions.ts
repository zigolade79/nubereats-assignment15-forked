/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SeeSubscriptionInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: seeSubscribtions
// ====================================================

export interface seeSubscribtions_seeSubscribtions_subscriptions_host {
  __typename: "User";
  id: number;
  email: string;
}

export interface seeSubscribtions_seeSubscribtions_subscriptions {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
  description: string | null;
  rating: number;
  host: seeSubscribtions_seeSubscribtions_subscriptions_host;
  isOnSubscribe: boolean | null;
}

export interface seeSubscribtions_seeSubscribtions {
  __typename: "SeeSubscriptionOutput";
  ok: boolean;
  error: string | null;
  subscriptions: seeSubscribtions_seeSubscribtions_subscriptions[] | null;
}

export interface seeSubscribtions {
  seeSubscribtions: seeSubscribtions_seeSubscribtions;
}

export interface seeSubscribtionsVariables {
  input: SeeSubscriptionInput;
}
