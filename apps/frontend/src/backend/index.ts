
import updateEntry from './entry/updateEntry'
import createEntry from './entry/createEntry'
import createEntryMany from './entry/createEntryMany'
import allEntry from './entry/allEntry'
import deleteEntry from './entry/deleteEntry'
import allEntryBalance from './entry/allEntryBalance'
import aggregateBalance from './entry/aggregateBalance'

import upsertCategory from './category/upsertCategory'
import createCategory from './category/createCategory'
import allCategory from './category/allCategory'
import deleteCategory from './category/deleteCategory'

import upsertParam from './param/upsertParam'
import createParam from './param/createParam'
import allParam from './param/allParam'
import deleteParam from './param/deleteParam'
import findLabel from './param/findLabel'

// Padrão Facade
export default class Backend {
    static readonly entries = {
        update: updateEntry,
        create: createEntry,
        createMany: createEntryMany,
        all: allEntry,
        delete: deleteEntry,
        allBalance: allEntryBalance,
        aggregateBalance: aggregateBalance
    }
    static readonly categories = {
        upsert: upsertCategory,
        create: createCategory,
        all: allCategory,
        delete: deleteCategory,
    }
    static readonly params = {
        upsert: upsertParam,
        create: createParam,
        all: allParam,
        delete: deleteParam,
        findLabel: findLabel
    }
}
