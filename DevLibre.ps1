Start-Process powershell -ArgumentList {
    npm cache clean --force
} -Wait

Start-Process powershell -ArgumentList {
    if (!(Test-Path "node_modules")) {
        npm ci
    }; npm run frontend
} -Wait

Start-Process powershell -ArgumentList {
    npm run backend ;
}