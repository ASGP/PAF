import Layout from "../Layout";
import PostCard from "../PostCard";
import PostFormCard from "../PostFormCard";
import StatusUpdate from "../StatusUpdate";



const Home = () => {
  return (
    <Layout>
      <PostFormCard />
      <StatusUpdate/>
      <PostCard />

    </Layout>
  );
};

export default Home;
