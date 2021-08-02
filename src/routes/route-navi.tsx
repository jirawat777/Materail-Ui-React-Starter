import * as Icons from '@material-ui/icons';
import { routeLink } from 'src/routes';


const RouteNavi = [
    {
        "id": 1,
        "parent_id": 0,
        "title": "บัญชีขาจ่าย",
        "position_id": 1,
        "ordering": 1,
        "url": "/admin/payout-account",
        "params": "{\"icon\":\"fas fa-chalkboard\",\"target\":\"_blank\"}",
        "state": 1,
        "children": []
    },
    {
        "id": 2,
        "parent_id": 0,
        "title": "รายงานสรุปยอดบัญชี",
        "position_id": 1,
        "ordering": 1,
        "url": "/admin/report",
        "params": "{\"icon\":\"fas fa-chalkboard\",\"target\":\"_blank\"}",
        "state": 1,
        "children": []
    },
];

export default RouteNavi;
