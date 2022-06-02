// GET
export type Get<T> = () => Promise<T>
export type GetByOptionalYear<T> = (
    yearId: number | null | undefined
) => Promise<T[]>
export type GetByYear<T> = (yearId: number) => Promise<T[]>
export type GetByYearAndEntityId<T> = (
    yearId: number,
    entityId: number
) => Promise<T[]>
export type GetById<T> = (id: number) => Promise<T>

// POST
export type Post<T> = (dto: Omit<T, 'Id'>) => Promise<T>
export type PostWithEmptyResponse<T> = (
    dto: Omit<T, 'Id'>,
    emptyResponse?: boolean
) => Promise<T | void>

// PUT
export type PutByIdWithEmptyResponse<T> = (
    id: number,
    dto: T,
    emptyResponse?: boolean
) => Promise<T | void>
export type PutById<T> = (id: number, dto: T) => Promise<T>
export type Put<T> = (dto: T) => Promise<T>
export type PutDtoWithYearAndEntityId<T> = (
    yearId: number,
    entityId: number,
    dto: T
) => Promise<void>

// DELETE
export type DeleteById = (id: number) => Promise<void>
export type DeleteByIdWithPrepare = (
    id: number,
    prepare: boolean
) => Promise<void>

// Attachments
export type PostAttachment<T> = (id: number, attachment: FormData) => Promise<T>
export type GetAttachment = (id: number, attachmentId: number) => Promise<Blob>
export type DeleteAttachment = (
    id: number,
    attachmentId: number
) => Promise<void>
