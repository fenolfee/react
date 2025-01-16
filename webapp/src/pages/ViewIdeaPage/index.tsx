import { useParams } from 'react-router-dom';
import { viewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';
import { Segment } from '../../components/Segment';

export const ViewIdeaPage = () => {
    const { ideaNick } = useParams() as viewIdeaRouteParams
    const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({ ideaNick })
    if (isLoading || isFetching) return <p>Loading...</p>
    if (isError) return <p>Error: {error.message}</p>
    if (!data.idea) return <p>Idea not found</p>
    return (
        <Segment title={data.idea.title} description={data.idea.description}>
          <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
        </Segment>
      )
}
