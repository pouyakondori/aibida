/** DTO which we get from API */
export interface Resume {
    ResumeId: number // int32
    ResumeCode: string
    ResumeName: string
    SortOrder: number // int32
}

/** Front maps dto to this object */
export interface ResumeExtended {
    User: string | null
}
