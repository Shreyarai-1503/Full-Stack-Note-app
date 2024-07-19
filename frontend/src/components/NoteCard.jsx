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
    <div className="border rounded-lg p-6 bg-cardbg hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-2xl text-white font-bold">{title}</h6>
          <span className=" text-white">{moment(date).format("Do MMM YYYY")}</span>
        </div>
      </div>

      <p className=" text-white mt-4">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-4">
        <div className=" text-white">{tags.map((tag) => `#${tag} `)}</div>

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
