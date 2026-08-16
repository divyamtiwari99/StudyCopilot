import {
  Bell,
  CheckCircle2,
} from "lucide-react";

interface NotificationDropdownProps {
  open: boolean;
}

interface NotificationItem {
  id: number;
  title: string;
  description: string;
}

const notifications: NotificationItem[] = [
  {
    id: 1,
    title: "Welcome to StudyCopilot 🎓",
    description: "Your AI workspace is ready.",
  },
  {
    id: 2,
    title: "Upload your first document",
    description:
      "AI will generate notes, quiz and flashcards.",
  },
];

export default function NotificationDropdown({
  open,
}: NotificationDropdownProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Notifications"
      className="
        absolute
        right-0
        top-14
        z-[100]
        w-[340px]
        origin-top-right
        animate-in
        fade-in
        zoom-in-95
        slide-in-from-top-2
        duration-200
      "
    >
      <div
        className="
          overflow-hidden
          rounded-[24px]
          border
        "
        style={{
          /*
           * IMPORTANT:
           * Keep the notification surface opaque.
           * This prevents Dashboard/Hero content from
           * showing through the dropdown.
           */
          backgroundColor: "var(--surface)",

          borderColor:
            "color-mix(in srgb,var(--border) 95%,transparent)",

          boxShadow:
            "0 24px 70px color-mix(in srgb,var(--text) 14%,transparent)",

          isolation: "isolate",
        }}
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            px-5
            py-4
          "
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
              "
              style={{
                backgroundColor:
                  "color-mix(in srgb,var(--accent-color) 10%,var(--surface))",

                borderColor:
                  "color-mix(in srgb,var(--accent-color) 18%,var(--border))",
              }}
            >
              <Bell
                size={17}
                strokeWidth={2}
                style={{
                  color: "var(--accent-color)",
                }}
              />
            </div>

            <div>
              <h3
                className="
                  text-sm
                  font-bold
                "
                style={{
                  color: "var(--text)",
                }}
              >
                Notifications
              </h3>

              <p
                className="
                  mt-0.5
                  text-[11px]
                "
                style={{
                  color: "var(--muted)",
                }}
              >
                Recent updates
              </p>
            </div>
          </div>

          <span
            className="
              rounded-full
              px-2.5
              py-1
              text-[10px]
              font-bold
            "
            style={{
              color: "var(--accent-color)",

              backgroundColor:
                "color-mix(in srgb,var(--accent-color) 10%,var(--surface))",
            }}
          >
            {notifications.length} NEW
          </span>
        </div>

        {/* Notifications */}

        <div
          className="
            space-y-2.5
            p-3
          "
          style={{
            backgroundColor: "var(--surface)",
          }}
        >
          {notifications.length === 0 ? (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                px-5
                py-10
                text-center
              "
              style={{
                backgroundColor:
                  "var(--surfaceHover)",
              }}
            >
              <CheckCircle2
                size={28}
                style={{
                  color: "var(--muted)",
                }}
              />

              <p
                className="
                  mt-3
                  text-sm
                  font-semibold
                "
                style={{
                  color: "var(--text)",
                }}
              >
                You're all caught up
              </p>

              <p
                className="
                  mt-1
                  text-xs
                "
                style={{
                  color: "var(--muted)",
                }}
              >
                No new notifications.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="
                  group
                  relative
                  cursor-default
                  rounded-2xl
                  border
                  p-4
                  transition-all
                  duration-200
                  hover:-translate-y-[1px]
                "
                style={{
                  backgroundColor:
                    "var(--surfaceHover)",

                  borderColor:
                    "var(--border)",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.borderColor =
                    "color-mix(in srgb,var(--accent-color) 28%,var(--border))";

                  event.currentTarget.style.backgroundColor =
                    "color-mix(in srgb,var(--accent-color) 5%,var(--surfaceHover))";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.borderColor =
                    "var(--border)";

                  event.currentTarget.style.backgroundColor =
                    "var(--surfaceHover)";
                }}
              >
                <div className="flex gap-3">
                  {/* Notification icon */}

                  <div
                    className="
                      mt-0.5
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                    "
                    style={{
                      backgroundColor:
                        "color-mix(in srgb,var(--accent-color) 10%,var(--surface))",
                    }}
                  >
                    <Bell
                      size={16}
                      strokeWidth={2}
                      style={{
                        color:
                          "var(--accent-color)",
                      }}
                    />
                  </div>

                  {/* Content */}

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        text-sm
                        font-semibold
                        leading-5
                      "
                      style={{
                        color: "var(--text)",
                      }}
                    >
                      {notification.title}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                      "
                      style={{
                        color: "var(--muted)",
                      }}
                    >
                      {notification.description}
                    </p>
                  </div>

                  {/* Unread indicator */}

                  <span
                    className="
                      mt-1.5
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                    "
                    style={{
                      backgroundColor:
                        "var(--accent-color)",

                      boxShadow:
                        "0 0 8px color-mix(in srgb,var(--accent-color) 60%,transparent)",
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}

        {notifications.length > 0 && (
          <div
            className="
              border-t
              px-5
              py-3
            "
            style={{
              borderColor:
                "var(--border)",

              backgroundColor:
                "var(--surface)",
            }}
          >
            <p
              className="
                text-center
                text-[11px]
              "
              style={{
                color: "var(--muted)",
              }}
            >
              You're up to date with your
              workspace activity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}