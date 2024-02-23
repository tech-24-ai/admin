const checkPermission = (permission) => {
    let status = false
    if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'))
        const permissions = user.permissions

        if (permissions) {
            permissions.forEach(element => {
                if (element.permission.code === permission) {
                    status = true
                }
            });
        }
    }
    return status
}

const checkMainPermission = (permissions) => {
    let havePermission = false
    permissions.forEach(userPermission => {
        if (checkPermission(userPermission)) {
            havePermission = true
        }
    });
     return havePermission
    //return true
}

export const PermissionHelper = {
    checkPermission,
    checkMainPermission
}