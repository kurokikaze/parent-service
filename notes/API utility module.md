
 Run 'yarn start --port 8500'
2. Go to http://single-spa-playground.org
3. Run the following in the browser console:
```
window.importMapOverrides.addOverride('@T-Systems/FleetAPI', '8500')
System.import('@T-Systems/FleetAPI')
``` 

```
 -i https://stoplight.io/api/v1/projects/spacetraders/spacetraders/nodes/reference/SpaceTraders.json?fromExportButton=true&snapshotType=http_service&deref=optimizedBundle -o packages/spacetraders-sdk -g typescript-axios  --additional-properties=npmName="spacetraders-sdk"  --additional-properties=npmVersion="2.0.0"  --additional-properties=supportsES6=true  --additional-properties=withSeparateModelsAndApi=true  --additional-properties=modelPackage="models" --additional-properties=apiPackage="api"
```

### TS1056: Accessors are only available when targeting ECMAScript 5 and higher.

Необходимо добавить `target`  в `compilerOptions` конфига utility-модуля.