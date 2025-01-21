# Gestor de Notas

## Descripción

Esta es una aplicación de toma de notas construida con Vite + React y Quill, que permite a los usuarios crear, editar y eliminar notas con formato de texto enriquecido.
![alt text](https://github.com/allydevper/notes-manager/blob/main/demo.png?raw=true)
## Características
- **Crear Notas**: Los usuarios pueden crear nuevas notas con un simple clic de botón.
- **Editar Notas**: Las notas se pueden editar utilizando un editor de texto enriquecido (Quill).
- **Eliminar Notas**: Los usuarios pueden eliminar notas seleccionadas.
- **Funcionalidad de Búsqueda**: Los usuarios pueden filtrar notas según el contenido.
- **Almacenamiento Local**: Las notas se almacenan en el almacenamiento local del navegador para su persistencia.

## Detalles de Funcionalidad
- La aplicación gestiona las notas utilizando el manejo de estado de React.
- Las notas se recuperan del almacenamiento local en el primer renderizado y se actualizan cada vez que se realizan cambios.
- Quill se utiliza para la edición de texto enriquecido, permitiendo a los usuarios formatear sus notas fácilmente.

## Instalación
Para ejecutar esta aplicación, clona el repositorio e instala las dependencias:
```bash
npm install
```

## Uso
Inicia la aplicación usando:
```bash
npm start
```

## Licencia
Este proyecto está licenciado bajo la Licencia MIT.
