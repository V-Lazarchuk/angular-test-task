import { Category, Task } from '../models';

export const categories: Category[] = [
    {
        id: 1,
        title: 'ToDo'
    },
    {
        id: 2,
        title: 'In progress'
    },
    {
        id: 3,
        title: 'Done'
    }
];

export const tasks: Task[] = [
    {
        categoryId: 2,
        id: 1,
        title: 'Create base project structure',
        description: 'Create base structure for new project'
    },
    {
        categoryId: 1,
        id: 2,
        title: 'Define data models',
        description: 'Create interfaces and classes for entities, used in application'
    },
    {
        categoryId: 1,
        id: 3,
        title: 'Create forms',
        description: 'Create reactive forms for create category action and for add/edit task'
    }
];
