import fs from 'fs'
import path from 'path'

type ExpoAppJson = {
    expo: {
        version: string
        ios: { buildNumber: string }
        android: { versionCode: number }
    }
}

type PackageJson = {
    version: string
}

const appJsonPath = path.join(__dirname, '/app.json')
const packageJsonPath = path.join(__dirname, '/package.json')

function incrementVersion(version: string) {
    const parts = version.split('.')
    parts[2] = (parseInt(parts[2], 10) + 1).toString()
    return parts.join('.')
}

function incrementBuildNumber(buildNumber: string) {
    return (parseInt(buildNumber, 10) + 1).toString()
}

function incrementVersionCode(versionCode: number) {
    return versionCode + 1
}

function updateJsonFile(filePath: string, updateFn: Function) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${filePath}:`, err)
            return
        }

        const json = JSON.parse(data)
        updateFn(json)

        fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(`Error writing ${filePath}:`, err)
                return
            }
            console.log(`Successfully updated ${filePath}`)
        })
    })
}

updateJsonFile(appJsonPath, (appJson: ExpoAppJson) => {
    // Increment expo.version
    appJson.expo.version = incrementVersion(appJson.expo.version)

    // Increment expo.ios.buildNumber
    if (appJson.expo.ios && appJson.expo.ios.buildNumber) {
        appJson.expo.ios.buildNumber = incrementBuildNumber(
            appJson.expo.ios.buildNumber
        )
    }

    // Increment android.versionCode
    if (appJson.expo.android && appJson.expo.android.versionCode) {
        appJson.expo.android.versionCode = incrementVersionCode(
            appJson.expo.android.versionCode
        )
    }
})

updateJsonFile(packageJsonPath, (packageJson: PackageJson) => {
    // Increment package.json version
    packageJson.version = incrementVersion(packageJson.version)
})