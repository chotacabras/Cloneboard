# Cloneboard

Cloneboard is a kanban board/task list manager, designed to be compact, readable and quick in use.
You can use it here: https://cloneboard.herokuapp.com/

![cloneboard](https://user-images.githubusercontent.com/102478601/162572439-1bba1420-fe33-4920-9228-2d55e88c64a6.PNG)

## Locally stored

* All data is stored locally, using [localStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage).
* Can be used completely offline.

## UI & UX

The whole thing is largely about making it convenient to use.

New lists can be easily created:

![create-list](https://user-images.githubusercontent.com/102478601/162576540-77750f00-e31a-4709-aade-83d4d8b29fb2.gif)

New notes can be quickly added directly where they are needed:

![add-note](https://user-images.githubusercontent.com/102478601/162575826-a3965d69-89a2-4f70-9341-b4c534abf729.gif)

Notes can also be dragged around, including to and from other lists:

![drag-notes](https://user-images.githubusercontent.com/102478601/162575983-310e0e9c-a2ec-49d9-ad36-f9fa90d3c73c.gif)

Lists can be moved around as well, though not as flashy as notes:

![move-lists](https://user-images.githubusercontent.com/102478601/162576151-e2bd02eb-7877-4ccd-8986-fd8cfcc5b0f2.gif)

Nearly all controls are hidden by default to reduce visual clutter to its minimum:

![hidden-controls](https://user-images.githubusercontent.com/102478601/162576272-990e3c36-ed91-4b1a-86dc-630a96add7cf.gif)

Everything can be easily renamed:

![rename](https://user-images.githubusercontent.com/102478601/162576729-3717f4b2-9b56-40f9-86b0-37f0a9a2599a.gif)

Support for multiple boards with near-instant switching:

![switch-boards](https://user-images.githubusercontent.com/102478601/162576439-04098605-e88a-4a3c-a946-f22c326e2c67.gif)

## Caveats

* Written for desktop and keyboard/mouse use.
* Works in Chrome, Firefox, Edge. Probably in more.
* Uses localStorage for storing boards/lists/notes, so be careful around [clearing your cache](https://stackoverflow.com/questions/9948284/how-persistent-is-localstorage).

## Inspiration

The design of cloneboard has been inspired by [nullboard](https://github.com/apankrat/nullboard) by [@apankrat](https://github.com/apankrat)
