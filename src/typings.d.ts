// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;

interface NodeRequireFunction {
  (id: string): any;
}

interface NodeRequire extends NodeRequireFunction {
  cache: any;
  extensions: any;
  main: NodeModule;
  resolve(id: string): string;
}

declare var require: NodeRequire;
