import { Link } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { LS_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import podcastLogo from "../images/logo.svg";
export const Header: React.FC = () => {
  const { data } = useMe();
  const onClick = () => {
    isLoggedInVar(false);
    localStorage.removeItem(LS_TOKEN);
  };
  return (
    <header className="py-4">
      <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl flex justify-between">
        <div className="flex justify-center items-center">
          <div>
            <img src={podcastLogo} className="w-10" />
          </div>
          <div>
            <h1 className=" text-purple-500  text-xl font-bold p-1">
              <Link to="/">Podcasts</Link>
            </h1>
          </div>
        </div>
        {/*}
                <div className="hidden lg:block w-1/2">
                    <input className="w-4/5 focus:outline-none border-2 border-blue-400 p-1 rounded-md" placeholder="Search Podcasts..."/>
                </div>
    {*/}
        <span>
          {data?.me.email && <button onClick={onClick}>Log out</button>}
        </span>
        <span>
          <Link className="hover:underline flex p-1" to="/user-profile">
            {data?.me.email}
          </Link>
        </span>
      </div>
    </header>
  );
};
