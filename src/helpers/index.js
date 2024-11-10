
export const transformSendedMessage = (message) => {
    return {
        type: 'human',
        content: message,
        date: new Date(),
    }
}
