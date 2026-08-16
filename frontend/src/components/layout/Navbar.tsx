import {
  Bell,
  Command,
  Search,
  Sparkles,
  UserCircle2,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth.store";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

interface NavbarProps {
  onSearch?: () => void;
}

export default function Navbar({
  onSearch,
}: NavbarProps) {
  const user = useAuthStore(
    (state) => state.user,
  );

  const logout = useAuthStore(
    (state) => state.logout,
  );

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false);

  return (
    <header
      className="
        sticky
        top-4
        z-30
        ml-0
        mr-4
        lg:ml-[296px]
      "
    >
      <div
        className="
          relative
          flex
          min-h-[76px]
          items-center
          justify-between
          gap-4
          rounded-[26px]
          border
          px-4
          py-3
          backdrop-blur-2xl
          transition-all
          duration-300
          sm:px-5
          lg:px-6
        "
        style={{
          background:
            "color-mix(in srgb,var(--surface) 94%,transparent)",
          borderColor:
            "color-mix(in srgb,var(--border) 90%,transparent)",
          boxShadow:
            "0 16px 45px color-mix(in srgb,var(--text) 7%,transparent)",
        }}
      >
        {/* Subtle accent glow */}
        <div
          className="
            pointer-events-none
            absolute
            -left-12
            -top-16
            h-32
            w-32
            rounded-full
            blur-3xl
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 10%,transparent)",
          }}
        />

        {/* Greeting */}
        <div className="relative min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  "var(--accent-color)",
                boxShadow:
                  "0 0 10px color-mix(in srgb,var(--accent-color) 70%,transparent)",
              }}
            />

            <p
              className="
                truncate
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
              "
              style={{
                color: "var(--accent-color)",
              }}
            >
              Study Workspace
            </p>
          </div>

          <h2
            className="
              mt-1
              truncate
              text-lg
              font-bold
              tracking-tight
              sm:text-xl
            "
            style={{
              color: "var(--text)",
            }}
          >
            Good Morning 👋
          </h2>

          <p
            className="
              mt-0.5
              hidden
              text-xs
              sm:block
            "
            style={{
              color: "var(--muted)",
            }}
          >
            Continue your learning journey.
          </p>
        </div>

        {/* Actions */}
        <div
          className="
            relative
            flex
            shrink-0
            items-center
            gap-2
            sm:gap-3
          "
        >
          {/* Search */}
          <button
            type="button"
            onClick={onSearch}
            aria-label="Search workspace"
            className="
              group
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              border
              transition-all
              duration-200
              hover:-translate-y-0.5
              lg:w-72
              lg:justify-between
              lg:px-4
            "
            style={{
              backgroundColor:
                "var(--surfaceHover)",
              borderColor:
                "var(--border)",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.borderColor =
                "color-mix(in srgb,var(--accent-color) 35%,var(--border))";
              event.currentTarget.style.boxShadow =
                "0 8px 24px color-mix(in srgb,var(--accent-color) 8%,transparent)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.borderColor =
                "var(--border)";
              event.currentTarget.style.boxShadow =
                "none";
            }}
          >
            <span
              className="
                flex
                items-center
                gap-2
              "
            >
              <Search
                size={17}
                style={{
                  color: "var(--muted)",
                }}
              />

              <span
                className="
                  hidden
                  text-sm
                  lg:inline
                "
                style={{
                  color: "var(--muted)",
                }}
              >
                Search anything...
              </span>
            </span>

            <span
              className="
                hidden
                items-center
                gap-1
                rounded-lg
                border
                px-2
                py-1
                text-[10px]
                font-medium
                lg:flex
              "
              style={{
                backgroundColor:
                  "var(--surface)",
                borderColor:
                  "var(--border)",
                color: "var(--muted)",
              }}
            >
              <Command size={11} />
              K
            </span>
          </button>

          {/* AI shortcut */}
          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/chat")
            }
            aria-label="Open AI Tutor"
            className="
              group
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              transition-all
              duration-200
              hover:-translate-y-0.5
            "
            style={{
              background:
                "color-mix(in srgb,var(--accent-color) 9%,var(--surface))",
              borderColor:
                "color-mix(in srgb,var(--accent-color) 20%,var(--border))",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background =
                "color-mix(in srgb,var(--accent-color) 15%,var(--surface))";
              event.currentTarget.style.borderColor =
                "color-mix(in srgb,var(--accent-color) 38%,var(--border))";
              event.currentTarget.style.boxShadow =
                "0 8px 24px color-mix(in srgb,var(--accent-color) 12%,transparent)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background =
                "color-mix(in srgb,var(--accent-color) 9%,var(--surface))";
              event.currentTarget.style.borderColor =
                "color-mix(in srgb,var(--accent-color) 20%,var(--border))";
              event.currentTarget.style.boxShadow =
                "none";
            }}
          >
            <Sparkles
              size={18}
              className="transition-transform duration-200 group-hover:scale-110"
              style={{
                color:
                  "var(--accent-color)",
              }}
            />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={notificationOpen}
              onClick={() => {
                setOpen(false);
                setNotificationOpen(
                  !notificationOpen,
                );
              }}
              className="
                relative
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                transition-all
                duration-200
                hover:-translate-y-0.5
              "
              style={{
                backgroundColor:
                  "var(--surface)",
                borderColor:
                  "var(--border)",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor =
                  "color-mix(in srgb,var(--accent-color) 30%,var(--border))";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor =
                  "var(--border)";
              }}
            >
              <Bell
                size={18}
                style={{
                  color: "var(--text)",
                }}
              />

              <span
                className="
                  absolute
                  right-2.5
                  top-2.5
                  h-2
                  w-2
                  rounded-full
                  ring-2
                "
                style={{
                  backgroundColor:
                    "var(--accent-color)",
                  boxShadow:
                    "0 0 8px color-mix(in srgb,var(--accent-color) 75%,transparent)",
                  ringColor:
                    "var(--surface)",
                } as React.CSSProperties}
              />
            </button>

            <NotificationDropdown
              open={notificationOpen}
            />
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              aria-label="Open profile menu"
              aria-expanded={open}
              onClick={() => {
                setNotificationOpen(false);
                setOpen(!open);
              }}
              className="
                flex
                h-11
                items-center
                gap-2
                rounded-2xl
                border
                px-2
                transition-all
                duration-200
                hover:-translate-y-0.5
                sm:gap-3
                sm:px-3
              "
              style={{
                backgroundColor:
                  "var(--surface)",
                borderColor:
                  "var(--border)",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor =
                  "color-mix(in srgb,var(--accent-color) 30%,var(--border))";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor =
                  "var(--border)";
              }}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="
                    h-8
                    w-8
                    rounded-xl
                    object-cover
                    ring-2
                  "
                  style={{
                    ringColor:
                      "color-mix(in srgb,var(--accent-color) 20%,transparent)",
                  } as React.CSSProperties}
                />
              ) : (
                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                  "
                  style={{
                    background:
                      "color-mix(in srgb,var(--accent-color) 10%,transparent)",
                  }}
                >
                  <UserCircle2
                    size={25}
                    style={{
                      color:
                        "var(--accent-color)",
                    }}
                  />
                </span>
              )}

              <div
                className="
                  hidden
                  max-w-28
                  text-left
                  leading-tight
                  sm:block
                "
              >
                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                  "
                  style={{
                    color: "var(--text)",
                  }}
                >
                  {user?.name ?? "User"}
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[10px]
                  "
                  style={{
                    color: "var(--muted)",
                  }}
                >
                  {user?.plan ?? "Free"}
                </p>
              </div>

              <ChevronDown
                size={15}
                className={`
                  hidden
                  transition-transform
                  duration-200
                  sm:block
                  ${open ? "rotate-180" : ""}
                `}
                style={{
                  color: "var(--muted)",
                }}
              />
            </button>

            {open && (
              <div
                className="
                  absolute
                  right-0
                  top-14
                  z-50
                  w-56
                  rounded-2xl
                  border
                  p-2
                  backdrop-blur-2xl
                "
                style={{
                  background:
                    "color-mix(in srgb,var(--surface) 96%,transparent)",
                  borderColor:
                    "var(--border)",
                  boxShadow:
                    "0 20px 50px color-mix(in srgb,var(--text) 12%,transparent)",
                }}
              >
                <div
                  className="
                    mb-2
                    border-b
                    px-3
                    pb-3
                  "
                  style={{
                    borderColor:
                      "var(--border)",
                  }}
                >
                  <p
                    className="truncate text-sm font-semibold"
                    style={{
                      color: "var(--text)",
                    }}
                  >
                    {user?.name ?? "User"}
                  </p>

                  <p
                    className="mt-1 text-xs"
                    style={{
                      color: "var(--muted)",
                    }}
                  >
                    {user?.plan ?? "Free"} plan
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    navigate(
                      "/dashboard/settings",
                    );
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    transition-colors
                  "
                  style={{
                    color: "var(--text)",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor =
                      "var(--surfaceHover)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor =
                      "transparent";
                  }}
                >
                  <Settings size={16} />
                  Settings
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    setOpen(false);
                    await logout();
                    navigate("/login");
                  }}
                  className="
                    mt-1
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    transition-colors
                  "
                  style={{
                    color: "#DC2626",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor =
                      "rgba(220,38,38,.08)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor =
                      "transparent";
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}