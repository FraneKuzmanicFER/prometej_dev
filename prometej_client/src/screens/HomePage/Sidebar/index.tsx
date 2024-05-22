import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PersonIcon from "@mui/icons-material/Person";
import "./styles.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ROLE from "../../../types/enums/Role";
import { UserViewModel } from "../../../types/models/User";

interface SidebarProps {
  toggle: boolean;
  user: UserViewModel | undefined;
  authenticated: boolean | undefined;
}

export default function Sidebar({ toggle, user, authenticated }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(
    location.pathname.split("/")[1] || "learning"
  );

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    navigate(`/${item}`);
  };

  return (
    <List className="sidebar">
      <ListItem
        key={"learning"}
        sx={{ display: "block" }}
        className={`sidebar-item${
          selectedItem === "learning" ? "-selected" : ""
        }`}
      >
        <ListItemButton
          onClick={() => handleItemClick("learning")}
          sx={{
            minHeight: 48,
            justifyContent: toggle ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: toggle ? 3 : "auto",
              justifyContent: "center",
              color: selectedItem === "learning" ? "black" : "white",
            }}
          >
            <LocalLibraryIcon />
          </ListItemIcon>
          <ListItemText primary={"Učenje"} sx={{ opacity: toggle ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
      <ListItem
        key={"quizes"}
        sx={{ display: "block" }}
        className={`sidebar-item${
          selectedItem === "quizes" ? "-selected" : ""
        }`}
      >
        <ListItemButton
          onClick={() => handleItemClick("quizes")}
          sx={{
            minHeight: 48,
            justifyContent: toggle ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: toggle ? 3 : "auto",
              justifyContent: "center",
              color: selectedItem === "quizes" ? "black" : "white",
            }}
          >
            <QuizIcon />
          </ListItemIcon>
          <ListItemText primary={"Kvizovi"} sx={{ opacity: toggle ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
      {authenticated &&
        (user?.role == ROLE.Teacher || user?.role === ROLE.Admin) && (
          <ListItem
            key={"my-quizes"}
            sx={{ display: "block" }}
            className={`sidebar-item${
              selectedItem === "my-quizes" ? "-selected" : ""
            }`}
          >
            <ListItemButton
              onClick={() => handleItemClick("my-quizes")}
              sx={{
                minHeight: 48,
                justifyContent: toggle ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: toggle ? 3 : "auto",
                  justifyContent: "center",
                  color: selectedItem === "my-quizes" ? "black" : "white",
                }}
              >
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Moji kvizovi"}
                sx={{ opacity: toggle ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        )}
      {authenticated &&
        (user?.role == ROLE.Teacher || user?.role === ROLE.Admin) && (
          <ListItem
            key={"make-quiz"}
            sx={{ display: "block" }}
            className={`sidebar-item${
              selectedItem === "make-quiz" ? "-selected" : ""
            }`}
          >
            <ListItemButton
              onClick={() => handleItemClick("make-quiz")}
              sx={{
                minHeight: 48,
                justifyContent: toggle ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: toggle ? 3 : "auto",
                  justifyContent: "center",
                  color: selectedItem === "make-quiz" ? "black" : "white",
                }}
              >
                <NoteAddIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Napravi kviz"}
                sx={{ opacity: toggle ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        )}
      <ListItem
        key={"exam"}
        sx={{ display: "block" }}
        className={`sidebar-item${selectedItem === "exam" ? "-selected" : ""}`}
      >
        <ListItemButton
          onClick={() => handleItemClick("exam")}
          sx={{
            minHeight: 48,
            justifyContent: toggle ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: toggle ? 3 : "auto",
              justifyContent: "center",
              color: selectedItem === "exam" ? "black" : "white",
            }}
          >
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Pristupi provjeri"}
            sx={{ opacity: toggle ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
