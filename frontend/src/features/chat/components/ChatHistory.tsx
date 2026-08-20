import { useState } from "react";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

import type { ChatSession } from "../types/chat.types";

interface Props {
  sessions: ChatSession[];
  activeId?: string;
  loading?: boolean;
  onNew: () => Promise<void>;
  onSelect: (session: ChatSession) => Promise<void>;
  onRename: (id: string, title: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function ChatHistory({
  sessions,
  activeId,
  loading = false,
  onNew,
  onSelect,
  onRename,
  onDelete,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [menuId, setMenuId] = useState<string | null>(null);

  return (
    <aside
      className="rounded-[28px] border p-4"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold" style={{ color: "var(--text)" }}>
            Your chats
          </h2>
          <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
            Saved automatically
          </p>
        </div>

        <button
          type="button"
          onClick={() => void onNew()}
          disabled={loading}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white disabled:opacity-50"
          style={{ background: "var(--accent-color)" }}
          aria-label="New chat"
        >
          <Plus size={17} />
        </button>
      </div>

      <div className="mt-4 max-h-[360px] space-y-2 overflow-y-auto pr-1">
        {sessions.length === 0 ? (
          <p
            className="rounded-2xl border border-dashed p-4 text-sm"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            No saved chats yet.
          </p>
        ) : (
          sessions.map((item) => {
            const active = item._id === activeId;
            const editing = editingId === item._id;

            return (
              <div key={item._id} className="relative">
                {editing ? (
                  <form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      if (draft.trim()) {
                        await onRename(item._id, draft.trim());
                      }
                      setEditingId(null);
                    }}
                    className="rounded-2xl border p-2"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--surfaceHover)",
                    }}
                  >
                    <input
                      autoFocus
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") setEditingId(null);
                      }}
                      className="w-full bg-transparent px-2 py-1 text-sm outline-none"
                      style={{ color: "var(--text)" }}
                    />
                  </form>
                ) : (
                  <div
                    className="flex items-center gap-1 rounded-2xl border transition"
                    style={{
                      borderColor: active
                        ? "color-mix(in srgb,var(--accent-color) 35%,var(--border))"
                        : "transparent",
                      background: active
                        ? "color-mix(in srgb,var(--accent-color) 8%,var(--surface))"
                        : "var(--surfaceHover)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => void onSelect(item)}
                      className="min-w-0 flex-1 rounded-2xl px-3 py-3 text-left"
                    >
                      <p
                        className="truncate text-sm font-medium"
                        style={{ color: "var(--text)" }}
                      >
                        {item.title || "New Chat"}
                      </p>
                      <p
                        className="mt-1 truncate text-xs"
                        style={{ color: "var(--muted)" }}
                      >
                        {item.updatedAt
                          ? format(
                              new Date(item.updatedAt),
                              "dd MMM, hh:mm a",
                            )
                          : "Saved chat"}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setMenuId((current) =>
                          current === item._id ? null : item._id,
                        )
                      }
                      className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg hover:bg-[var(--surface)]"
                      style={{ color: "var(--muted)" }}
                      aria-label="Chat options"
                      aria-expanded={menuId === item._id}
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </div>
                )}

                {menuId === item._id && !editing && (
                  <div
                    className="absolute right-2 top-12 z-50 w-36 overflow-hidden rounded-xl border p-1.5 shadow-xl"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setMenuId(null);
                        setEditingId(item._id);
                        setDraft(item.title);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm hover:bg-[var(--surfaceHover)]"
                      style={{ color: "var(--text)" }}
                    >
                      <Pencil size={14} /> Rename
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuId(null);
                        void onDelete(item._id);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
