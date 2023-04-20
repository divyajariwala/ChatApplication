### React-Native-Base - WebMob Technologies

#### Getting started:
```
react-native init {ProjectName} --template git+ssh://git@gitlab.com:rutvik_webmobtech/react-native-new-base
```
#### Setup Theme:

- Open `src/utils/Color.js` file
- Update the colors.

#### Run-time Permission:

- Follow the installation guide for [Android](https://github.com/zoontek/react-native-permissions#android) &  [iOS](https://github.com/zoontek/react-native-permissions#ios)
- Refer the documentation for permission list to use `startPermissionRequest` method [here](https://github.com/zoontek/react-native-permissions#supported-permissions)   
- **usage** :
```
import { PermissionUtils } from 'src/utils';

    /* For Location Permission */
    PermissionUtils.requestLocationPermission().then((isGranted) => {
        //it will return true if permission granted otherwise false
        console.log('Location Permission granted: ',isGranted);
    });

    /* For Camera Permission */
    PermissionUtils.requestCameraPermission().then((isGranted) => {
        //it will return true if permission granted otherwise false
        console.log('Camera Permission granted: ',isGranted);
    });

    /* For Storage Permission */
    PermissionUtils.requestStoragePermission().then((isGranted) => {
        //it will return true if permission granted otherwise false
        console.log('Storage Permission granted: ',isGranted);
    });

    /* General method for permission if you don't want to use pre-defined methods */
    PermissionUtils.
        startPermissionRequest(
            PERMISSIONS.READ_CONTACTS, 
            'PermissionAlertTitle', 
            'PermissionAlertDescription')
        .then((isGranted) => {
            //it will return true if permission granted otherwise false
            console.log('Requested Permission granted: ',isGranted);
        });
```


