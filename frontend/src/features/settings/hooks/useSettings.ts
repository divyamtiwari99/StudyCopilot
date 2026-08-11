import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { DEFAULT_SETTINGS } from "../constants/defaultSettings";

import {
  getSettings,
  saveSettings,
} from "../services/settings.service";

import type {
  SettingsState,
  UserSettings,
  AISettings,
  AppearanceSettings,
  NotificationSettings,
} from "../types/settings.types";



export function useSettings() {


  const [
    settings,
    setSettings,
  ] = useState<SettingsState>(
    DEFAULT_SETTINGS,
  );



  const settingsRef =
    useRef<SettingsState>(
      DEFAULT_SETTINGS,
    );



  const [
    saving,
    setSaving,
  ] = useState(false);



  const [
    loading,
    setLoading,
  ] = useState(true);





  useEffect(() => {


    async function loadSettings() {

      try {

        const data =
          await getSettings();



        const mergedSettings: SettingsState = {

          ...DEFAULT_SETTINGS,

          ...data,


          user: {

            ...DEFAULT_SETTINGS.user,

            ...data.user,

          },


          ai: {

            ...DEFAULT_SETTINGS.ai,

            ...data.ai,

          },


          appearance: {

            ...DEFAULT_SETTINGS.appearance,

            ...data.appearance,

          },


          notifications: {

            ...DEFAULT_SETTINGS.notifications,

            ...data.notifications,

          },


          storage: {

            ...DEFAULT_SETTINGS.storage,

            ...data.storage,

          },


        };



        setSettings(
          mergedSettings,
        );


        settingsRef.current =
          mergedSettings;



      } catch (error) {


        console.error(
          "Failed to load settings",
          error,
        );


      } finally {


        setLoading(false);


      }


    }



    loadSettings();


  }, []);







  const updateUser =
    useCallback(
      (
        data: Partial<UserSettings>,
      ) => {


        setSettings(
          (previous) => {


            const updated = {

              ...previous,


              user: {

                ...previous.user,

                ...data,

              },

            };



            settingsRef.current =
              updated;


            return updated;


          },
        );


      },
      [],
    );







  const updateAI =
    useCallback(
      (
        data: Partial<AISettings>,
      ) => {


        setSettings(
          (previous) => {


            const updated = {

              ...previous,


              ai: {

                ...previous.ai,

                ...data,

              },

            };


            settingsRef.current =
              updated;


            return updated;


          },
        );


      },
      [],
    );







  const updateAppearance =
    useCallback(
      (
        data: Partial<AppearanceSettings>,
      ) => {


        setSettings(
          (previous) => {


            const updated = {

              ...previous,


              appearance: {

                ...previous.appearance,

                ...data,

              },

            };


            settingsRef.current =
              updated;


            return updated;


          },
        );


      },
      [],
    );







  const updateNotifications =
    useCallback(
      (
        data: Partial<NotificationSettings>,
      ) => {


        setSettings(
          (previous) => {


            const updated = {

              ...previous,


              notifications: {

                ...previous.notifications,

                ...data,

              },

            };


            settingsRef.current =
              updated;


            return updated;


          },
        );


      },
      [],
    );







  const save =
    useCallback(
      async () => {


        setSaving(true);



        try {


          const updatedSettings =
            await saveSettings(
              settingsRef.current,
            );



          const mergedSettings: SettingsState = {


            ...DEFAULT_SETTINGS,

            ...updatedSettings,



            user: {

              ...DEFAULT_SETTINGS.user,

              ...updatedSettings.user,

            },



            ai: {

              ...DEFAULT_SETTINGS.ai,

              ...updatedSettings.ai,

            },



            appearance: {

              ...DEFAULT_SETTINGS.appearance,

              ...updatedSettings.appearance,

            },



            notifications: {

              ...DEFAULT_SETTINGS.notifications,

              ...updatedSettings.notifications,

            },



            storage: {

              ...DEFAULT_SETTINGS.storage,

              ...updatedSettings.storage,

            },


          };



          setSettings(
            mergedSettings,
          );


          settingsRef.current =
            mergedSettings;



        } finally {


          setSaving(false);


        }


      },
      [],
    );







  const usedPercentage =
    useMemo(
      () => {


        if (
          settings.storage.total === 0
        ) {

          return 0;

        }



        return (
          settings.storage.used /
          settings.storage.total
        ) * 100;


      },
      [
        settings.storage.used,
        settings.storage.total,
      ],
    );







  return {


    settings,

    saving,

    loading,

    usedPercentage,


    updateUser,

    updateAI,

    updateAppearance,

    updateNotifications,


    save,


  };


}