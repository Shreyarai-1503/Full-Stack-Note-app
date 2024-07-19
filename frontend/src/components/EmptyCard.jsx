const EmptyCard = ({isSearch}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      {isSearch ? 
      (<><img src="src/assets/no-note.png" alt="no notes" className="w-80" /><p className="w-1/2 text-md font-semibold text-white text-center leading-7 mt-5">
        Oop!! no note found
      </p></>)
      : (<><img src="src/assets/add-note.png" alt="no notes" className="w-80" /><p className="w-1/2 text-md font-semibold text-white text-center leading-7 mt-5">
          Create your frist note by clicking the 'Add' button to jot down your
          thoughts, ideas and remainders. Let's Start!!
        </p></>)}

      
    </div>
  );
};

export default EmptyCard;
