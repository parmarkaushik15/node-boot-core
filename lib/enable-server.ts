import "reflect-metadata";
import express = require('express');
import {
  Router,
} from "express";
import PropertiesReader = require("properties-reader");
import * as fs from "fs";
import {
  classMetadataKey,
  createClassDecorator,
  DependenciesMapping,
  IClassMetadata,
  IRouterAndPath,
  RouterLib,
} from "./decorators/types";
import {
  checkDependency,
  dir,
  getPropertiesData,
  getRouter,
  listDirectories,
  print,
  readFiles,
} from "./util/util";
import dependencyManager from "./util/dependency-manager";
import useragent = require("express-useragent");
import requestIp = require("request-ip");
import http = require('http');

/**
 * EnableServer anotations is used for generate the server
 */
export const EnableServer = createClassDecorator(
  (constructor, ...CtorArgs: any[]) => {
    const instance: any = new constructor(...CtorArgs);
    let app: any = null;
    let properties: any = null;
    const globalProperties: any = global;
    const run = async (socket:any) => {
      Object.assign(global, { app: app });
      Object.assign(global, { properties: properties });
      Object.assign(global, { dir: dir });
      Object.assign(global, { socketIO: socket });
      let object:any = { app }
      if (globalProperties && globalProperties.socketStatus) {
        object.socketIO = socket;
      }
      let actuatorApp = await checkDependency('node-boot-actuator', 'enableStatus', { app, socket, properties })
      if (actuatorApp) {
        app = actuatorApp;
      }
      app.get('/return-status/:statusCode', (req: any, res: any) =>
        res.sendStatus(req.params.statusCode),
      );
      instance["main"].call(this, object);
      const src = getPropertiesData(properties, "source.dir", "src");
      const urlPrefix = getPropertiesData(properties, "api.prefix", "");
      const allFiles = listDirectories(`${dir}/${src}/`);
      const controllerInstances: any[] = await readFiles(allFiles);
      const routerLibrary: RouterLib = Router;
      
      controllerInstances.forEach((item: any) => {
        if (item.controller) {
          const prototype: any = Object.getPrototypeOf(item.controller);
          const controllerMetadata: IClassMetadata | undefined =
            Reflect.getOwnMetadata(classMetadataKey, prototype);
          if (controllerMetadata) {
            const routerAndPath: IRouterAndPath | null = getRouter(
              routerLibrary,
              item.controller
            );
            if (routerAndPath) {
              app.use(urlPrefix + routerAndPath.basePath, routerAndPath.router);
            }
            dependencyManager.set(item.name, item.controller);
            DependenciesMapping.push({
              key: item.name,
              value: item.controller,
            });
          }
          
        }
      });
    };

    const init = () => {
      app = express();
      if (app) {
        app.use(useragent.express());
        app.use(requestIp.mw());
        const port = getPropertiesData(properties, "server.port", 3000);
        const server = http.createServer(app);
        let socket: any = null;
        const socketio = require("socket.io");
        socket = socketio(server, {
          pingTimeout: 30000,
          pingInterval: 25000,
          cors: {
            origin: '*',
          }
        });
        
        server.listen(port, () => {
          console.log("Application is running with port: ", port);
          run(socket);
        });
      }
    };
    
    let mainStatus = false;
    Object.getOwnPropertyNames(instance).forEach((key) => {
      if (key == "main") {
        mainStatus = true;
      }
    });
    
    if (!mainStatus) {
      throw new Error("Main method is required");
    } else {
      const fileName = `${dir}/application.properties`;
      if (fs.existsSync(fileName)) {
        properties = PropertiesReader(fileName, "utf-8").getAllProperties();
        print();
        init();
        return instance;
      } else {
        throw new Error("application.properties file is required");
      }
    }
  }
);
