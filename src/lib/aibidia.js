function postOrPut2(vueInstance, obj, idField, postPromise, putPromise) {
    return new Promise((resolve, reject) => {
        if (obj[idField]) {
            putPromise()
                .then(resp => {
                    resolve(resp)
                })
                .catch(error => {
                    reject(error)
                })
        } else if (!obj.isCreating) {
            console.log('Object POSTing not in progress, lets POST!')
            vueInstance.$set(obj, 'isCreating', true)
            postPromise()
                .then(resp => {
                    obj.isCreating = false
                    vueInstance.$set(obj, idField, resp.data[idField])
                    resolve(resp)
                })
                .catch(error => {
                    obj.isCreating = false
                    reject(error)
                })
        } else if (!obj.updateScheduled) {
            vueInstance.$set(obj, 'updateScheduled', true)
            console.log('Already POSTing, schedule re-try...')
            setTimeout(() => {
                obj.updateScheduled = false
                console.log('trying again')
                postOrPut2(vueInstance, obj, idField, postPromise, putPromise)
            }, 500)
        }
    })
}

export { postOrPut2 }
