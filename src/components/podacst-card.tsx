import React from "react"
import { Link } from "react-router-dom"

interface IPodcastCardProps {
    id:number;
    thumbnail:string;
    title:string;
    category:string;
    host:string;
    rating:number;
    description:string;
    linkTo:string;
  }

  export const PodcastCard: React.FC<IPodcastCardProps> = ({
    id,
    thumbnail,
    title,
    category,
    host,
    rating,
    description,
    linkTo,
  }) => (
    
            <Link
                to={linkTo}
                key={id}
                className="relative group"
            >
                <article className="p-4 flex-col space-x-4 h-48">
                <div className="flex">
                    <img
                    src={thumbnail || ""}
                    alt=""
                    className="flex-none w-18 h-18 m-2 rounded-lg object-cover bg-gray-100"
                    width="70"
                    height="70"
                    />
                    <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                    <h2 className="text-lg font-semibold text-black mb-0.5">
                        {title}
                    </h2>
                    <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                        <div>
                        <dt className="sr-only">category</dt>
                        <dd> {category}</dd>
                        </div>
                        <div className="flex-none w-full mt-0.5 font-normal">
                        <dt className="inline">By</dt>{" "}
                        <dd className="inline text-black">
                            {host}
                        </dd>
                        </div>
                        <div className="absolute top-0 right-0 rounded-full bg-amber-50 text-amber-900 px-2 py-0.5 hidden sm:flex  xl:flex items-center space-x-1">
                        <dt className="text-amber-500">
                            <span className="sr-only">Rating</span>
                            <svg width="16" height="20" fill="currentColor">
                            <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                            </svg>
                        </dt>
                        <dd>{rating}</dd>
                        </div>
                    </dl>
                    </div>
                </div>
                <div className="text-purple-700 text-opacity-75 p-1 h-20 overflow-ellipsis overflow-hidden ...">
                    {description}
                </div>
                </article>
            </Link>
           
        
    );
