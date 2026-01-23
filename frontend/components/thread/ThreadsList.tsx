import { threads, setThread } from "@/context/ThreadStore";
import { useThreadSelection } from "@/context/ThreadContext";

// Sidebar component inside wrapper around agent chats
// Will hold list of all chat threads
// Button to add threads
export const ThreadsList: React.FC = () => {
  const { selectedThreadId, setSelectedThreadId } = useThreadSelection();
  const threadIds = Array.from(threads.keys());
  return (
    <div className="flex flex-col flex-1 bg-gray-100 p-4 space-y-2 overflow-y-auto text-gray-800">
      {threadIds.map((id) => (
        <button
          key={id}
          onClick={() => setSelectedThreadId(id)}
          className={`block w-full text-left py-1 px-3 rounded ${id === selectedThreadId ? "bg-blue-200" : "hover:bg-gray-200"}`}
        >
          {id}
        </button>
      ))}
      <button
        onClick={() => {
          const newId = crypto.randomUUID();
          setThread(newId, []);
          setSelectedThreadId(newId);
        }}
        className="w-full py-1 px-3 bg-green-200 rounded mt-4"
      >
        + New Thread
      </button>
    </div>
  );
};
