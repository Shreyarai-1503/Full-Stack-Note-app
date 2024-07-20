import moment from "moment";
import { MdCreate, MdDelete } from "react-icons/md";

const SelectedNote = ({ title, date, content, tags, onEdit, onDelete, onDeselect }) => {
  return (
    <div className="rounded-lg p-6 bg-cardbg">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-2xl text-white font-bold">{title}</h6>
          <span className="text-white">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
      </div>
      <p className="text-white mt-4">{content}</p>
      <div className="text-white mt-4">{tags.map((tag) => `#${tag} `)}</div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <MdCreate
            className="icon-btn hover:text-green-500 text-2xl"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500 text-2xl"
            onClick={onDelete}
          />
        </div>
        <button
          className="bg-white text-black rounded-lg p-2"
          onClick={onDeselect}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SelectedNote;
