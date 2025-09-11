# template-nuxt-fsd

A nuxt.js - V4 template, implementing the [Feature-Sliced Design](https://feature-sliced.design/) architecture

## CORES

### General

#### [Layer Hierarchy](https://feature-sliced.design/docs/get-started/overview#concepts):

1. **App**
2. **Pages**
3. **Widgets**
4. **Features**
5. **Entities**
6. **Shared**

#### Layers:

There are 3 nesting levels in the application:

1. **Layer**
    - **standard:** app, pages, widgets, features, entities, shared
2. **Slices**
    - **custom:** photo, effects, gallery-page, post, comments, news-feed etc...
3. **Segments**
    - **standard:** ui, api, model, lib, config
    - **custom:** compose, like, delete, etc...

### [Layers](https://feature-sliced.design/docs/reference/layers)

Layers are the first level of organisational hierarchy in Feature-Sliced Design. Their purpose is to separate code based
on how much responsibility it needs and how many other modules in the app it depends on. Every layer carries special
semantic meaning to help you determine how much responsibility you should allocate to your code.

There are 6 layers in total, arranged from most responsibility and dependency to least:

A file system tree, with a single root folder called src and then seven subfolders: app, processes, pages, widgets,
features, entities, shared.

### [Slices](https://feature-sliced.design/docs/reference/slices-segments#slices):

Slices are the **SECOND** level in the organizational hierarchy of Feature-Sliced Design. Their main purpose is to group
code by its meaning for the product, business, or just the application.

The names of slices are not standardized because they are directly determined by the business domain of your
application. For example, a photo gallery might have slices photo, effects, gallery-page. A social network would require
different slices, for example, post, comments, news-feed.

The layers Shared and App don't contain slices. That is because Shared should contain no business logic at all, hence
has no meaning for the product, and App should contain only code that concerns the entire application, so no splitting
is necessary.

### [Segments](https://feature-sliced.design/docs/reference/slices-segments#segments):

Segments are the third and **FINAL** level in the organizational hierarchy, and their purpose is to group code by its
technical nature.

There a few standardized segment names:

- ui — everything related to UI display: UI components, date formatters, styles, etc.
- api — backend interactions: request functions, data types, mappers, etc.
- model — the data model: schemas, interfaces, stores, and business logic.
- lib — library code that other modules on this slice need.
- config — configuration files and feature flags.