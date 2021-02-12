import { gql, useApolloClient, useMutation } from "@apollo/client";
import { CreateFunction } from "@testing-library/react";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  createPodcast,
  createPodcastVariables,
} from "../../__type_graphql__/createPodcast";
import { MY_PODCASTS_QUERY } from "./my-podcasts";

const CREATE_PODCAST_MUTAION = gql`
  mutation createPodcast($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      ok
      error
      id
    }
  }
`;

interface IFormProps {
  title: string;
  category: string;
  description: string;
  file: FileList;
}

export const AddPodcast = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [imgUrl, setImgUrl] = useState("");
  const onCompleted = (data: createPodcast) => {
    const {
      createPodcast: { ok, id: podcastId },
    } = data;
    if (ok) {
      setUploading(false);
      const { file, title, category, description } = getValues();
      const queryResult = client.readQuery({ query: MY_PODCASTS_QUERY }); //read current state of apollo cache
      console.log(queryResult);
      client.writeQuery({
        query: MY_PODCASTS_QUERY,
        data: {
          myPodcasts: {
            ...queryResult.myPodcasts,
            podcasts: [
              {
                category,
                description,
                id: podcastId,
                rating: 0,
                thumbnail: imgUrl,
                title,
                __typename: "Podcast",
              },
              ...queryResult.myPodcasts.podcasts,
            ],
          },
        },
      });
      history.push("/");
    }
  };
  const [
    createPodcastMutation,
    { data: createPodcastMutationResult },
  ] = useMutation<createPodcast, createPodcastVariables>(
    CREATE_PODCAST_MUTAION,
    { onCompleted }
  );
  const {
    register,
    getValues,
    formState,
    errors,
    handleSubmit,
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, title, category, description } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: thumbnail } = await (
        await fetch(
          "https://ubereats-challenge-backend.herokuapp.com/upload/",
          {
            method: "POST",
            body: formBody,
          }
        )
      ).json();
      setImgUrl(thumbnail);
      createPodcastMutation({
        variables: {
          input: {
            title,
            category,
            description,
            thumbnail,
          },
        },
      });
      setUploading(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <Helmet>
        <title>Add Podcasts | Nuber-podcasts</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col px-14"
      >
        <div className="border-b-2 border-blue-400 py-2 bg-transparent flex">
          <input
            ref={register({
              required: "Title is required!",
            })}
            className="focus:outline-none pl-2 w-full"
            name="title"
            type="text"
            placeholder="title"
          ></input>
        </div>
        {errors.title?.message && (
          <FormError errorMessage={errors.title.message} />
        )}
        <div className="mt-8 border-b-2 border-blue-400 py-2 bg-transparent flex">
          <input
            ref={register({
              required: "Category is required!",
            })}
            className="focus:outline-none pl-2 w-full"
            name="category"
            type="text"
            placeholder="category"
          ></input>
        </div>
        {errors.category?.message && (
          <FormError errorMessage={errors.category.message} />
        )}

        <div className="mt-8 border-b-2 border-blue-400 py-2 bg-transparent flex">
          <input
            ref={register({
              required: "Description is required!",
            })}
            className="focus:outline-none pl-2 w-full"
            name="description"
            type="text"
            placeholder="description"
          ></input>
        </div>
        {errors.description?.message && (
          <FormError errorMessage={errors.description.message} />
        )}

        <div className="mt-8 border-b-2 border-blue-400 py-2 bg-transparent flex">
          <input
            ref={register({
              required: true,
            })}
            className="focus:outline-none pl-2 w-full"
            name="file"
            type="file"
            accept="image/*"
          ></input>
        </div>

        <Button
          className="mt-12"
          canClick={formState.isValid}
          loading={uploading}
          actionText="Create Podcast"
        />
        {createPodcastMutationResult?.createPodcast.error && (
          <FormError
            errorMessage={createPodcastMutationResult.createPodcast.error}
          />
        )}
      </form>
    </div>
  );
};
