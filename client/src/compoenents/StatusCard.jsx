import { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";

const StatusCard = () => {
  const [status, setStatus] = useState([]);
  const [userId, setUserId] = useState("");
  const [isOpenArray, setIsOpenArray] = useState([]); // State to track open/closed state of each dropdown
  const [usernames, setUsernames] = useState({});
  const [selectedStatus, setSelectedStatus] = useState(null); // State for selected status 
  
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserId(userData.userId);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Initialize isOpenArray with the same length as the status array, all set to false
    setIsOpenArray(new Array(status.length).fill(false));
  }, [status]);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8080/status/all");
      const formattedStatuses = response.data.map((status) => ({
        id: status.id,
        runningDistance: status.runningDistance,
        runningTime: status.runningTime,
        runningPace: status.runningPace,
        pushupsCount: status.pushupsCount,
        weightliftWeight: status.weightliftWeight,
        authorId: status.authorId,
        createdAt: status.createdAt, // Make sure to include createdAt if needed
      }));
      setStatus(formattedStatuses);
      // Call fetchUsernames after fetching status data
      fetchUsernames();
    } catch (error) {
      console.error("Error fetching status data:", error);
      throw error;
    }
  }

  const fetchUsernames = async () => {
    const ids = status.map((status) => status.authorId);
    const uniqueIds = [...new Set(ids)]; 
    const userNames = {};
    for (const id of uniqueIds) {
      try {
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        userNames[id] = response.data.username;
        console.log(response.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    }
    setUsernames(userNames);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/status/delete/${id}`);
      fetchData();
      toast.success("Status deleted successfully!", {
        position: "top-center",
        autoClose: 3000,
        closeButton: true,
      });
    } catch (error) {
      console.error("Error deleting status:", error);
      toast.error("Error deleting status", {
        position: "top-center",
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  const getTimeAgo = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  const toggleDropdown = (index) => {
    // Create a new array where the element at the given index is toggled
    setIsOpenArray((prev) => {
      const newArray = [...prev];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };
  

  const handleEdit  = (id) => {
    const statusToEdit = status.find((status) => status.id === id);
    setSelectedStatus(statusToEdit);
};

const handleUpdate = (id) => {
  const confirmUpdate = window.confirm("Are you sure you want to update this?");
  if (confirmUpdate) {
      axios
      .put(`http://localhost:8080/status/update/${id}`, selectedStatus)
      .then((res) => {
          if (res.status === 200) {
              const updatedStatus = status.map((status) => {
                  return status.id === id ? selectedStatus : status;
              });
              setStatus(updatedStatus);
              setSelectedStatus(null);
              toast.success("Status updated successfully !");
          }
      })
      .catch((err) => {
          console.log(err);
          alert("Something went wrong" + err);
      });
  }
};


  return (
    <div>
           {status.map((status, index) => {
        const username = usernames[status.authorId] || "Unknown";
          return (
            <Card key={index}>
              <div className="flex gap-3">
                <div className="grow">
                  <p>
                    <Link to={"/profile"}>
                      <span className="mr-2 text-xl font-semibold cursor-pointer hover:underline">
                        {username}
                      </span>
                    </Link>
                    shared a<a className="text-socialBlue"> post</a>
                  </p>
                  <p className="text-gray-500 text-sm">
                    {getTimeAgo(status.createdAt)}
                  </p>
                </div>
            <div className="relative">
              <button
                className="text-gray-400"
                onClick={() => toggleDropdown(index)} // Pass index to toggleDropdown function
              >
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
              {isOpenArray[index] && ( // Use isOpenArray[index] to conditionally render the dropdown
                <div className="absolute top-0 right-0 mt-10 bg-white p-2 shadow-lg">
                  <Link>
                    <button className="block w-full text-left py-2 px-4 text-md whitespace-nowrap"
                    onClick={() => handleUpdate(status.id)}
                    >
                      Edit Status
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
                                handleDelete(status.id); // Pass status.id to handleDelete function
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
                    Delete Status
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
          <p className="my-3 mt-4 text-sm font-bold">
  Running Distance:{" "}
  {selectedStatus && selectedStatus.id === status.id ? (
    <input
      className="px-4 py-2 border rounded-l-lg flex-1"
      value={selectedStatus.runningDistance}
      onChange={(e) =>
        setSelectedStatus({
          ...selectedStatus,
          runningDistance: e.target.value,
        })
      }
    />
  ) : (
    <span className="text-green-600">{status.runningDistance}</span>
  )}
</p>

<p className="my-3 mt-4 text-sm font-bold">
  Running Time:{" "}
  {selectedStatus && selectedStatus.id === status.id ? (
    <input
      className="px-4 py-2 border rounded-l-lg flex-1"
      value={selectedStatus.runningTime}
      onChange={(e) =>
        setSelectedStatus({
          ...selectedStatus,
          runningTime: e.target.value,
        })
      }
    />
  ) : (
    <span className="text-green-600">{status.runningTime}</span>
  )}
</p>
<p className="my-3 mt-4 text-sm font-bold">
  Running Pace:{" "}
  {selectedStatus && selectedStatus.id === status.id ? (
    <input
      className="px-4 py-2 border rounded-l-lg flex-1"
      value={selectedStatus.runningPace}
      onChange={(e) =>
        setSelectedStatus({
          ...selectedStatus,
          runningPace: e.target.value,
        })
      }
    />
  ) : (
    <span className="text-green-600">{status.runningPace}</span>
  )}
</p>
<p className="my-3 mt-4 text-sm font-bold">
  Pushups Count:{" "}
  {selectedStatus && selectedStatus.id === status.id ? (
    <input
      className="px-4 py-2 border rounded-l-lg flex-1"
      value={selectedStatus.pushupsCount}
      onChange={(e) =>
        setSelectedStatus({
          ...selectedStatus,
          pushupsCount: e.target.value,
        })
      }
    />
  ) : (
    <span className="text-green-600">{status.pushupsCount}</span>
  )}
</p>
<p className="my-3 mt-4 text-sm font-bold">
  Weightlift Weight:{" "}
  {selectedStatus && selectedStatus.id === status.id ? (
    <input
      className="px-4 py-2 border rounded-l-lg flex-1"
      value={selectedStatus.weightliftWeight}
      onChange={(e) =>
        setSelectedStatus({
          ...selectedStatus,
          weightliftWeight: e.target.value,
        })
      }
    />
  ) : (
    <span className="text-green-600">{status.weightliftWeight}</span>
  )}
</p>

{selectedStatus && selectedStatus.id === status.id ? (
                                        <>
                                            <button className="mt-1 p-2 w-full border bg-green-600 text-white  font-bold rounded-lg" onClick={() => handleUpdate(status.id)}>
                                                Update
                                            </button>
                                            <button className="mt-1 p-2 w-full border bg-red-800 text-white  font-bold rounded-lg" onClick={() => setSelectedStatus(null)}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button className="mt-1 p-2 w-full border bg-blue-600 text-white  font-bold rounded-lg" onClick={() => handleEdit(status.id)}>
                                            Edit
                                        </button>
                                    )}

          </div>
        </Card>
      );
    })}
    <ToastContainer />
  </div>
);
};

export default StatusCard;

