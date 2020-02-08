

import { CreatePagesArgs } from 'gatsby'

export type PageCreator = (data: CreatePagesArgs) => Promise<void>

