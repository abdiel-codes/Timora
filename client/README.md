# Timora Frontend 🧩✨

This is the Timora frontend, a colaborative task management platform for personal and group tasks.

## 🌐 Main Routes and Pages

| Ruta                 | Página renderizada       | Descripción                           |
|----------------------|---------------------------|----------------------------------------|
| `/tasks`             | `Tasks.jsx`               | Personal tasks with filters and cards |
| `/groups`            | `Groups.jsx`              | Search and join groups                |
| `/groups/:groupId`   | `GroupDashboard.jsx`      | Internal view of active group         |
| `/progress`          | `Progress.jsx`            | Personal productivity graph           |
| `/profile`           | `Profile.jsx`             | User profile                          |
| `/settings`          | `Settings.jsx`            | Dark mode toggle and other settings   |

## 🧩 Componentes destacados

- `Sidebar.jsx` & `HeaderBar.jsx`: Global navigation
- `TaskCard.jsx`: card with task info and actions
- `StatusFilters.jsx`: filters for task status (`Pending`, `In Progress`, `Done`)
- `GroupInfoCard.jsx`: Basic information about a found group
- `GroupMemberPanel.jsx`: List of group members found
- `JoinGroupButton.jsx`: Contextual button to join a group
- `DateBanner.jsx`: Date and tasks count banner

## ⚙️ Key Technologies

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/) for bundling
- [Tailwind](https://tailwindcss.com/) for styling
