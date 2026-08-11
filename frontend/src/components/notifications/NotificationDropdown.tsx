import {
  Bell,
} from "lucide-react";


interface NotificationDropdownProps {
  open: boolean;
}


const notifications = [
  {
    id: 1,
    title: "Welcome to StudyCopilot 🎓",
    description:
      "Your AI workspace is ready.",
  },

  {
    id: 2,
    title:
      "Upload your first document",
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
      className="
        absolute
        right-0
        top-12
        z-50
        w-80
        rounded-2xl
        border
        border-white/10
        bg-[#111827]
        p-4
        shadow-xl
      "
    >


      <div
        className="
          mb-3
          flex
          items-center
          gap-2
        "
      >

        <Bell
          size={18}
          className="text-white"
        />


        <h3
          className="
            text-sm
            font-semibold
            text-white
          "
        >
          Notifications
        </h3>


      </div>



      <div className="space-y-3">


        {notifications.map(
          (notification) => (

          <div
            key={notification.id}
            className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-3
            "
          >

            <p
              className="
                text-sm
                text-white
              "
            >
              {notification.title}
            </p>


            <p
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >
              {notification.description}
            </p>


          </div>

        ))}


      </div>


    </div>

  );
}