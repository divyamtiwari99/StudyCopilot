import { api } from "@/lib/api";


export interface NotesArtifact {

  _id: string;

  contentId: string;

  title: string;

  markdown: string;

  createdAt: string;

  updatedAt: string;

}


interface ApiResponse<T> {

  success: boolean;

  data: T;

}



// ==========================
// Single Document Notes
// ==========================

export async function getNotes(
  contentId: string,
) {

  const response =
    await api.get<
      ApiResponse<NotesArtifact>
    >(
      `/ai/notes/${contentId}`,
    );


  return response.data.data;

}

// ==========================
// Delete Notes
// ==========================

export async function deleteNotes(
  contentId: string,
) {

  const response =
    await api.delete<
      ApiResponse<{
        success: boolean;
      }>
    >(
      `/ai/notes/${contentId}`,
    );


  return response.data;

}


// ==========================
// All User Notes
// ==========================

export async function getAllNotes() {

  const response =
    await api.get<
      ApiResponse<NotesArtifact[]>
    >(
      "/ai/notes",
    );


  return response.data.data;

}