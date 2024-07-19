import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg p-6 bg-white hover:shadow-lg transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-lg font-medium">{title}</h6>
          <span className="text-sm text-slate-500">{moment(date).format("Do MMM YYYY")}</span>
        </div>
      </div>

      <p className="text-sm text-slate-600 mt-4">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="text-md text-slate-500">{tags.map((tag) => `#${tag} `)}</div>

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
      </div>
    </div>
  );
};

export default NoteCard;
