const users = {
    get(params) {
        console.log(`${params.id} is id and ${params.action} is action`);
    }
}

export { users }