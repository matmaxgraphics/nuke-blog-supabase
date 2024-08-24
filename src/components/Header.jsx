import Navbar from "./navbar";
import TopStory from "./topStory";
const Header = () => {
  return (
    <header>
      <Navbar />
      <TopStory/>
      {/* <div>{import.meta.env.VITE_APP_API_URL}</div> */}
    </header>
  );
};

export default Header;
