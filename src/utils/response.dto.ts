export class ResponseDto<T> {
    data: T;
    message: string;
    status: boolean;
    // pagination?: Pagination;
    constructor(
      data: T,
      message: string,
      status: boolean,
    //   pagination?: Pagination
    ) {
      this.data = data;
      this.message = message;
      this.status = status;
    //   this.pagination = pagination;\
    }
  }
  
//   interface Pagination {
//     totalCount: number;
//     totalPages: number;
//     currentPage: number;
//     hasNextPage: boolean;
//     hasPreviousPage: boolean;
//     pageSize: number;
//     limit: number; 
//   }