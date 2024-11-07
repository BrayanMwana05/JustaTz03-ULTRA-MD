//to use this grouponly mustbe off(using a sigle prefix is preferred)
export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  // Ignore messages sent by the bot itself
  if (m.isBaileys && m.fromMe) return true

  // Allow the owner's messages
  if (isOwner) return false

  // Ignore messages sent in group chats
  if (m.isGroup) return false

  const allowlist = 𝗙R𝗘𝗘 𝗜𝗡𝗧𝗘R𝗡𝗘𝗧🇹🇿.allowed || []
  if (allowlist.includes(m.sender.split('@')[0])) return false

  // If the message is not sent in a group, it's a private message
  if (!m.isGroup) {
    // Fetch chat data and bot settings
    let chat = 𝗙R𝗘𝗘 𝗜𝗡𝗧𝗘R𝗡𝗘𝗧.db.data.chats[m.chat]
    let bot = 𝗙R𝗘𝗘 𝗜𝗡𝗧𝗘R𝗡𝗘𝗧🇹🇿.db.data.settings[this.user.jid] || {}

    // Check if the "PM Blocker" feature is enabled, and the sender is not an owner or real owner
    if (bot.pmblocker && !isOwner && !isROwner) {
      // Block the sender unconditionally for any private message sent
      await m.reply(
        `*Hello @${m.sender.split`@`[0]}, messaging the bot privately is currently disabled. You have been blocked from using the bot.*`,
        false,
        { mentions: [m.sender] }
      )
      await this.updateBlockStatus(m.chat, 'block')

      // Return true to indicate that the private message should be blocked
      return true
    }
  }

  return true
}
