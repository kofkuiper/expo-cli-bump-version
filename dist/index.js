"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const appJsonPath = path_1.default.join(__dirname, '/app.json');
const packageJsonPath = path_1.default.join(__dirname, '/package.json');
function incrementVersion(version) {
    const parts = version.split('.');
    parts[2] = (parseInt(parts[2], 10) + 1).toString();
    return parts.join('.');
}
function incrementBuildNumber(buildNumber) {
    return (parseInt(buildNumber, 10) + 1).toString();
}
function incrementVersionCode(versionCode) {
    return versionCode + 1;
}
function updateJsonFile(filePath, updateFn) {
    fs_1.default.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${filePath}:`, err);
            return;
        }
        const json = JSON.parse(data);
        updateFn(json);
        fs_1.default.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(`Error writing ${filePath}:`, err);
                return;
            }
            console.log(`Successfully updated ${filePath}`);
        });
    });
}
updateJsonFile(appJsonPath, (appJson) => {
    // Increment expo.version
    appJson.expo.version = incrementVersion(appJson.expo.version);
    // Increment expo.ios.buildNumber
    if (appJson.expo.ios && appJson.expo.ios.buildNumber) {
        appJson.expo.ios.buildNumber = incrementBuildNumber(appJson.expo.ios.buildNumber);
    }
    // Increment android.versionCode
    if (appJson.expo.android && appJson.expo.android.versionCode) {
        appJson.expo.android.versionCode = incrementVersionCode(appJson.expo.android.versionCode);
    }
});
updateJsonFile(packageJsonPath, (packageJson) => {
    // Increment package.json version
    packageJson.version = incrementVersion(packageJson.version);
});
