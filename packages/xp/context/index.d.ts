import type { PrincipalKey } from "@item-enonic-types/lib-xp-auth";

declare global {
  interface XpLibraries {
    "/lib/xp/context": typeof import("./index");
  }
}

/**
 * Returns the current context
 */
export function get<Attributes extends ContextAttributes>(): Context<Attributes>;

/**
 * Runs a function within a custom context, for instance the one returned by the get() function call.
 * Commonly used when accessing repositories, or to override current users permissions.
 */
export function run<Result, Attributes extends ContextAttributes>(
  runContext: RunContext<Attributes>,
  f: () => Result
): Result;

export type ContextAttributes = Record<string, string | boolean | number>;

export interface Context<Attributes extends ContextAttributes | undefined> {
  /**
   * Repository context.
   */
  readonly repository: string;

  /**
   * Branch context.
   */
  readonly branch: string;

  /**
   * Info about the current user
   */
  readonly authInfo: AuthInfo;

  /**
   * Custom attributes
   */
  readonly attributes: Attributes;
}

export interface AuthInfo {
  readonly user: User;

  /**
   * Roles or group principals
   */
  readonly principals: ReadonlyArray<PrincipalKey>;
}

export interface User {
  readonly type: string;
  readonly key: string;
  readonly displayName: string;
  readonly disabled: boolean;
  readonly email: string;
  readonly login: string;
  readonly idProvider: string;
}

export interface RunContext<Attributes extends ContextAttributes | undefined> {
  /**
   * Repository context.
   */
  repository?: string;

  /**
   * Branch context.
   */
  branch?: string;

  /**
   * Specify a valid user/idprovider combination
   */
  user?: {
    /**
     * User
     */
    login: string;

    /**
     * ID provider
     */
    idProvider?: string;
  };

  /**
   * Roles or group principals applicable for current user
   */
  principals?: ReadonlyArray<PrincipalKey>;

  /**
   * Custom attributes
   */
  attributes?: Attributes;
}