export const Links = {
    home: '/',
    login: '/login',
    register: '/registrar',
    courses: {
      root: "/cursos",
      dev: "dev",
      lesson: 'aulas'
    },
    admin: {
        root: '/admin',
        courses: 'cursos',
        modules: 'modulos',
        users: 'usuarios'
    },
    discord: 'https://discord.com/channels/847518545156112424',
    path: {
      home: '/',
      admin: {
        root: '/admin/cursos',
        modules: {
          root: '/admin/cursos/{courseID}/modulos',
          module: '/admin/cursos/{courseID}/modulos/{moduleCode}'
        },
        users: {
          root: '/admin/usuarios',
          edit: '/admin/usuarios/{userID}/edit'
        },
        courses: {
          root: '/admin/cursos',
          edit: '/admin/cursos/{courseID}/edit',
          add: '/admin/cursos/add'
        }
      },
      login: '/login',
      register: '/registrar',
      courses: '/cursos'
    }
}
