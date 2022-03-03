import { CellRenderers } from 'leyden-react';

import { Bool } from './Bool';
import { Bytes } from './Bytes';
import { Double } from './Double';
import { Empty } from './Empty';
import { Float } from './Float';
import { Int32 } from './Int32';
import { Int64 } from './Int64';
import { String } from './String';
import { Timestamp } from './Timestamp';
import { UInt32 } from './UInt32';
import { UInt64 } from './UInt64';

export const cellRenderers: CellRenderers = {
    Bool,
    Bytes,
    Double,
    Empty,
    Float,
    Int32,
    Int64,
    String,
    Timestamp,
    UInt32,
    UInt64,
};
