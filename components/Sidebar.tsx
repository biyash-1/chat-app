import React, { useEffect } from "react";
import { useChatStore } from "../app/store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const {
    users,
    getUsers,
    selectedUser,
    setSelectedUser,
    isUserLoading,
  } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log("All Users:", users);

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full bg-slate-850 w-20 lg:w-72 border-r border-base-500 flex flex-col transition-all duration-200">
      <div className="border-b border-base-100 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {users &&
          Array.isArray(users) &&
          users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-slate-900 ring-base-300"
                  : "hover:bg-slate-900"
              }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePicture || "/avatar.png"}
                  alt={user.fullName}
                  className="size-12 object-cover rounded-full"
                />
              </div>
              <div className="hidden lg:flex flex-col text-left min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="font-medium truncate">{user.username}</h1>
                  {user.isOnline && (
                    <span className="size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                  )}
                </div>
                <div className="text-sm text-zinc-400">
                  {user.isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}
        {(!users || users.length === 0) && (
          <div className="text-center text-zinc-500 py-4">
            No users available
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
