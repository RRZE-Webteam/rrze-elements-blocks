export {};

declare module "@wordpress/blocks" {
  export type BlockAttributes = Record<
    string,
    import("@wordpress/blocks").BlockAttribute
  >;
  export type BlockInstance<
    Attributes extends Record<string, unknown> = Record<string, unknown>,
  > = import("@wordpress/blocks").Block<Attributes>;
}
