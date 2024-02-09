import { createHashRouter, RouterProvider } from 'react-router-dom';
import EntityManager from './EntityManager.js';
import EntityInfo from './EntityInfo.js';
import RootPage from './RootPage.js';
import EntityPinned from './EntityPinned.js';
import SignInSignUpForm from './SignInSignUpForm.js';
import EntityUpdateHistory from './EntityUpdateHistory.js';

const router = createHashRouter([
    {
        path: '/',
        element: <RootPage />,
        children: [
            {
                path: '/',
                element: <SignInSignUpForm />
            },
            {
                path: '/entityManager',
                element: <EntityManager />,
            },
            {
                path: '/:id',
                element: <EntityInfo />,
            },
            {
                path: '/pinned',
                element: <EntityPinned />,
            },
            {
                path: '/updateHistory',
                element: <EntityUpdateHistory />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
