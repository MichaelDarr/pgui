import { FC } from 'react';

export const Socketeer: FC = () => {
    const sendIt = (): void => {
        console.log(window.electron.proto.postgres.PostgresServiceClient);
        const client = new window.electron.proto.postgres.PostgresServiceClient();
        console.log({ client });
    }

    return (
        <div>
            <h1>Socketeer</h1>
            <button onClick={sendIt}>SEND</button>
        </div>
    );
};
