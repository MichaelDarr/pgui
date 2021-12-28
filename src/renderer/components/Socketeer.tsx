import { FC } from 'react';

// import { ConnectRequest } from '../../protos/postgres/postgres_pb';

export const Socketeer: FC = () => {
    const sendIt = (): void => {
        window.electron.proto.postgres.createClient();
        // client.waitForReady(2000, err => {
        //     console.log({ err })
        // });
        // setTimeout(() => {
        //     const arg = new ConnectRequest();
        //     arg.setPort(1234);
        //     arg.setHost('helloThere');
        //     console.log({ client, arg, src: 'src' });
        //     client.connect(arg, (err, value) => {
        //         console.log({ err, value });
        //     });
        // }, 2000)
    }

    return (
        <div>
            <h1>Socketeer</h1>
            <button onClick={sendIt}>SEND</button>
        </div>
    );
};
