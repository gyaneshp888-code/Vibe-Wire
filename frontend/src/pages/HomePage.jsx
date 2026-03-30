import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    /* Background gradient wahi rakha hai jo aapki image mein hai */
    <div className="h-screen bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center font-sans overflow-hidden">
      
      {/* Main Container: 
          - Mobile par full width/height (w-full h-full)
          - Desktop par ek fixed phone size (max-w-[450px])
          - Dynamic Island aur hardware border hata diye hain for a cleaner look
      */}
      <div className={`
        w-full h-full 
        md:max-w-[450px] md:h-[90vh] 
        bg-white 
        shadow-2xl 
        md:rounded-[24px] 
        relative flex flex-col 
        overflow-hidden transition-all duration-300
      `}>
        
        {/* --- Header / Status Bar Space (Optional) --- */}
        {/* Mobile par ye space top padding ki tarah kaam karega */}
        <div className="h-2 w-full bg-white md:h-4"></div>

        {/* --- Main Content Area --- */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {!selectedUser ? (
            <Sidebar />
          ) : (
            <ChatContainer />
          )}
        </div>

        {/* --- Bottom Navigation / Indicator Space --- */}
        <div className="h-2 w-full bg-white md:h-4"></div>

      </div>
    </div>
  );
};

export default HomePage;