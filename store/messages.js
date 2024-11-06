import messages from '../db/mock-db-messages.js'

const getMessagesForUser = toUserId =>
  messages.filter(message => message.toUserId === toUserId)

const add = message => {
  message.id = messages.length + 1
  message.dateTime = Date.now()
  messages.push(message)
}

export default { add, getMessagesForUser }
