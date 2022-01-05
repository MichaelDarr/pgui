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
                console.warn(err)
            } else if (!value) {
                console.warn(new Error('unexpected nullish value'));
            } else {
                const connectionID = value.getConnectionid();
                console.log({ connectionID });
            }
        });
    };

    return (
        <div>
            <h1>Socketeer</h1>
            <button onClick={sendIt}>SEND</button>
        </div>
    );
};
