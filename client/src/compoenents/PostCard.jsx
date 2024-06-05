import { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";


const PostCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createPost, setCreatePost] = useState([]);
  const [username, setUserName] = useState("");
  
  useEffect(() => {
    fetchData();
  }, []);


  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8080/post/all");
      const formattedPosts = response.data.map((post) => {
        const imagePath = post.imagePath
          .replace(/\\/g, "/")
          .replace("server/src/main/resources/static", "");
        console.log("Formatted imagePath:", imagePath);
        return {
          ...post,
          imagePath,
          id: post.postId,
          isOpen: false,
         
        };
      });
      setCreatePost(formattedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const toggleDropdown = (index) => {
    setCreatePost((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index ? { ...post, isOpen: !post.isOpen } : post
      )
    );
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/post/delete/${id}`);
      fetchData();
      toast.success("Post deleted successfully!", {
        position: "top-center",
        autoClose: 3000,
        closeButton: true,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post", {
        position: "top-center",
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  const getTimeAgo = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  
 return (
    <div>
      {createPost.map((post, index) => (
        <Card key={index}>
          <div className="flex gap-3">
            <div className="grow">
              <p>
                <Link to={"/profile"}>
                  <span className="mr-1 font-semibold cursor-pointer hover:underline">
                    {post.user ? post.user.name : "Unknown User"}
                  </span>
                </Link>
                shared a<a className="text-socialBlue"> post</a>
              </p>
              <p className="text-gray-500 text-sm">
                {getTimeAgo(post.createdAt)}
              </p>
            </div>
            <div className="relative">
              <button className="text-gray-400" onClick={() => toggleDropdown(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
              {post.isOpen && (
                <div className="absolute top-0 right-0 mt-10 bg-white p-2 shadow-lg">
                   
                   <Link to={`/update-post/${post.id}`}>
                        <button className="block w-full text-left py-2 px-4 text-md whitespace-nowrap">
                          Edit post
                        </button>
                      </Link>
                  
                  <button
                    className="block w-full text-left py-2 px-4 text-md whitespace-nowrap"
                    onClick={() => {
                      toast.warn(
                        <div>
                          Are you sure you want to delete this post?
                          <div className="flex justify-end mt-2">
                            <button
                              className="text-white  bg-green-500 py-1 px-4 mr-2 rounded hover:bg-green-600"
                              onClick={() => {
                                handleDelete(post.id);
                                toast.dismiss();
                              }}
                            >
                              Yes
                            </button>
                            <button
                              className="text-white bg-gray-400 py-1 px-4 rounded hover:bg-gray-500"
                              onClick={() => toast.dismiss()}
                            >
                              No
                            </button>
                          </div>
                        </div>,
                        {
                          position: "top-center",
                          autoClose: 5000,
                          closeButton: false,
                          hideProgressBar: true,
                          theme: "dark",
                        }
                      );
                    }}
                  >
                    Delete post
                  </button>
                  
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="my-3 text-sm">{post.caption}</p>
            <div className="rounded-md">
              <img
                className="h-1/4"
                src={`http://localhost:8080/${post.imagePath}`}
                alt="Post"
              />
            </div>
          </div>
          
          <div className="mt-5 flex gap-8">
            <button className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              32
            </button>
            <button className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              11
            </button>
            <button className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
              4
            </button>
          </div>
          <div className="flex mt-4 gap-3">
            <div className="border grow rounded-full">
              <textarea
                className=" block w-full p-3 overflow-hidden px-4 h-12 rounded-full"
                placeholder="Leave a comment"
              />
            </div>
          </div>
        </Card>
      ))}
      <ToastContainer />
    </div>
  );
};

export default PostCard;

