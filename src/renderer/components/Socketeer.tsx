import { FC } from 'react';

import { useBackendSocket } from '../hooks/useBackendSocket';

export const Socketeer: FC = () => {
    const { socket } = useBackendSocket();

    const getText = (): string => {
        if (socket === null) {
            return "No socket recieved"
        }
        return `Socket: ${socket}`;
    }

    return (
        <div>
            <h1>{getText()}</h1>
        </div>
    );
};
