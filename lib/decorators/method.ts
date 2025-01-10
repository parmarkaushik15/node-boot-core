import { HttpDecorator, HttpVerb, IHttpRoute, IMethodMetadata } from "./types";

/**
 * All anotations is used for configure All method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function All(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes("all", path);
}

/**
 * Checkout anotations is used for configure Checkout method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Checkout(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.CHECKOUT, path);
}

/**
 * Copy anotations is used for configure Copy method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Copy(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.COPY, path);
}

/**
 * Delete anotations is used for configure Delete method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Delete(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.DELETE, path);
}

/**
 * Get anotations is used for configure Get method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Get(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.GET, path);
}

/**
 * Head anotations is used for configure Head method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Head(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.HEAD, path);
}

/**
 * Lock anotations is used for configure Lock method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Lock(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.LOCK, path);
}

/**
 * Merge anotations is used for configure Merge method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Merge(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.MERGE, path);
}

/**
 * Mkactivity anotations is used for configure Mkactivity method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Mkactivity(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.MKACTIVITY, path);
}

/**
 * Mkcol anotations is used for configure Mkcol method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Mkcol(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.MKCOL, path);
}

/**
 * Move anotations is used for configure Move method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Move(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.MOVE, path);
}

/**
 * MSearch anotations is used for configure MSearch method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function MSearch(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.MSEARCH, path);
}

/**
 * Notify anotations is used for configure Notify method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Notify(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.NOTIFY, path);
}

/**
 * Options anotations is used for configure Options method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Options(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.OPTIONS, path);
}

/**
 * Patch anotations is used for configure Patch method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Patch(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.PATCH, path);
}

/**
 * Post anotations is used for configure Post method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Post(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.POST, path);
}

/**
 * Purge anotations is used for configure Purge method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Purge(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.PURGE, path);
}

/**
 * Put anotations is used for configure Put method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Put(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.PUT, path);
}

/**
 * Report anotations is used for configure Report method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Report(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.REPORT, path);
}

/**
 * Search anotations is used for configure Search method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Search(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.SEARCH, path);
}

/**
 * Subscribe anotations is used for configure Subscribe method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Subscribe(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.SUBSCRIBE, path);
}

/**
 * Trace anotations is used for configure Trace method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Trace(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.TRACE, path);
}

/**
 * Unlock anotations is used for configure Unlock method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Unlock(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.UNLOCK, path);
}

/**
 * Unsubscribe anotations is used for configure Unsubscribe method the Node Boot Application.
 * @param {string} path - define the path.
 */
export function Unsubscribe(
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return helperForRoutes(HttpVerb.UNSUBSCRIBE, path);
}

function helperForRoutes(
  httpVerb: HttpDecorator,
  path?: string | RegExp
): MethodDecorator & PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    let newPath: string | RegExp;
    if (path === undefined) {
      newPath = "";
    } else if (path instanceof RegExp) {
      newPath = addForwardSlashToFrontOfRegex(path);
    } else {
      newPath = "/" + path;
    }
    addHttpVerbToMethodMetadata(target, propertyKey, httpVerb, newPath);
  };
}

function addForwardSlashToFrontOfRegex(regex: RegExp): RegExp {
  if (regex.toString().charAt(1) === "^") {
    return RegExp("/" + regex.toString().slice(2).replace(/\/$/, ""));
  } else {
    return new RegExp("/.*" + regex.toString().slice(1).replace(/\/$/, ""));
  }
}

export function addHttpVerbToMethodMetadata(
  target: Object,
  metadataKey: any,
  httpDecorator: HttpDecorator,
  path: string | RegExp
): void {
  let metadata: IMethodMetadata | undefined = Reflect.getOwnMetadata(
    metadataKey,
    target
  );
  if (!metadata) {
    metadata = {};
  }
  if (!metadata.httpRoutes) {
    metadata.httpRoutes = [];
  }
  const newArr: IHttpRoute[] = [
    {
      httpDecorator,
      path,
    },
  ];
  newArr.push(...metadata.httpRoutes);
  metadata.httpRoutes = newArr;
  Reflect.defineMetadata(metadataKey, metadata, target);
}
