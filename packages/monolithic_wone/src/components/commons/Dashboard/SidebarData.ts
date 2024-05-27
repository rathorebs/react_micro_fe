import { svgIcons } from "../../../utility/svgIcons";
const { SessionIcon, ScheduleIcon, RecordingsIcon, ArticleIcon, TrackIcon } =
  svgIcons();
interface SidebarItem {
  title: string;
  path: string;
  imgName: string;
  cName: string;
  color: string;
}
interface SidebarItems extends Array<SidebarItem> {}
const SidebarData: SidebarItems = [
  {
    title: "Sessions",
    path: "/user/sessions",
    imgName: SessionIcon,
    cName: "nav-text",
    color: "blue",
  },
  {
    title: "My Schedule",
    path: "/user/schedule",
    imgName: ScheduleIcon,
    cName: "nav-text",
    color: "orange",
  },
  {
    title: "Track",
    path: "/user/woneindex",
    imgName: TrackIcon,
    cName: "nav-text",
    color: "red",
  },
  {
    title: "Recordings",
    path: "/user/recordings",
    imgName: RecordingsIcon,
    cName: "nav-text",
    color: "blue",
  },
  {
    title: "Articles",
    path: "/user/articles",
    imgName: ArticleIcon,
    cName: "nav-text",
    color: "blue",
  },
];

export default SidebarData;
