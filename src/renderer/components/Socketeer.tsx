import { FC } from 'react';

import { ConnectRequest } from '../../protos/postgres/postgres_pb';

export const Socketeer: FC = () => {
    const sendIt = (): void => {
        const client = window.electron.proto.postgres.client();
        const deadline = new Date();
        deadline.setSeconds(deadline.getSeconds()+1);
        client.waitForReady(deadline, err => {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log('HELL YA!');
            const arg = new ConnectRequest();
            arg.setPort(1234);
            arg.setHost('helloThere');
            console.log({ client, arg, src: 'src' });
            client.connect(arg, (err, value) => {
                console.log({ err, value });
            });
        });
    }

    return (
        <div>
            <h1>Socketeer</h1>
            <button onClick={sendIt}>SEND</button>
        </div>
    );
};
