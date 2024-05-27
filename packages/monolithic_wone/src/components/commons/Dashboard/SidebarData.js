import { svgIcons } from "../../../utility/svgIcons";
const { SessionIcon, ScheduleIcon, RecordingsIcon, ArticleIcon, TrackIcon } =
  svgIcons();
const SidebarData = [
  {
    title: "Sessions",
    path: "/user/sessions",
    imgName: SessionIcon,
    cName: "nav-text",
  },
  {
    title: "My Schedule",
    path: "/user/schedule",
    imgName: ScheduleIcon,
    cName: "nav-text",
  },
  {
    title: "WONE Index",
    path: "/user/woneindex",
    imgName: TrackIcon,
    cName: "nav-text",
  },
  {
    title: "Recordings",
    path: "/user/recordings",
    imgName: RecordingsIcon,
    cName: "nav-text",
  },
  {
    title: "Articles",
    path: "/user/articles",
    imgName: ArticleIcon,
    cName: "nav-text",
  },
];

export default SidebarData;
