import Home from "../pages/home";
import NotFoundView from "../pages/notFound";
import MainLayout from "../pages/layout/MainLayout";


export default {
    "/": {
        header: true,
        footer: true,
        component: Home,
        exact: true,
        reverse: false,
        Layout: MainLayout,
        wrapperClassName: "wrapper-pages",
    },
    "*": {
        header: false,
        footer: false,
        component: NotFoundView,
        Layout: MainLayout,
        wrapperClassName: "wrapper-pages"
    }
};