import {
  Camera,
  Check,
  Crown,
  Mail,
  Pencil,
  Save,
  Upload,
  User2,
  X,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
} from "react";

import SectionHeader from "./SectionHeader";
import SettingCard from "./SettingCard";
import { useSettingsContext } from "./SettingsContext";

import authService from "../../../services/auth.service";
import { useAuthStore } from "@/store/auth.store";

interface FormState {
  name: string;
  email: string;
  avatar?: string;
}


interface ValidationErrors {
  name?: string;
  email?: string;
}


export default function ProfileSection() {

  const {
    settings,
    updateUser,
  } = useSettingsContext();

  const updateAuthUser =
    useAuthStore(
      (state) => state.updateUser,
    );


  const [editing, setEditing] =
    useState(false);

  const [saving, setSaving] =
    useState(false);


  const [form, setForm] =
    useState<FormState>({
      name: settings.user.name,
      email: settings.user.email,
      avatar: settings.user.avatar,
    });


  const [errors, setErrors] =
    useState<ValidationErrors>({});


  const inputRef =
    useRef<HTMLInputElement>(null);


  useEffect(() => {

    setForm({
      name: settings.user.name,
      email: settings.user.email,
      avatar: settings.user.avatar,
    });

  }, [
    settings.user.name,
    settings.user.email,
    settings.user.avatar,
  ]);



  const initials =
    useMemo(() => {

      const parts =
        form.name
          .trim()
          .split(/\s+/)
          .filter(Boolean);


      if (parts.length === 0) {
        return "U";
      }


      return parts
        .map(
          (part) =>
            part.charAt(0),
        )
        .join("")
        .slice(0, 2)
        .toUpperCase();

    }, [
      form.name,
    ]);



  const dirty =
    useMemo(() => {

      return (
        form.name !== settings.user.name ||
        form.email !== settings.user.email ||
        form.avatar !== settings.user.avatar
      );

    }, [
      form.name,
      form.email,
      form.avatar,
      settings.user.name,
      settings.user.email,
      settings.user.avatar,
    ]);



  function validate() {

    const nextErrors: ValidationErrors = {};


    if (!form.name.trim()) {
      nextErrors.name =
        "Name is required.";
    }


    if (!form.email.trim()) {

      nextErrors.email =
        "Email is required.";

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(form.email)
    ) {

      nextErrors.email =
        "Enter a valid email.";

    }


    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  }
  function updateField(
    key: keyof FormState,
    value: string,
  ) {

    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));


    if (
      (key === "name" || key === "email") &&
      errors[key]
    ) {

      setErrors((previous) => ({
        ...previous,
        [key]: undefined,
      }));

    }

  }



  function openPicker() {
    inputRef.current?.click();
  }




  function onAvatarChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {

    const file =
      event.target.files?.[0];


    if (!file) {
      return;
    }


    const reader =
      new FileReader();


    reader.onload = () => {

      setForm((previous) => ({
        ...previous,
        avatar:
          reader.result as string,
      }));

    };


    reader.readAsDataURL(file);

    event.target.value = "";

  }





  async function handleSave() {

    if (!validate()) {
      return;
    }


    try {

      setSaving(true);


      const response =
        await authService.updateProfile({

          name:
            form.name.trim(),

          email:
            form.email.trim(),

          avatar:
            form.avatar,

        });



      const updatedUser =
        response.data;



      updateUser({
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      });

      updateAuthUser({
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      });



      setEditing(false);


    } catch (error) {

      console.error(
        "Profile update failed",
        error,
      );


    } finally {

      setSaving(false);

    }

  }





  function handleCancel() {

    setForm({

      name:
        settings.user.name,

      email:
        settings.user.email,

      avatar:
        settings.user.avatar,

    });


    setErrors({});

    setEditing(false);

  }





  const profileCompletion =
    [
      settings.user.name,
      settings.user.email,
      settings.user.avatar,
    ]
      .filter(Boolean)
      .length * 33.3;



  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-3xl">

      <SectionHeader

        eyebrow="PROFILE"

        title="Your Account"

        description="Manage your personal information, profile picture and account details."

        icon={
          <User2
            size={26}
            className="text-cyan-400"
          />
        }

        action={
          editing ? (
            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.08] disabled:opacity-50"
              >

                <X size={16} />

                Cancel

              </button>


              <button
                type="button"
                onClick={handleSave}
                disabled={!dirty || saving}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 disabled:opacity-50"
              >

                {saving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />

                    Save Changes
                  </>
                )}

              </button>

            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
            >

              <Pencil size={16} />

              Edit Profile

            </button>
          )
        }

      />
      <div className="grid gap-6 p-6 xl:grid-cols-[160px_1fr]">

        <div className="flex flex-col items-center">

          <div className="relative">

            {form.avatar ? (

              <img
                src={form.avatar}
                alt={form.name}
                className="h-32 w-32 rounded-3xl border border-white/10 object-cover shadow-xl"
              />

            ) : (

              <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-indigo-500/20 text-4xl font-black text-white shadow-xl">

                {initials}

              </div>

            )}


            <button
              type="button"
              onClick={openPicker}
              disabled={!editing}
              className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-cyan-500 text-black shadow-xl transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            >

              <Camera size={16} />

            </button>



            <input
              ref={inputRef}
              hidden
              accept="image/*"
              type="file"
              onChange={onAvatarChange}
            />

          </div>



          {editing && (

            <button
              type="button"
              onClick={openPicker}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08]"
            >

              <Upload size={14} />

              Upload Photo

            </button>

          )}



          <div className="mt-4 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5">

            <div className="flex items-center gap-2">

              <Crown
                size={14}
                className="text-amber-400"
              />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">

                {settings.user.plan}

              </span>

            </div>

          </div>

        </div>



        <div className="grid gap-4 md:grid-cols-2">


          <SettingCard

            title="Full Name"

            description="Your public display name."

            icon={
              <User2
                size={20}
                className="text-cyan-400"
              />
            }

            value={

              editing ? (

                <div className="space-y-2">

                  <input
                    value={form.name}
                    onChange={(event) =>
                      updateField(
                        "name",
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/40"
                    placeholder="Enter your name"
                  />


                  {errors.name && (

                    <p className="text-xs text-red-400">

                      {errors.name}

                    </p>

                  )}

                </div>

              ) : (

                <div className="flex items-center gap-2">

                  <Check
                    size={16}
                    className="text-emerald-400"
                  />

                  <p className="text-base font-semibold text-white">

                    {settings.user.name}

                  </p>

                </div>

              )

            }

          />



          <SettingCard

            title="Email Address"

            description="Primary email linked with your account."

            icon={
              <Mail
                size={20}
                className="text-cyan-400"
              />
            }

            value={

              editing ? (

                <div className="space-y-2">

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField(
                        "email",
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/40"
                    placeholder="Enter your email"
                  />


                  {errors.email && (

                    <p className="text-xs text-red-400">

                      {errors.email}

                    </p>

                  )}

                </div>

              ) : (

                <div className="flex items-center gap-2">

                  <Check
                    size={16}
                    className="text-emerald-400"
                  />

                  <p className="break-all text-base font-semibold text-white">

                    {settings.user.email}

                  </p>

                </div>

              )

            }

          />
          <SettingCard

            title="Workspace Plan"

            description="Your current subscription and feature access."

            value={

              <div className="flex flex-wrap items-center gap-3">


                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2">

                  <Crown
                    size={15}
                    className="text-amber-400"
                  />


                  <span className="text-sm font-semibold text-amber-300">

                    {settings.user.plan}

                  </span>

                </div>



                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300">

                  Active

                </span>


              </div>

            }

          />





          <SettingCard

            title="Member Since"

            description="The date you joined StudyCopilot."

            value={

              <div>

                <p className="text-base font-semibold text-white">

                  {settings.user.joinedAt}

                </p>


                <p className="mt-1 text-xs text-slate-500">

                  Your learning journey started here.

                </p>

              </div>

            }

          />





          <div className="md:col-span-2">


            <div className="overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-cyan-500/[0.06] via-sky-500/[0.03] to-violet-500/[0.06]">


              <div className="grid gap-5 p-5 lg:grid-cols-3">


                <div>


                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">

                    Profile Completion

                  </p>



                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">

                    <div

                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 transition-all duration-500"

                      style={{

                        width:

                          `${profileCompletion}%`,

                      }}

                    />

                  </div>



                  <p className="mt-3 text-xs leading-6 text-slate-400">

                    Complete your profile to unlock the best StudyCopilot experience.

                  </p>


                </div>





                <div>


                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">

                    Account Status

                  </p>



                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">


                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />


                    <span className="text-sm font-semibold text-emerald-300">

                      Verified

                    </span>


                  </div>


                </div>





                <div>


                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">

                    Sync Status

                  </p>



                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">


                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-400" />


                    <span className="text-sm font-semibold text-cyan-300">

                      Cloud Synced

                    </span>


                  </div>


                </div>


              </div>


            </div>


          </div>


        </div>


      </div>


    </section>

  );

}