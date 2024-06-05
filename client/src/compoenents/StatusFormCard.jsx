import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../compoenents/Card";
import StatusCard from "./StatusCard";

const StatusFormCard = () => {
  const [statusid, setId] = useState("");
  const [runningDistance, setRunningDistance] = useState("");
  const [runningTime, setRunningTime] = useState("");
  const [runningPace, setRunningPace] = useState("");
  const [pushupsCount, setPushupsCount] = useState("");
  const [weightliftWeight, setWeightliftWeight] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://localhost:8080/status/all");
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/status/add", {
        runningDistance: runningDistance,

        runningTime: runningTime,

        runningPace: runningPace,

        pushupsCount: pushupsCount,

        weightliftWeight: weightliftWeight,
      });
      alert("Progress shared successfully");
      setId("");
      setRunningDistance("");
      setRunningTime("");
      setRunningPace("");
      setPushupsCount("");
      setWeightliftWeight("");
      Load();
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function editstatus(statuses) {
    setId(statuses._id);
    setRunningDistance(statuses.runningDistance);
    setRunningTime(statuses.runningTime);
    setRunningPace(statuses.runningPace);
    setPushupsCount(statuses.pushupsCount);
    setWeightliftWeight(statuses.weightliftWeight);
  }

  async function Deletestatus(statusid) {
    await axios.delete("http://localhost:8080/status/delete/" + statusid);
    alert("deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();

    try {
      await axios.put("http://localhost:8080/status/update/" + statusid, {
        runningDistance: runningDistance,
        runningTime: runningTime,
        runningPace: runningPace,
        pushupsCount: pushupsCount,
        weightliftWeight: weightliftWeight,
      });
      alert("Updated Successfully");
      setId("");
      setRunningDistance("");
      setRunningTime("");
      setRunningPace("");
      setPushupsCount("");
      setWeightliftWeight("");
      Load();
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <div>
    <Card>
      <div className="flex gap-2">
        

        <div className="container mt-4">
          <h1>Workout Status Update</h1>
          <p>
            <strong>Today's Achievement:</strong>
          </p>
          <hr />
          <form className="space-y-4" onSubmit={save}>
            <div className="form-group">
              <label 
               htmlFor="runningDistance"
               className="block text-md font-medium text-gray-700"
              >
                Running Distance</label>
              <input
                type="text"
                name="runningDistance"
                value={runningDistance}
                onChange={(e) => setRunningDistance(e.target.value)}
                className="mt-1 0 block w-full text-md border rounded-md "
                placeholder="Enter Running Distance"
              />
            </div>
            <div className="form-group">
              <label
              htmlFor="runningDistance"
              className="block text-md font-medium text-gray-700">
                Running Time</label>
              <input
                type="text"
                name="runningTime"
                value={runningTime}
                onChange={(e) => setRunningTime(e.target.value)}
                className="mt-1 0 block w-full text-md border rounded-md "
                placeholder="Enter Running Time"
              />
            </div>
            <div className="form-group">
              <label
              htmlFor="runningDistance"
              className="block text-md font-medium text-gray-700">
                Running Pace</label>
              <input
                type="text"
                name="runningPace"
                value={runningPace}
                onChange={(e) => setRunningPace(e.target.value)}
                className="mt-1 0 block w-full text-md border rounded-md "
                placeholder="Enter Running Pace"
              />
            </div>
            <div className="form-group">
              <label
              htmlFor="runningDistance"
              className="block text-md font-medium text-gray-700">
                Pushups Count</label>
              <input
                type="text"
                name="pushupsCount"
                value={pushupsCount}
                onChange={(e) => setPushupsCount(e.target.value)}
                className="mt-1 0 block w-full text-md border rounded-md "
                placeholder="Enter Pushups Count"
              />
            </div>
            <div className="form-group">
              <label
              htmlFor="runningDistance"
              className="block text-md font-medium text-gray-700">
                Weightlift Weight</label>
              <input
                type="text"
                name="weightliftWeight"
                value={weightliftWeight}
                onChange={(e) => setWeightliftWeight(e.target.value)}
                className="mt-1 0 block w-full text-md border rounded-md "
                placeholder="Enter Weightlift Weight"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="bg-green-400 text-white px-6 py-1 rounded-md">
                Share your progress
              </button>
             
            </div>
          </form>
          
          <br/>

          
        </div>
      </div>
    </Card>
    <StatusCard/>
    </div>
  );
};

export default StatusFormCard;
