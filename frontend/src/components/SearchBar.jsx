import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center bg-slate-100 rounded-2xl px-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search Notes"
        className="w-full text-sm bg-transparent py-[11px] outline-none"
      />
      {value && (
        <IoMdClose
          onClick={onClearSearch}
          className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
        />
      )}

      <FaMagnifyingGlass
        onClick={handleSearch}
        className="text-slate-500 cursor-pointer hover:text-black"
      />
    </div>
  );
};

export default SearchBar;
