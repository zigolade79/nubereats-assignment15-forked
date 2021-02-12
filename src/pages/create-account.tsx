import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../__type_graphql__/CreateAccountMutation";
import { UserRole } from "../__type_graphql__/globalTypes";
import podcastLogo from "../images/logo.svg";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountFrom {
  email: string;
  password: string;
  confirm_password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    formState,
  } = useForm<ICreateAccountFrom>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Host,
    },
  });
  const history = useHistory();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;

    if (ok) {
      alert("Account Created! Log in now!");
      history.push("/");
    }
  };
  const { email, password, role } = getValues();
  const [
    createAccountMutation,
    { data: createAccountResult, loading },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      variables: {
        createAccountInput: { email, password, role },
      },
      onCompleted,
    }
  );
  const _submit = () => {
    if (!loading) createAccountMutation();
  };
  return (
    <div className="container">
      <Helmet>
        <title>Create Account | podcasts</title>
      </Helmet>
      <div className="g-gradient-to-b from-yellow-400 via-red-500 to-pink-500 h-screen flex flex-col justify-center items-center">
        <img src={podcastLogo} className="w-20 mb-10" />
        <h2 className="text-3xl mb-9">Welcome Podcasts</h2>
        <div className="w-full sm:w-5/12 py-16">
          <form
            onSubmit={handleSubmit(_submit)}
            className="w-full flex flex-col px-6"
          >
            <input
              ref={register({
                required: {
                  value: true,
                  message: "Email is required!",
                },
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Email address invalid",
                },
              })}
              className="input  mt-4 border-b-2 py-2 bg-transparent focus:outline-none w-full"
              name="email"
              type="email"
              placeholder="E-mail"
            ></input>
            {errors.email?.message && (
              <FormError errorMessage={errors.email.message} />
            )}

            <input
              ref={register({
                required: {
                  value: true,
                  message: "Password is required!",
                },
              })}
              className="input  mt-4 border-b-2  py-2 bg-transparent focus:outline-none w-full"
              name="password"
              type="password"
              placeholder="Password"
            ></input>
            <input
              ref={register({
                required: "Password is required!",
                validate: (value) => value === getValues().password,
              })}
              className="input mt-4 border-b-2  py-2 bg-transparent focus:outline-none w-full"
              name="confirm_password"
              type="password"
              placeholder="Confirm"
            ></input>
            {errors.password?.message && (
              <FormError errorMessage={errors.password.message} />
            )}
            {errors.confirm_password && (
              <FormError errorMessage="Password not matched" />
            )}

            <select
              ref={register}
              name="role"
              className="input  mt-4 border-b-2py-2 bg-transparent focus:outline-none"
            >
              {Object.keys(UserRole).map((role, idx) => (
                <option className="text-black" key={idx}>
                  {role}
                </option>
              ))}
            </select>
            <Button
              className="mt-12"
              canClick={formState.isValid}
              loading={loading}
              actionText="Create Account"
            />
            {createAccountResult?.createAccount.error && (
              <FormError
                errorMessage={createAccountResult.createAccount.error}
              />
            )}
            <span className="w-full text-center mt-3 text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/" className="text-blue-400 hover:underline">
                Log in!
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
