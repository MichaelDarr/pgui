import { FC } from 'react';

import { postgres } from '../client';
import { ConnectRequest } from '../../protos/postgres/postgres_pb';

export const Socketeer: FC = () => {
    const sendIt = (): void => {
        const arg = new ConnectRequest();
        arg.setPort(1234);
        arg.setHost('helloThere');
        postgres.connect(arg, (err, value) => {
            if (err) {
                throw err;
            } else if (!value) {
                throw new Error('unexpected nullish value')
            }
            const connID = value.getConnectionid()
            console.log({ connID });
        });
    }

    return (
        <div>
            <h1>Socketeer</h1>
            <button onClick={sendIt}>SEND</button>
        </div>
    );
};
