# Migración a Angular 20

La plantilla usa Angular 20 con `bootstrapApplication`, componentes standalone y control de flujo `@if`. Conserva las rutas, la autenticación MSAL, los idiomas, el service worker y las salidas `dist/prod` y `dist/uat`.

## Ejecutar

Con Node.js 20.19.0:

```powershell
$env:PATH="C:\Users\Ext_Miguel_Retamoso\Documents\PORTABLES\node-v20.19.0-win-x64\node-v20.19.0-win-x64;$env:PATH"
npm ci
npm run serve
```

| Script | Dirección | Configuración |
| --- | --- | --- |
| `start`, `start:ng`, `serve:local` | `http://localhost:4200/` | local |
| `serve` | `https://localhost:4200/` | local |
| `serve:lab` | `https://localhost:4200/` | lab |
| `serve:uat` | `http://localhost:4200/` | uat |
| `serve:prod` | `http://localhost:4200/` | production |

`serve` y `serve:lab` usan `src/certs/key.pem` y `src/certs/cert.pem`. El certificado incluido tiene `localhost` como nombre DNS. Si la máquina no confía en la CA local que lo emitió, se puede crear otro con `npm run create-localhost-certificate` (requiere `mkcert`).

En `localhost`, MSAL usa el origen actual como URL de retorno para que funcionen las variantes HTTP y HTTPS. El registro de la aplicación en Microsoft Entra debe incluir el origen local que se vaya a utilizar.

`build-local`, `build-uat` y `build-prod` siguen disponibles. UAT genera `dist/uat` y producción genera `dist/prod`. El archivo `environment.uat.ts` referenciado por la configuración anterior no existía; por eso UAT usa actualmente `environment.prod.ts`. Hay que sustituir ese reemplazo cuando se disponga de valores propios de UAT. `serve:uat` ya usaba valores de producción en la configuración original.

## Mapa de opciones anteriores

El [angular.json](angular.json) conserva como comentarios las claves anteriores junto a su equivalente actual. Los cambios principales son:

| Antes | Angular 20 |
| --- | --- |
| `@angular-devkit/build-angular:browser` | `@angular-devkit/build-angular:application` |
| `main` | `browser` |
| `browserTarget` | `buildTarget` |
| `styleext` | `style` |
| `serviceWorker: true` + `ngswConfigPath` | `serviceWorker: "ngsw-config.json"` |
| `polyfills.ts` con `zone.js/dist/zone` | `polyfills: ["zone.js"]` |
| `--prod` | `--configuration=production` |
| `ngcc` en `postinstall` | No se necesita en Angular 20 |
| `ng e2e` con Protractor | `playwright test` con el servidor local |
| Flex Layout (`fxLayout`, `fxFlex`) | Clases CSS de layout |
| `*ngIf` | `@if` |

El antiguo `start` invocaba `start-dotnet.js`, un archivo que no existe en este repositorio. Ahora inicia Angular directamente en el puerto 4200. El antiguo target `server` apuntaba a `AppServerModule`, que tampoco existe. El comando `npm run e2e` se conserva con Playwright; en Windows usa Chrome instalado y en otros sistemas se instala Chromium con `npx playwright install chromium`.

La canalización de Azure usa ahora Node 20.19.0 y conserva la publicación de ambos directorios bajo `dist`.
