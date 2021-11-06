import qs from "query-string";
import moment from 'moment-jalaali';

export default ({page = 1, page_size = 10 , sortOrder = 'desc', sortBy = 'updatedAt', populate = undefined, filter = undefined, exports, Authorization, dateType, category_id__in} = {}) => {
    const filter_ = {};
    if (filter) {
        Object.keys(filter).map(key => {
            if (Array.isArray(filter[key])) {
                switch (key) {
                    case "birthday":
                        if (filter[key].length > 1) {
                            let birthDay = filter[key].sort();
                            filter_.birthday = {"$gt": birthDay[0], "$lte": birthDay[birthDay.length - 1]}
                        } else {
                            if (filter[key].length !== 0) {
                                filter_.birthday = {
                                    "$gt": moment(filter[key][0]).year().toString(),
                                    "$lte": (moment(filter[key][0]).year() + 1).toString()
                                }
                            }
                        }
                        break;
                    case "favoritePost":
                        if (filter[key].length !== 0) {
                            filter_[key] = {"$in": filter[key]}
                        }
                        break;
                    default:
                        if (filter[key].length !== 0) {
                            filter_[key] = filter[key]
                        }
                }
            } else {
                filter_[key] = filter[key]
            }
        });
    }
    return qs.stringify({page, page_size,category_id__in, Authorization});
}