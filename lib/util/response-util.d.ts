import { Response } from "express";
export declare class HttpResponse {
    static HandleAllError: (response: Response<any, Record<string, any>>, error: any) => Response<any, Record<string, any>>;
    static InternalServerError: (response: Response<any, Record<string, any>>, error: string | Error) => Response<any, Record<string, any>>;
    static NotFound: (response: Response<any, Record<string, any>>, body?: any) => Response<any, Record<string, any>>;
    static Forbidden: (response: Response<any, Record<string, any>>, message?: string) => Response<any, Record<string, any>>;
    static UnAuthenticated: (response: Response<any, Record<string, any>>, message?: string) => Response<any, Record<string, any>>;
    static ApiUnAuthenticated: (response: Response<any, Record<string, any>>, message?: string) => Response<any, Record<string, any>>;
    static BadRequest: (response: Response<any, Record<string, any>>, body?: any) => Response<any, Record<string, any>>;
    static Ok: (response: Response<any, Record<string, any>>, message?: string | undefined, body?: any) => Response<any, Record<string, any>>;
}
