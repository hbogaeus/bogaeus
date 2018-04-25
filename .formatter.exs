[
  locals_without_parens: [
    plug: :*,
    forward: :*,
    pipe_through: :*,
    get: :*,
    put: :*,
    post: :*,
    delete: :*,

    inspect: :*,

    # Ecto
    ## schema
    field: :*,
    belongs_to: :*,
    has_one: :*,
    has_many: :*,
    many_to_many: :*,
    embeds_one: :*,
    embeds_many: :*,

    ## migration
    create: :*,
    create_if_not_exists: :*,
    alter: :*,
    drop: :*,
    drop_if_exists: :*,
    rename: :*,
    add: :*,
    remove: :*,
    modify: :*,
    execute: :*
  ]
]
