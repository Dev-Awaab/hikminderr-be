export type CreateCourseRequest = {
  title: string;
  code: string;
  venue: string;
  lecturer: string;
  status: string;
  id: string;
  start?: string;
  end?: string;
};

export type UpdateCourseRequest = {
  title?: string;
  code?: string;
  venue?: string;
  lecturer?: string;
  status?: string;
  start?: string;
  end?: string;
  id: string;
};
