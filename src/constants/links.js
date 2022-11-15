export const Links = {
  home: "/",
  login: "/login",
  register: "/registrar",
  questions: "/duvidas",
  courses: {
    root: "/cursos",
    dev: "dev",
    lesson: "aulas",
  },
  admin: {
    root: "/admin",
    courses: "cursos",
    modules: "modulos",
  },
  discord: "https://discord.com/channels/847518545156112424",
  path: {
    home: "/",
    admin: {
      root: "/admin/cursos",
      modules: {
        root: "/admin/cursos/{courseID}/modulos",
        module: "/admin/cursos/{courseID}/modulos/{moduleCode}",
      },
    },
    login: "/login",
    register: "/registrar",
  },
};
