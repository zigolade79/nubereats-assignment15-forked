import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { LS_TOKEN } from "../constants";
import podcastLogo from "../images/logo.svg";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__type_graphql__/LoginMutation";

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;

    if (ok && token) {
      localStorage.setItem(LS_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  const variables = {
    loginInput: getValues(),
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    variables,
    onCompleted,
  });

  const _submit = () => {
    if (!loading) loginMutation();
  };

  return (
    <div className="container">
      <Helmet>
        <title>Log In | podcasts</title>
      </Helmet>

      <div className="g-gradient-to-b from-yellow-400 via-red-500 to-pink-500 h-screen flex flex-col justify-center items-center">
        <img src={podcastLogo} className="w-20 mb-10" />
        <h2 className="text-3xl mb-9">Welcome Podcasts</h2>
        <div className="w-full sm:w-5/12 py-16">
          <form
            onSubmit={handleSubmit(_submit)}
            className="w-full flex flex-col px-14"
          >
            <div className=" py-2 bg-transparent flex">
              <input
                ref={register({
                  required: "Email is required!",
                })}
                className="input focus:outline-none pl-2 w-full"
                name="email"
                type="email"
                placeholder="E-mail"
              ></input>
            </div>
            {errors.email?.message && (
              <FormError errorMessage={errors.email.message} />
            )}
            <div className=" py-2 bg-transparent flex">
              <input
                ref={register({
                  required: "Password is required!",
                  //minLength: 10
                })}
                className="input focus:outline-none pl-2 w-full"
                name="password"
                type="password"
                placeholder="Password"
              ></input>
            </div>
            {errors.password?.message && (
              <FormError errorMessage={errors.password.message} />
            )}
            {/*errors.password?.type === "minLength" && (
              <FormError errorMessage="Password must be more than 10 characters" />
            )*/}

            <Button
              className="mt-12"
              canClick={formState.isValid}
              loading={loading}
              actionText="Login"
            />
            {loginMutationResult?.login.error && (
              <FormError errorMessage={loginMutationResult.login.error} />
            )}
            <span className="w-full text-center mt-3 text-sm text-gray-500">
              Don't have an account?
              <br />
              Create{" "}
              <Link
                to="/create-account"
                className="text-blue-400 hover:underline"
              >
                here!
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
