import { getInitials } from "../utils/helper";

const ProfileInfo = ({onLogout, userInfo}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-black font-medium bg-slate-100">
        {getInitials(userInfo?.fullname)}
      </div>

      <div>
        <p className="text-white font-medium">{userInfo?.fullname}</p>
        <button className=" text-white underline" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileInfo;
