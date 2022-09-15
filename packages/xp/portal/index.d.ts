import type { ByteSource, XOR } from "@item-enonic-types/utils";
import type { WrapDataInContent } from "@item-enonic-types/utils/content";
import type { Site } from "@item-enonic-types/lib-xp-content";

declare global {
  interface XpLibraries {
    "/lib/xp/portal": typeof import("./index");
  }
}

/**
 * This function returns the component corresponding to the current execution context. It is meant to be called
 * from a layout or part controller.
 */

export function getComponent<Config = unknown>(): Component<Config>;

/**
 * his function returns the content corresponding to the current execution context. It is meant to be called from a
 * page, layout or part controller
 */
export function getContent<Data, PageConfig = unknown>(): WrapDataInContent<
  Data,
  {
    page: Component<PageConfig>;
  }
>;

/**
 * This function returns the id provider key corresponding to the current execution context.
 */
export function getIdProviderKey(): string | null;

/**
 * This function returns a JSON containing multipart items.
 */
export function getMultipartForm(): Record<string, MultipartItem | ReadonlyArray<MultipartItem>>;

/**
 * This function returns a JSON containing a named multipart item.
 */
export function getMultipartItem(name: string, index?: number): MultipartItem | undefined;

/**
 * This function returns a data-stream for a named multipart item.
 */
export function getMultipartStream(name: string, index?: number): ByteSource | undefined;

/**
 * This function returns the multipart item data as text.
 */
export function getMultipartText(name: string, index?: number): string | undefined;

/**
 * This function returns the parent site of the content corresponding to the current execution context. It is meant
 * to be called from a page, layout or part controller.
 */
export function getSite(): Site;

/**
 * This function returns the site configuration for this app in the parent site of the content corresponding to the
 * current execution context. It is meant to be called from a page, layout or part controller.
 */
export function getSiteConfig(): XP.SiteConfig;

/**
 * This function generates a URL pointing to an ID provider.
 */
export function idProviderUrl(params: IdProviderUrlParams): string;

/**
 * This function generates a URL to an image placeholder.
 */
export function imagePlaceholder(params: ImagePlaceHolderParams): string;

/**
 * This function generates a URL pointing to a static file.
 */
export function assetUrl(params: AssetUrlParams): string;

/**
 * This function generates a URL pointing to an attachment.
 */
export function attachmentUrl(params: AttachmentUrlParams): string;

/**
 * This function generates a URL pointing to a component.
 */
export function componentUrl(params: ComponentUrlParams): string;

/**
 * This function generates a URL pointing to a service.
 */
export function serviceUrl(params: ServiceUrlParams): string;

/**
 * This function generates a URL pointing to an image.
 */
export function imageUrl(params: ImageUrlParams): string;

/**
 * This function generates a URL pointing to the login function of an ID provider.
 */
export function loginUrl(params: LoginUrlParams): string;

/**
 * This function generates a URL pointing to the logout function of the application corresponding to the current user.
 */
export function logoutUrl(params: LogoutUrlParams): string;

/**
 * This function generates a URL pointing to a page.
 */
export function pageUrl(params: PageUrlParams): string;

/**
 * This function generates a URL.
 */
export function url(params: UrlParams): string;

/**
 * This function replaces abstract internal links contained in an HTML text by generated URLs.
 *
 * When outputting processed HTML in Thymeleaf, use attribute `data-th-utext="${processedHtml}"`.
 */
export function processHtml(params: ProcessHtmlParams): string;

/**
 * This function sanitizes an HTML string by stripping all potentially unsafe tags and attributes.
 *
 * HTML sanitization can be used to protect against cross-site scripting (XSS) attacks by sanitizing any HTML code
 * submitted by a user.
 */
export function sanitizeHtml(html: string): string;

export type Params = { readonly [key: string]: string | ReadonlyArray<string> | undefined };

export interface Component<Config = unknown> {
  readonly path: string;
  readonly type: string;
  readonly descriptor: string;
  readonly config: Config;
  readonly regions?: Record<string, Region>;
}

export interface Region {
  components: Array<Component>;
  name: string;
}

export interface ByKey {
  readonly key: string;
}

export interface ByPath {
  readonly path: string;
}

export interface ById {
  readonly id: string;
}

interface ByComponent {
  readonly component?: string;
}

export interface IdProviderUrlParams {
  idProvider?: string;
  contextPath?: string;
  type?: "server" | "absolute";
  params?: Params;
}

export interface ImagePlaceHolderParams {
  width: number;
  height: number;
}

export interface AssetUrlParams {
  path: string;
  application?: string;
  type?: "server" | "absolute";
  params?: Params;
}

export type AttachmentUrlParams = XOR<ById, ByPath> & {
  name?: string;
  label?: string; // source
  download?: boolean;
  params?: Params;
  type?: "server" | "absolute";
};

export type ComponentUrlParams = XOR<ByComponent, XOR<ById, ByPath>> & {
  type?: "server" | "absolute";
  params?: Params;
};

export type ImageScale =
  | `block(${number},${"" | " "}${number})`
  | `height(${number})`
  | `max(${number})`
  | `square(${number})`
  | `wide(${number},${"" | " "}${number})`
  | `width(${number})`;

export type ImageUrlParams = XOR<ById, ByPath> & {
  scale: ImageScale;
  quality?: number;
  background?: string;
  format?: string;
  filter?: string;
  type?: "server" | "absolute";
  params?: Params;
};

export type PageUrlParams = XOR<ById, ByPath> & {
  type?: "server" | "absolute";
  params?: Params;
};

export interface LoginUrlParams {
  idProvider?: string;
  redirect?: string;
  contextPath?: string;
  type?: "server" | "absolute";
  params?: Params;
}

export interface LogoutUrlParams {
  redirect?: string;
  contextPath?: string;
  type?: "server" | "absolute";
  params?: Params;
}

export interface ServiceUrlParams {
  service: string;
  application?: string;
  type?: "server" | "absolute" | "websocket";
  params?: Params;
}

export interface UrlParams {
  path?: string;
  type?: "server" | "absolute";
  params?: Params;
}

export interface ProcessHtmlParams {
  /**
   * Html value string to process.
   */
  value: string;

  /**
   * URL type. Either server (server-relative URL) or absolute.
   */
  type?: "server" | "absolute";

  /**
   * A comma-separated list of image widths. If this parameter is provided, all <img> tags will have an additional
   * srcset attribute with image URLs generated for specified widths.
   * @since XP 7.7.0
   */
  imageWidths?: Array<number>;

  /**
   * This string is used to set img[sizes].
   * E.g a value can be '(max-width: 960px) 600px'
   * @since XP 7.8.0
   */
  imageSizes?: string;
}

export interface MultipartItem {
  readonly name: string;
  readonly fileName?: string;
  readonly contentType?: string;
  readonly size: number;
}