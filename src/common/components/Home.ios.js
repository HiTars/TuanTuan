'use strict';

import Native from './Home.native';

export default function () {
    return Native.call(this, this.props, this.state);
}
