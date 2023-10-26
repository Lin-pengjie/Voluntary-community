import FRouter from '../Foreground/router/RouteConfig'
import BRouter from '../Backstage/router/RouterConfig'

const Global = [...FRouter];
Global.push(...BRouter);

export default Global