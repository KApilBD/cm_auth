import { useContext } from "react";
import { Layout } from "../../template";
import { Context as AuthContext } from "../../../context/authContext";

const Home = () => {
  const { state, logout } = useContext(AuthContext);

  return (
    <Layout>
      <div className="w-full text-center">
        <h1 className="text-4xl py-3 border-b-2 border-gray-400">Home</h1>
        <div className="card-style max-w-lg bg-gray-100 my-5 mx-auto">
          <div>
            <p>Logged in with :</p>
            <h2 className="text-xl">{state.email}</h2>
            <button className="search-control mt-11 mb-3" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// text-align: center;
//     width: 100%;
//     font-size: 54px;
export default Home;
