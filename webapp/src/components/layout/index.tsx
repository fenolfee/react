import { Link, Outlet } from 'react-router-dom';
import { getAllIdeasRoute, getNewIdeaRoute } from '../../lib/routes';
import css from './index.module.scss';

export const Layout = () => {
    return (
        <div className={css.layout}>
            <div className={css.navigation}>
                <div className={css.logo}>ideaNick</div>
                <ul className={css.menu}>
                    <li className={css.item}>
                        <Link className={css.link} to={getAllIdeasRoute()}>
                            All ideas
                        </Link>
                    </li>
                    <li>
                        <Link className={css.link} to={getNewIdeaRoute()}>
                            Add idea
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={css.content}>
                <Outlet />
            </div>
        </div>
    );
};
