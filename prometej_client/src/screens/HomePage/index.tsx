import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        {user.user?.firstName}{" "}
        {user.authenticated ? "Authenticated" : "Not authenticated"}
      </div>
    </div>
  );
};

export default HomePage;
