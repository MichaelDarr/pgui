import { Listener, Listeners, MessageType } from './types';

export const newListeners = (): Listeners => {
    const listeners: {
        [T in MessageType]: Set<Listener<T>>
    } = {
        'metadata': new Set(),
        'row': new Set(),
    };

    const remove: Listeners['remove'] = (type, listener) => {
        listeners[type].delete(listener);
    };

    const add: Listeners['add'] = (type, listener) => {
        listeners[type].add(listener);
        return {
            remove: () => remove(type, listener),
        }
    };

    const emit: Listeners['emit'] = (type, message) => {
        listeners[type].forEach(listener => listener(message));
    };

    return { add, emit, remove };
};
