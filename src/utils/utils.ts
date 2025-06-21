export const formatDiscordName = (name: string | undefined) => {
    return name?.replace("#", "-")
}