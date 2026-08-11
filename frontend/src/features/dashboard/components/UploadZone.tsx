import { useCallback,useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import {
CloudUpload,
FileText,
Loader2,
} from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";

import { uploadDocument } from "../services/document.service";


export default function UploadZone(){

const queryClient =
useQueryClient();


const [progress,setProgress] =
useState(0);


const [uploading,setUploading] =
useState(false);



const onDrop =
useCallback(
async(acceptedFiles:File[])=>{

if(!acceptedFiles.length)
return;


try{

setUploading(true);
setProgress(0);


await uploadDocument(
acceptedFiles[0],
setProgress,
);


await queryClient.invalidateQueries({
queryKey:["documents"],
});


toast.success(
"Document uploaded successfully!",
);


}catch(error){

console.error(error);


toast.error(
error instanceof Error
? error.message
:"Upload failed. Please try again.",
);


}finally{

setUploading(false);
setProgress(0);

}

},
[queryClient],
);



const {
getRootProps,
getInputProps,
isDragActive,
}=useDropzone({

onDrop,

multiple:false,

accept:{
"application/pdf":[".pdf"],

"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
[".docx"],

"application/vnd.openxmlformats-officedocument.presentationml.presentation":
[".pptx"],

"text/plain":[".txt"],
},

});



return (

<div
{...getRootProps()}
className={`
rounded-[32px]
border-2
border-dashed
p-12
transition

${
isDragActive
?
"bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)]"
:
"bg-white/[0.04]"
}
`}
style={{
borderColor:
isDragActive
?
"var(--accent-color)"
:
"rgba(255,255,255,0.1)",
}}
>

<input {...getInputProps()}/>


<div className="flex flex-col items-center text-center">


<CloudUpload
className="mb-6 h-14 w-14"
style={{
color:"var(--accent-color)",
}}
/>



<h2 className="text-3xl font-bold text-white">

{uploading
?
"Uploading..."
:
"Upload Document"}

</h2>



<p className="mt-3 text-zinc-400">
Drag & drop or click to upload.
</p>



{uploading && (

<>

<div
className="
mt-8
h-3
w-full
overflow-hidden
rounded-full
bg-zinc-800
"
>

<div
className="
h-full
transition-all
"
style={{
width:`${progress}%`,
backgroundColor:
"var(--accent-color)",
}}
/>

</div>



<div
className="
mt-4
flex
items-center
gap-3
"
style={{
color:
"var(--accent-color)",
}}
>

<Loader2 className="animate-spin"/>

<span>
{progress}%
</span>

</div>


</>

)}



{!uploading && (

<div
className="
mt-10
flex
items-center
gap-3
rounded-xl
border
border-white/10
bg-black/20
px-5
py-3
"
>

<FileText
style={{
color:
"var(--accent-color)",
}}
/>


<span className="text-white">
PDF · DOCX · PPTX · TXT
</span>


</div>

)}


</div>


</div>

);

}