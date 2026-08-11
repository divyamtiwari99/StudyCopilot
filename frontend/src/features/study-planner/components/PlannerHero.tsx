import { CalendarDays,Sparkles } from "lucide-react";


interface PlannerHeroProps {
  onGenerate?:()=>void;
  loading?:boolean;
}


export default function PlannerHero({
  onGenerate,
  loading=false,
}:PlannerHeroProps){

return (

<div
className="
flex
flex-col
gap-8
lg:flex-row
lg:items-center
lg:justify-between
"
>


<div>


<div
className="
mb-4
inline-flex
items-center
gap-2
rounded-full
border
px-4
py-2
text-sm
font-medium
"
style={{
borderColor:
"color-mix(in srgb,var(--accent-color) 30%,transparent)",

backgroundColor:
"color-mix(in srgb,var(--accent-color) 10%,transparent)",

color:
"var(--accent-color)",
}}
>

<CalendarDays size={16}/>

AI Study Planner

</div>



<h1
className="
text-4xl
font-bold
text-white
"
>
Personalized Learning Plan
</h1>



<p
className="
mt-5
max-w-2xl
leading-8
text-zinc-400
"
>
Generate an AI-powered day-by-day study schedule
based on your uploaded learning material, including
revision sessions, quizzes, and progress tracking.
</p>


</div>



<button
onClick={onGenerate}
disabled={loading}
className="
inline-flex
items-center
justify-center
gap-3
rounded-2xl
px-7
py-4
font-semibold
text-white
transition
disabled:cursor-not-allowed
disabled:opacity-70
"
style={{
backgroundColor:
"var(--accent-color)",
}}
>

<Sparkles size={18}/>


{loading
?
"Generating..."
:
"Generate Planner"}


</button>


</div>

);

}