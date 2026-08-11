import {
BookOpen,
Clock3,
Flag,
Layers3,
} from "lucide-react";


interface Topic {
title:string;
description:string;
difficulty:string;
estimatedTime:string;
prerequisites:string[];
}


interface Phase {
title:string;
description:string;
topics:Topic[];
}


interface Props {
roadmap:{
phases:Phase[];
};
}



function difficultyClasses(
difficulty:string,
){

switch(
difficulty.toLowerCase()
){

case "beginner":
return {
bg:"bg-emerald-500/10",
border:"border-emerald-500/30",
text:"text-emerald-400",
};


case "intermediate":
return {
bg:"bg-amber-500/10",
border:"border-amber-500/30",
text:"text-amber-400",
};


case "advanced":
return {
bg:"bg-rose-500/10",
border:"border-rose-500/30",
text:"text-rose-400",
};


default:
return {
bg:"",
border:"",
text:"",
};

}

}



export default function RoadmapTimeline({
roadmap,
}:Props){

return (

<div className="space-y-10">


{roadmap.phases.map(
(phase,phaseIndex)=>(

<section
key={phaseIndex}
className="relative"
>


<div
className="
mb-8
flex
items-center
gap-4
"
>


<div
className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
border
"
style={{
borderColor:
"color-mix(in srgb,var(--accent-color) 30%,transparent)",

backgroundColor:
"color-mix(in srgb,var(--accent-color) 10%,transparent)",
}}
>

<Flag
size={24}
style={{
color:
"var(--accent-color)",
}}
/>

</div>



<div>

<div
className="
text-xs
uppercase
tracking-[0.3em]
"
style={{
color:
"var(--accent-color)",
}}
>
Phase {phaseIndex+1}
</div>



<h2
className="
mt-1
text-3xl
font-bold
text-white
"
>
{phase.title}
</h2>



<p
className="
mt-2
max-w-3xl
text-zinc-400
"
>
{phase.description}
</p>


</div>


</div>
<div className="space-y-6">

{phase.topics.map(
(topic,topicIndex)=>{

const badge =
difficultyClasses(
topic.difficulty,
);


return (

<div
key={topicIndex}
className="
group
relative
ml-20
overflow-hidden
rounded-3xl
border
border-white/10
bg-white/[0.04]
p-6
backdrop-blur-xl
transition-all
duration-300
hover:-translate-y-1
hover:bg-white/[0.06]
"
style={{
}}
>


<div
className="
pointer-events-none
absolute
inset-0
opacity-0
transition
duration-500
group-hover:opacity-100
"
>

<div
className="
absolute
-right-12
-top-12
h-36
w-36
rounded-full
blur-3xl
"
style={{
backgroundColor:
"color-mix(in srgb,var(--accent-color) 10%,transparent)",
}}
/>

</div>




<div
className="
absolute
-left-[56px]
top-8
flex
h-10
w-10
items-center
justify-center
rounded-full
border
bg-[#08111f]
"
style={{
borderColor:
"color-mix(in srgb,var(--accent-color) 30%,transparent)",
}}
>


<BookOpen
size={18}
style={{
color:
"var(--accent-color)",
}}
/>


</div>




<div
className="
relative
z-10
"
>


<h3
className="
text-xl
font-semibold
text-white
"
>
{topic.title}
</h3>



<p
className="
mt-3
leading-7
text-zinc-400
"
>
{topic.description}
</p>




<div
className="
mt-5
flex
flex-wrap
gap-3
"
>


<div
className={`
inline-flex
items-center
gap-2
rounded-full
border
px-3
py-1
text-sm
${badge.bg}
${badge.border}
${badge.text}
`}
>

<Layers3 size={15}/>

{topic.difficulty}

</div>




<div
className="
inline-flex
items-center
gap-2
rounded-full
border
px-3
py-1
text-sm
"
style={{

borderColor:
"color-mix(in srgb,var(--accent-color) 20%,transparent)",


backgroundColor:
"color-mix(in srgb,var(--accent-color) 10%,transparent)",


color:
"var(--accent-color)",

}}
>

<Clock3 size={15}/>

{topic.estimatedTime}

</div>



</div>




{topic.prerequisites?.length > 0 && (

<div className="mt-6">


<h4
className="
mb-3
text-sm
font-semibold
uppercase
tracking-wider
text-zinc-400
"
>
Prerequisites
</h4>



<div
className="
flex
flex-wrap
gap-2
"
>


{topic.prerequisites.map(
(prerequisite,prerequisiteIndex)=>(


<span
key={prerequisiteIndex}
className="
rounded-full
border
border-white/10
bg-white/5
px-3
py-1
text-xs
text-zinc-300
"
>
{prerequisite}
</span>


),

)}


</div>


</div>

)}



</div>


</div>

);

},

)}


</div>


</section>


),

)}


</div>

);

}