import { X } from "lucide-react";
import { useAuthStore } from "../app/store/useAuthStore";
import { useChatStore } from "../app/store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();


  // Check if selectedUser is null before accessing its properties
  if (!selectedUser) {
    return (
      <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>No user selected</span>
          </div>
          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.username} />
            </div>
          </div>

          {/* User info */}
          <div className="text-base font-medium">{selectedUser.username}</div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
