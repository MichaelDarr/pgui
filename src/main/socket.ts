import ipc from 'node-ipc';

ipc.config.silent = true;

const isSocketTaken = (name: string) => {
  return new Promise(res => {
    ipc.connectTo(name, () => {
      ipc.of[name].on('error', () => {
        ipc.disconnect(name);
        res(false);
      });

      ipc.of[name].on('connect', () => {
        ipc.disconnect(name);
        res(true);
      });
    });
  });
}

const nthSocketName = (n: number): string => {
    return `${ipc.config.socketRoot}pgui${n}.sock`;
}

export const findOpenSocket = async (): Promise<string> => {
  let currentSocket = 1;
  while (await isSocketTaken(nthSocketName(currentSocket))) {
    currentSocket++;
  }
  return nthSocketName(currentSocket);
}
