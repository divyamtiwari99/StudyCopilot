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
    return `${(value * 1024).toFixed(1)} MB`;
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
          storage.total - storage.used,
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

    }, [
      usedPercentage,
    ]);


  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-3xl">

      <SectionHeader
        eyebrow="STORAGE"
        title="Workspace Storage"
        description="Monitor documents, chats and cloud storage usage."
        icon={
          <HardDrive
            size={26}
            className="text-cyan-400"
          />
        }
      />

      <div className="grid gap-5 p-6 lg:grid-cols-[1.15fr_0.85fr]">

        <div className="space-y-5">

          <SettingCard
            title="Storage Usage"
            description="Current usage across your StudyCopilot workspace."
            icon={
              <Database
                size={20}
                className="text-cyan-400"
              />
            }
            value={
              <div className="space-y-5">

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-3xl font-black text-white">
                      {formatStorage(storage.used)}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Used of {storage.total} GB
                    </p>

                  </div>

                  <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

                    <p className="text-sm font-semibold text-cyan-300">
                      {usedPercentage.toFixed(0)}%
                    </p>

                  </div>

                </div>
                                <div className="h-3 overflow-hidden rounded-full bg-white/5">

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


                <div className="grid gap-3 md:grid-cols-3">


                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Available
                    </p>


                    <p className="mt-2 text-xl font-bold text-white">
                      {formatStorage(availableStorage)}
                    </p>

                  </div>



                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Documents
                    </p>


                    <p className="mt-2 text-xl font-bold text-white">
                      {storage.documents}
                    </p>

                  </div>



                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      AI Chats
                    </p>


                    <p className="mt-2 text-xl font-bold text-white">
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
                className="text-violet-400"
              />
            }
            value={

              <div className="grid gap-3 sm:grid-cols-2">


                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                  <div className="flex items-center gap-3">

                    <FileText
                      size={18}
                      className="text-cyan-400"
                    />

                    <div>

                      <p className="font-semibold text-white">
                        Uploaded Files
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {storage.documents} Documents
                      </p>

                    </div>

                  </div>

                </div>



                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                  <div className="flex items-center gap-3">

                    <MessageSquare
                      size={18}
                      className="text-violet-400"
                    />

                    <div>

                      <p className="font-semibold text-white">
                        AI Conversations
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {storage.chats} Chats
                      </p>

                    </div>

                  </div>

                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                  <div className="flex items-center gap-3">

                    <HardDrive
                      size={18}
                      className="text-emerald-400"
                    />

                    <div>

                      <p className="font-semibold text-white">
                        Total Capacity
                      </p>


                      <p className="mt-1 text-sm text-slate-400">
                        {formatStorage(storage.total)} Available
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
                className="text-cyan-400"
              />
            }
            value={

              <div className="space-y-3">


                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 transition hover:bg-cyan-500/20"
                >

                  <div className="flex items-center gap-3">

                    <Download
                      size={18}
                      className="text-cyan-300"
                    />

                    <div className="text-left">

                      <p className="text-sm font-semibold text-white">
                        Export Workspace
                      </p>

                      <p className="text-xs text-slate-400">
                        Download study data.
                      </p>

                    </div>

                  </div>

                </button>




                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 transition hover:bg-red-500/20"
                >

                  <div className="flex items-center gap-3">

                    <Trash2
                      size={18}
                      className="text-red-300"
                    />

                    <div className="text-left">

                      <p className="text-sm font-semibold text-white">
                        Clear Cache
                      </p>

                      <p className="text-xs text-slate-400">
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
                className="text-violet-400"
              />
            }
            value={

              <ul className="space-y-3 text-sm leading-6 text-slate-400">

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