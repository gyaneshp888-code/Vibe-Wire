import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 pt-24 max-w-6xl">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-base-content/70 mt-1">
            Customize your chat experience
          </p>
        </div>

        {/* THEME SECTION */}
        <div className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Choose Theme</h2>
            <p className="text-sm text-base-content/60">
              Pick a theme that suits your style
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`
                  group relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200
                  border
                  ${
                    theme === t
                      ? "border-primary bg-primary/10 scale-[1.03]"
                      : "border-base-300 hover:border-primary/50 hover:bg-base-200/60"
                  }
                `}
              >
                {/* Theme Preview */}
                <div
                  className="relative h-10 w-full rounded-lg overflow-hidden shadow-inner"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-[2px] p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>

                {/* Name */}
                <span className="text-xs font-medium text-center truncate w-full">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>

                {/* Active Indicator */}
                {theme === t && (
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* PREVIEW SECTION */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Live Preview</h2>

          <div className="rounded-2xl border border-base-300 bg-base-100 shadow-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-base-200/40 to-base-300/30">
              
              <div className="max-w-lg mx-auto">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-base-300 bg-base-100">
                  
                  {/* CHAT HEADER */}
                  <div className="px-4 py-3 border-b border-base-300 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-semibold">
                      G
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">
                        Gyanesh Pandey
                      </h3>
                      <p className="text-xs text-green-500">● Online</p>
                    </div>
                  </div>

                  {/* MESSAGES */}
                  <div className="p-4 space-y-4 min-h-[220px] max-h-[220px] overflow-y-auto">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isSent ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`
                            max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow
                            ${
                              message.isSent
                                ? "bg-primary text-primary-content"
                                : "bg-base-200"
                            }
                          `}
                        >
                          {message.content}
                          <div
                            className={`
                              text-[10px] mt-1 text-right opacity-70
                            `}
                          >
                            12:00 PM
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* INPUT */}
                  <div className="p-4 border-t border-base-300">
                    <div className="flex items-center gap-2 bg-base-200 rounded-xl px-3 py-2">
                      <input
                        type="text"
                        className="flex-1 bg-transparent outline-none text-sm"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="bg-primary hover:scale-105 transition-transform text-primary-content p-2 rounded-lg">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;