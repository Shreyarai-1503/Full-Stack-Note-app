import { useEffect, useState } from "react";
import AddEditNotes from "../components/AddEditNotes";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Toast from "../components/Toast";
import EmptyCard from "../components/EmptyCard";

const Home = () => {
  const navigate = useNavigate();

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    noteData: null,
  });
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [showToast, setShowToast] = useState({
    isShown: false,
    type: "add",
    message: "",
  });
  const [isSearch, setIsSearch] = useState(false);

  const handleEdit = (noteData) => {
    setOpenAddEditModal({ isShown: true, noteData: noteData, type: "edit" });
  };

  const deleteNote = async (noteData) => {
    try {
      const response = await axiosInstance.delete(`/notes/${noteData._id}`);
      if (response.data && !response.data.error) {
        getAllNotes();
        showToastMessage("Note Deleted Successfully", "delete")
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error, "Error: Try again");
      }
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes");
      if (response.data) {
        setAllNotes(response.data);
      }
    } catch (error) {
      console.log(error, "Error: Try again");
    }
  };

  const handleCloseToast = () => {
    setShowToast({
      isShown: false,
      message: "",
    })
  }

  const showToastMessage = (message, type) => {
    setShowToast({
      isShown: true,
      message: message,
      type: type
    })
  }

  const onSearchNote = async(query) => {
    try {
      const response = await axiosInstance.get(`/notes/search?query=${query}`);
      console.log(response);
      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>

      <div className="container mx-auto">
        {allNotes.length > 0 ? <div className="grid grid-cols-3 gap-4 mt-8 mx-3">
          {allNotes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              content={note.content}
              date={note.createdOn}
              tags={note.tags}
              onEdit={() => handleEdit(note)}
              onDelete={() => deleteNote(note)}
            />
          ))}
        </div> : <EmptyCard isSearch={isSearch}/>}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-700 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.noteData}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              noteData: null,
            });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
