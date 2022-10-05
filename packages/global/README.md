# Global types for Enonic XP

> **Note** There is also an [official package for Global types for XP](https://www.npmjs.com/package/@enonic-types/global).

This library provides backwards compatibility for the old [enonic-types](https://www.npmjs.com/package/enonic-types) package
while moving to the [new types provided by Enonic](https://www.npmjs.com/org/enonic-types).

## Contents

The following global types:

- `XP.Controller`
- `XP.Request`
  - `XP.ErrorRequest`
  - `XP.CustomSelectorServiceRequest`
  - `XP.CustomSelectorServiceRequestParams`
- `XP.Response`
  - `XP.WebSocketResponse`
  - `XP.CustomSelectorServiceResponse`
  - `XP.CustomSelectorServiceResponseHit`
- `XP.MacroContext`
- `XP.WebSocketEvent`
   - `XP.OpenWebSocketEvent`
   - `XP.MessageWebSocketEvent`
   - `XP.CloseWebSocketEvent`

## Use

To use these global types you need to update the `types` field in your *tsconfig.json* with this library.

```diff
{
  "baseUrl": "./",
  "paths": {
    "/lib/xp/*": ["node_modules/@enonic-types/lib-*"]
  },
+  "types": [
+    "@item-enonic-types/global"
+  ]
}
```