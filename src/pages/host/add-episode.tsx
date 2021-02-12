import { gql, useApolloClient, useMutation } from "@apollo/client";
import { CreateFunction } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  createEpisode,
  createEpisodeVariables,
} from "../../__type_graphql__/createEpisode";
import { GET_MY_EPISODES_QUERY } from "./my-podcast";

const CREATE_EPISODE_MUTAION = gql`
  mutation createEpisode($input: CreateEpisodeInput!) {
    createEpisode(input: $input) {
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
}

interface IParams {
  id: string;
}

export const AddEpisode = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const onCompleted = (data: createEpisode) => {
    const {
      createEpisode: { ok, id },
    } = data;
    if (ok) {
      setUploading(false);
      history.push("/");
    }
  };
  const [createEpisode, { data }] = useMutation<
    createEpisode,
    createEpisodeVariables
  >(CREATE_EPISODE_MUTAION, {
    onCompleted,
  });
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
      const { title, category, description } = getValues();

      createEpisode({
        variables: {
          input: {
            title,
            category,
            podcastId: +id,
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
        <title>Add Episode | Nuber-podcasts</title>
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

        <Button
          className="mt-12"
          canClick={formState.isValid}
          loading={uploading}
          actionText="Create Episode"
        />
        {data?.createEpisode.error && (
          <FormError errorMessage={data.createEpisode.error} />
        )}
      </form>
    </div>
  );
};
