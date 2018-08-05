let sleep = delay => {
    return new Promise((resolve, rej) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}

module.exports = sleep