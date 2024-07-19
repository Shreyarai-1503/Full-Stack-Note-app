import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = (e) => {
    setSearchQuery("");
    handleClearSearch();
  }

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-2xl font-semibold text-black py-2">Notes</h2>

      <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} handleSearch={handleSearch} onClearSearch={onClearSearch}/>

      {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
    </div>
  );
};

export default Navbar;
