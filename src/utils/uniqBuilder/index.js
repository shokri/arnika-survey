import React from "react";
import {v4 as uuidv4} from 'uuid';

export default () => {
    let _uniq = ''
    uuidv4().split('-').map((item) => _uniq += item.toString())

    return _uniq.toString()
}