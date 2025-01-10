import {
  Application,
  IRouter,
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import * as fs from "fs";
import { classMetadataKey, componentMetadataKey, congurationMetadataKey, Controller, ErrorMiddleware, IClassMetadata, IComponentMetadata, IConfigurationMetadata, IHttpRoute, IMethodMetadata, IRepositoryMetadata, IRouterAndPath, IServiceMetadata, repositoryMetadataKey, RouterLib, serviceMetadataKey } from "../decorators/types";
import * as path from "path";
import PropertiesReader = require("properties-reader");
export function listDirectories(root: any): any {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((file: any) => {
    return file.isDirectory()
      ? listDirectories(path.join(root, file.name))
      : path.join(root, file.name);
  });
}
export const dir = process.cwd();
export const wrapErrorMiddleware = (
  errorMiddleware: ErrorMiddleware,
  requestHandler: RequestHandler
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      requestHandler(req, res, next);
    } catch (error) {
      errorMiddleware(error, req, res, next);
    }
  };
};
export const print = () => {
  console.log("===================================================");
  console.log(" ========       ======       ======     ========== ");
  console.log(" ==      ==   ==      ==   ==      ==       ==     ");
  console.log(" ========     ==      ==   ==      ==       ==     ");
  console.log(" ==      ==   ==      ==   ==      ==       ==     ");
  console.log(" ========       ======       ======         ==     ");
  console.log("===================================================");
};
export const getRouter = (
  routerLibrary: RouterLib,
  controller: Controller
): IRouterAndPath | null => {
  const prototype: any = Object.getPrototypeOf(controller);
  const classMetadata: IClassMetadata | undefined = Reflect.getOwnMetadata(
    classMetadataKey,
    prototype
  );
  if (!classMetadata) {
    return null;
  }
  const {
    basePath,
    childControllers: children,
    errorMiddlewares: classErrorMiddleware,
    middlewares: classMiddleware,
    options,
    wrapper: classWrapper,
  }: IClassMetadata = classMetadata;
  if (!basePath) {
    return null;
  }
  const router: IRouter = routerLibrary(options);
  if (classMiddleware) {
    router.use(classMiddleware);
  }
  let members: any = Object.getOwnPropertyNames(controller);
  members = members.concat(Object.getOwnPropertyNames(prototype));
  members.forEach((member: any) => {
    const methodMetadata: IMethodMetadata | undefined = Reflect.getOwnMetadata(
      member,
      prototype
    );
    if (methodMetadata) {
      const {
        httpRoutes,
        middlewares,
        errorMiddlewares,
        wrapper,
      }: IMethodMetadata = methodMetadata;
      let callBack: (...args: any[]) => any = (...args: any[]): any => {
        return controller[member](...args);
      };
      if (classWrapper) {
        callBack = classWrapper(callBack);
      }
      if (wrapper) {
        callBack = wrapper(callBack);
      }
      if (errorMiddlewares) {
        errorMiddlewares.forEach((errorMiddleware: ErrorMiddleware) => {
          callBack = wrapErrorMiddleware(errorMiddleware, callBack);
        });
      }
      if (httpRoutes) {
        httpRoutes.forEach((route: IHttpRoute) => {
          const { httpDecorator, path }: IHttpRoute = route;
          if (middlewares) {
            router[httpDecorator](path, middlewares, callBack);
          } else {
            router[httpDecorator](path, callBack);
          }
        });
      }
    }
  });
  if (children) {
    children.forEach((child: Controller) => {
      const childRouterAndPath: IRouterAndPath | null = getRouter(
        routerLibrary,
        child
      );
      if (childRouterAndPath) {
        router.use(childRouterAndPath.basePath, childRouterAndPath.router);
      }
    });
  }
  if (classErrorMiddleware) {
    router.use(classErrorMiddleware);
  }
  return {
    basePath,
    router,
  };
};
async function content(path: any) {
  return await fs.readFileSync(path, 'utf8');
}
export const readFiles = async (allFiles: any[]) => {
  const controllerInstances: any = [];
  for (const item of allFiles) {
    if (item.indexOf(".ts") != -1 || item.indexOf(".js") != -1) {
      if (item.indexOf(".js.map") == -1) {
        const text = await content(item);
        if (text.indexOf("@Controller") != -1
          || text.indexOf("@Repository") != -1
          || text.indexOf("@Service") != -1
          || text.indexOf("@Component") != -1
          || text.indexOf(".Controller)") != -1
          || text.indexOf(".Repository)") != -1
          || text.indexOf(".Service)") != -1
          || text.indexOf(".Component)") != -1) {
          const fileData = await import(item);
          for (const name of Object.keys(fileData)) {
            const controller = (fileData as any)[name];
            if (typeof controller === "function") {
              const controllerMetadata: IClassMetadata | undefined =
                Reflect.getOwnMetadata(classMetadataKey, Object.getPrototypeOf(new controller()));
              if (controllerMetadata) {
                controllerInstances.push({
                  name: name,
                  controller: new controller(),
                  file: item,
                });
              }

              const componentMetadata: IComponentMetadata | undefined =
                Reflect.getOwnMetadata(componentMetadataKey, Object.getPrototypeOf(new controller()));
              if (componentMetadata) {
                controllerInstances.push({
                  name: name,
                  controller: new controller(),
                  file: item,
                });
              }

              const serviceMetadata: IServiceMetadata | undefined =
                Reflect.getOwnMetadata(serviceMetadataKey, Object.getPrototypeOf(new controller()));
              if (serviceMetadata) {
                controllerInstances.push({
                  name: name,
                  controller: new controller(),
                  file: item,
                });
              }

              const repositoryMetadata: IRepositoryMetadata | undefined =
                Reflect.getOwnMetadata(repositoryMetadataKey, Object.getPrototypeOf(new controller()));
              if (repositoryMetadata) {
                controllerInstances.push({
                  name: name,
                  controller: new controller(),
                  file: item,
                });
              }
            }
          }
        }
      }
    }
  }
  return controllerInstances;
};

export const readConfigurationFiles = async (allFiles: any[]) => {
  const configurationInstances: any = [];
  for (const item of allFiles) {
    if (item.indexOf(".ts") != -1 || item.indexOf(".js") != -1) {
      if (item.indexOf(".js.map") == -1) {
        const text = await content(item);
        if (text.indexOf("@Configuration") != -1 || text.indexOf(".Configuration)") != -1) {
          const fileData = await import(item);
          for (const name of Object.keys(fileData)) {
            const file = (fileData as any)[name];
            if (typeof file === "function") {
              const configurationMetadata: IConfigurationMetadata | undefined =
                Reflect.getOwnMetadata(congurationMetadataKey, Object.getPrototypeOf(new file()));
              if (configurationMetadata) {
                configurationInstances.push({
                  name: name,
                  controller: new file(),
                  file: item,
                });
              }
            }
          }
        }
      }
    }
  }
  return configurationInstances;
};
export const readProperties = () => {
  const fileName = `${process.cwd()}/application.properties`;
  if (fs.existsSync(fileName)) {
    return PropertiesReader(
      fileName,
      "utf-8"
    ).getAllProperties();
  }
}
export const getPropertiesData = (properties: any, key: any, fix: any) => {
  return properties && properties[key]
    ? properties[key]
    : fix;
};

export const createRandomCode = async (length: number = 6) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const checkDependency = async (dependencyName: any, functionName: any, target:any) => {
  const path = `${dir}/node_modules/${dependencyName}`;
  try {
    const dependency = require(path);
    if (typeof dependency[functionName] === 'function') {
      return await dependency[functionName](target);
    }
  } catch (error) {
    return null;
  }
}
