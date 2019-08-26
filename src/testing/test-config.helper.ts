/**
 * Created by glenn on 13.08.19.
 */

import { TestBed } from '@angular/core/testing';

/**
 *
 * @see https://github.com/thymikee/jest-preset-angular#removing-empty-lines-and-white-spaces-in-component-snapshots
 */
type CompilerOptions = Partial<{
  providers: any[];
  useJit: boolean;
  preserveWhitespaces: boolean;
}>;
export type ConfigureFn = (testBed: typeof TestBed) => void;

export const configureTests = (configure: ConfigureFn, compilerOptions: CompilerOptions = {}) => {
  const compilerConfig: CompilerOptions = {
    preserveWhitespaces: false,
    ...compilerOptions
  };

  const configuredTestBed = TestBed.configureCompiler(compilerConfig);

  configure(configuredTestBed);

  return configuredTestBed.compileComponents().then(() => configuredTestBed);
};
