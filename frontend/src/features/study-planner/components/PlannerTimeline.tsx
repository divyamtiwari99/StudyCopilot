import {
  CheckCircle2,
  Circle,
  Clock3,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";


interface PlannerTask {
  title:string;
  estimatedTime?:string;
}


interface PlannerDay {
  day:number;
  title:string;
  description?:string;
  tasks:PlannerTask[];
}


interface PlannerTimelineProps {
  days:PlannerDay[];
  onProgressChange?:(
    completed:number,
    total:number,
  )=>void;
}


export default function PlannerTimeline({
  days,
  onProgressChange,
}:PlannerTimelineProps){


const [
completedTasks,
setCompletedTasks,
]=useState<
Record<string,boolean>
>({});



const totalTasks =
useMemo(
()=>days.reduce(
(total,day)=>
total+day.tasks.length,
0,
),
[days],
);



const completedCount =
useMemo(
()=>Object.values(
completedTasks,
).filter(Boolean).length,
[completedTasks],
);



useMemo(()=>{

onProgressChange?.(
completedCount,
totalTasks,
);

},[
completedCount,
totalTasks,
onProgressChange,
]);



if(!days.length){

return (

<div
className="
rounded-3xl
border
border-white/10
bg-white/[0.04]
p-10
text-center
"
>

<h2
className="
text-3xl
font-bold
text-white
"
>
No Study Plan Yet
</h2>


<p
className="
mx-auto
mt-4
max-w-xl
text-zinc-400
"
>
Generate your personalized AI Study Planner
to begin learning.
</p>


</div>

);

}



function toggleTask(id:string){

setCompletedTasks(prev=>({
...prev,
[id]:!prev[id],
}));

}



return (

<div className="space-y-6">


{days.map((day)=>(


<section
key={day.day}
className="
rounded-3xl
border
border-white/10
bg-white/[0.04]
p-6
backdrop-blur-xl
"
>


<div
className="
flex
items-center
gap-3
"
>


<div
className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
"
style={{
backgroundColor:
"color-mix(in srgb,var(--accent-color) 10%,transparent)",

color:
"var(--accent-color)",
}}
>

{day.day}

</div>


<div>

<p
className="
text-sm
text-zinc-400
"
>
Day {day.day}
</p>

</div>


</div>



<h2
className="
mt-5
text-2xl
font-bold
text-white
"
>
{day.title}
</h2>



{day.description && (

<p
className="
mt-3
max-w-3xl
text-zinc-400
"
>
{day.description}
</p>

)}



<div className="mt-5 space-y-4">


{day.tasks.map((task,index)=>{


const id =
`${day.day}-${index}`;


const completed =
completedTasks[id];


return (

<button
key={id}
onClick={()=>
toggleTask(id)
}
className="
flex
w-full
items-center
justify-between
rounded-2xl
border
border-white/10
bg-[#0b1220]
px-6
py-5
text-left
transition
hover:bg-[#111827]
"
style={{
}}
>


<div
className="
flex
items-center
gap-4
"
>


<div
className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
"
style={{
backgroundColor:
"color-mix(in srgb,var(--accent-color) 10%,transparent)",
}}
>


{completed ? (

<CheckCircle2
size={20}
className="text-emerald-400"
/>

):(


<Circle
size={20}
style={{
color:
"var(--accent-color)",
}}
/>

)}


</div>



<h3
className={`
font-semibold
${
completed
?
"text-zinc-500 line-through"
:
"text-white"
}
`}
>
{task.title}
</h3>


</div>




{task.estimatedTime && (

<div
className="
flex
items-center
gap-2
rounded-xl
border
border-white/10
bg-white/5
px-4
py-2
text-sm
text-zinc-400
"
>

<Clock3 size={15}/>

{task.estimatedTime}

</div>

)}



</button>

);


})}


</div>


</section>


))}


</div>

);

}