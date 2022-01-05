import { FC, useState } from 'react';

import { postgres } from '../client';
import { ConnectRequest } from '../../protos/postgres/postgres_pb';

export const Socketeer: FC = () => {
    const [connectionID, setConnectionID] = useState<null|string>(null);

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
                setConnectionID(value.getConnectionid());
            }
        });
    };

    return (
        <div>
            <h1>Socketeer</h1>
            {connectionID !== null && <h2>{connectionID}</h2>}
            <button onClick={sendIt}>Get Connection ID</button>
        </div>
    );
};
