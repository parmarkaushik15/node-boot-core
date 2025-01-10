## What is node-boot?
Node Boot is a framework for REST API management and it is similar to Spring boot. Node Boot is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript and combines elements of OOP (Object Oriented Programming).

Node boot makes use of robust HTTP Server frameworks is Express. This gives developers the freedom to use the third-party modules which are available for the platform.

## What can I do with it?
You can simplify make your Node.JS web application with Typescript by using Dependency Injection, and RESTful apis throughout simple annotations.

## What about this library?
This library is core for the Node Boot Framework. When you want to use this framework you need to import the core liberary to access the several anotations. Like EnableServer, Controller, Service, Repository, Component, Autowired. Framework is interally used the Dependency injection concept to inject your class without making object.

## Which annotations are available?

### @EnableServer

Declares a class to be automatically instantiated by Node Boot Framework. It will intialize server the automatically. For the run this framework main() is mandatory to initalize the framework. Once your framework intialize you will get the express server application object in main method. For the setup server port create the ``application.properties`` file in folder and set the server.port properties to intiate the server port.

```typescript

@EnableServer
class MyClass {
    public main = ({ app }) => {
        // start your work
    };
}

```

### @Controller

Declares a class to be automatically instantiated as contorller by Node Boot Framework. It will intialize routes whatever you write in controller the automatically. Developer does not required the externally router setup required for this framework. If developer wants to setup the base route path just go to ``application.properties`` file and setup api.prefix properties and set the base route path. 

```typescript

@Controller("home")
class MyClass {

}

```

## Consulting
With official support, you can get expert help straight from Node Boot core team. We provide dedicated technical and team augmentation.

## Support
Node Boot is an MIT-licensed open source project. It can grow thanks to the support from the amazing team members.
<!-- 
## Stay in touch

* Author - [<a href="https://codequality.us" target="_blank">Codequality Technologies</a>] -->

## License

Node Boot is MIT licensed.