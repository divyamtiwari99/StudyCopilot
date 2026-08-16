import {
  Database,
  Download,
  FileText,
  HardDrive,
  Trash2,
  MessageSquare,
  Cloud,
} from "lucide-react";

import { useMemo } from "react";

import SectionHeader from "./SectionHeader";
import SettingCard from "./SettingCard";
import { useSettingsContext } from "./SettingsContext";

function formatStorage(value: number) {
  if (value === 0) {
    return "0 KB";
  }

  if (value < 1) {
    return `${(
      value * 1024
    ).toFixed(1)} MB`;
  }

  return `${value.toFixed(2)} GB`;
}

export default function StorageSection() {
  const {
    settings,
    usedPercentage,
  } = useSettingsContext();

  const storage =
    settings.storage;

  const availableStorage =
    useMemo(
      () =>
        Math.max(
          storage.total -
            storage.used,
          0,
        ),
      [storage],
    );

  const storageColor =
    useMemo(() => {
      if (usedPercentage >= 90) {
        return "from-red-500 via-orange-500 to-yellow-500";
      }

      if (usedPercentage >= 70) {
        return "from-amber-400 via-orange-500 to-red-500";
      }

      return "from-cyan-400 via-sky-500 to-violet-500";
    }, [usedPercentage]);

  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        backdrop-blur-3xl
      "
      style={{
        borderColor:
          "var(--border)",
        backgroundColor:
          "var(--surface)",
      }}
    >
      <SectionHeader
        eyebrow="STORAGE"
        title="Workspace Storage"
        description="Monitor documents, chats and cloud storage usage."
        icon={
          <HardDrive
            size={26}
            className="text-cyan-500"
          />
        }
      />

      <div
        className="
          grid
          gap-5
          p-6
          lg:grid-cols-[1.15fr_0.85fr]
        "
      >
        <div className="space-y-5">
          <SettingCard
            title="Storage Usage"
            description="Current usage across your StudyCopilot workspace."
            icon={
              <Database
                size={20}
                className="text-cyan-500"
              />
            }
            value={
              <div className="space-y-5">
                <div
                  className="
                    flex
                    items-end
                    justify-between
                  "
                >
                  <div>
                    <p
                      className="
                        text-3xl
                        font-black
                      "
                      style={{
                        color:
                          "var(--text)",
                      }}
                    >
                      {formatStorage(
                        storage.used,
                      )}
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                      "
                      style={{
                        color:
                          "var(--muted)",
                      }}
                    >
                      Used of{" "}
                      {storage.total} GB
                    </p>
                  </div>

                  <div
                    className="
                      rounded-xl
                      border
                      px-4
                      py-2
                    "
                    style={{
                      borderColor:
                        "color-mix(in srgb,var(--accent-color) 20%,var(--border))",
                      backgroundColor:
                        "color-mix(in srgb,var(--accent-color) 10%,transparent)",
                    }}
                  >
                    <p
                      className="
                        text-sm
                        font-semibold
                      "
                      style={{
                        color:
                          "var(--accent-color)",
                      }}
                    >
                      {usedPercentage.toFixed(
                        0,
                      )}
                      %
                    </p>
                  </div>
                </div>

                <div
                  className="
                    h-3
                    overflow-hidden
                    rounded-full
                  "
                  style={{
                    backgroundColor:
                      "var(--surfaceHover)",
                  }}
                >
                  <div
                    className={`
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      ${storageColor}
                      transition-all
                      duration-700
                    `}
                    style={{
                      width: `${usedPercentage}%`,
                    }}
                  />
                </div>

                <div
                  className="
                    grid
                    gap-3
                    md:grid-cols-3
                  "
                >
                  <div
                    className="
                      rounded-2xl
                      border
                      p-4
                    "
                    style={{
                      borderColor:
                        "var(--border)",
                      backgroundColor:
                        "var(--surfaceHover)",
                    }}
                  >
                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                      "
                      style={{
                        color:
                          "var(--muted)",
                      }}
                    >
                      Available
                    </p>

                    <p
                      className="
                        mt-2
                        text-xl
                        font-bold
                      "
                      style={{
                        color:
                          "var(--text)",
                      }}
                    >
                      {formatStorage(
                        availableStorage,
                      )}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      p-4
                    "
                    style={{
                      borderColor:
                        "var(--border)",
                      backgroundColor:
                        "var(--surfaceHover)",
                    }}
                  >
                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                      "
                      style={{
                        color:
                          "var(--muted)",
                      }}
                    >
                      Documents
                    </p>

                    <p
                      className="
                        mt-2
                        text-xl
                        font-bold
                      "
                      style={{
                        color:
                          "var(--text)",
                      }}
                    >
                      {storage.documents}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      p-4
                    "
                    style={{
                      borderColor:
                        "var(--border)",
                      backgroundColor:
                        "var(--surfaceHover)",
                    }}
                  >
                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                      "
                      style={{
                        color:
                          "var(--muted)",
                      }}
                    >
                      AI Chats
                    </p>

                    <p
                      className="
                        mt-2
                        text-xl
                        font-bold
                      "
                      style={{
                        color:
                          "var(--text)",
                      }}
                    >
                      {storage.chats}
                    </p>
                  </div>
                </div>
              </div>
            }
          />

          <SettingCard
            title="Workspace Statistics"
            description="Quick overview of your learning workspace."
            icon={
              <Cloud
                size={20}
                className="text-violet-500"
              />
            }
            value={
              <div
                className="
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >
                <div
                  className="
                    rounded-2xl
                    border
                    p-4
                  "
                  style={{
                    borderColor:
                      "var(--border)",
                    backgroundColor:
                      "var(--surfaceHover)",
                  }}
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <FileText
                      size={18}
                      className="text-cyan-500"
                    />

                    <div>
                      <p
                        className="
                          font-semibold
                        "
                        style={{
                          color:
                            "var(--text)",
                        }}
                      >
                        Uploaded Files
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                        "
                        style={{
                          color:
                            "var(--muted)",
                        }}
                      >
                        {
                          storage.documents
                        }{" "}
                        Documents
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    p-4
                  "
                  style={{
                    borderColor:
                      "var(--border)",
                    backgroundColor:
                      "var(--surfaceHover)",
                  }}
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <MessageSquare
                      size={18}
                      className="text-violet-500"
                    />

                    <div>
                      <p
                        className="
                          font-semibold
                        "
                        style={{
                          color:
                            "var(--text)",
                        }}
                      >
                        AI Conversations
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                        "
                        style={{
                          color:
                            "var(--muted)",
                        }}
                      >
                        {storage.chats} Chats
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    p-4
                  "
                  style={{
                    borderColor:
                      "var(--border)",
                    backgroundColor:
                      "var(--surfaceHover)",
                  }}
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <HardDrive
                      size={18}
                      className="text-emerald-500"
                    />

                    <div>
                      <p
                        className="
                          font-semibold
                        "
                        style={{
                          color:
                            "var(--text)",
                        }}
                      >
                        Total Capacity
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                        "
                        style={{
                          color:
                            "var(--muted)",
                        }}
                      >
                        {formatStorage(
                          storage.total,
                        )}{" "}
                        Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <div className="space-y-5">
          <SettingCard
            title="Quick Actions"
            description="Manage your workspace storage."
            icon={
              <Cloud
                size={20}
                className="text-cyan-500"
              />
            }
            value={
              <div className="space-y-3">
                <button
                  type="button"
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    border
                    px-4
                    py-3
                    transition
                    hover:bg-cyan-500/10
                  "
                  style={{
                    borderColor:
                      "color-mix(in srgb,#06b6d4 20%,var(--border))",
                    backgroundColor:
                      "color-mix(in srgb,#06b6d4 8%,transparent)",
                  }}
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <Download
                      size={18}
                      className="text-cyan-500"
                    />

                    <div className="text-left">
                      <p
                        className="
                          text-sm
                          font-semibold
                        "
                        style={{
                          color:
                            "var(--text)",
                        }}
                      >
                        Export Workspace
                      </p>

                      <p
                        className="
                          text-xs
                        "
                        style={{
                          color:
                            "var(--muted)",
                        }}
                      >
                        Download study data.
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    border
                    px-4
                    py-3
                    transition
                    hover:bg-red-500/10
                  "
                  style={{
                    borderColor:
                      "color-mix(in srgb,#ef4444 20%,var(--border))",
                    backgroundColor:
                      "color-mix(in srgb,#ef4444 8%,transparent)",
                  }}
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <Trash2
                      size={18}
                      className="text-red-500"
                    />

                    <div className="text-left">
                      <p
                        className="
                          text-sm
                          font-semibold
                        "
                        style={{
                          color:
                            "var(--text)",
                        }}
                      >
                        Clear Cache
                      </p>

                      <p
                        className="
                          text-xs
                        "
                        style={{
                          color:
                            "var(--muted)",
                        }}
                      >
                        Remove temporary files.
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            }
          />

          <SettingCard
            title="Storage Tips"
            description="Optimize your available workspace."
            icon={
              <HardDrive
                size={20}
                className="text-violet-500"
              />
            }
            value={
              <ul
                className="
                  space-y-3
                  text-sm
                  leading-6
                "
                style={{
                  color:
                    "var(--muted)",
                }}
              >
                <li>
                  • Delete unused documents regularly.
                </li>

                <li>
                  • Archive completed study sessions.
                </li>

                <li>
                  • Export important notes for backup.
                </li>

                <li>
                  • Remove old AI conversations.
                </li>
              </ul>
            }
          />
        </div>
      </div>
    </section>
  );
}