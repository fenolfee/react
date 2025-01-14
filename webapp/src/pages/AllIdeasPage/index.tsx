import { trpc } from '../../lib/trpc'

export const AllIdeasPage = () => {
   const {data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()
   if (isLoading || isFetching) return <p>Loading...</p>
   if (isError) return <p>Error: {error.message}</p>
   return (
         <div>
             <h1>AllIdeas</h1>
             {data.ideas.map((idea) => (
                 <div key={idea.nick}>
                     <h2>{idea.title}</h2>
                     <p>{idea.description}</p>
                 </div>
             ))}
         </div>
       )
 }